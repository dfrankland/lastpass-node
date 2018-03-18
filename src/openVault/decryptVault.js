import decryptAccount from './decryptAccount';

export default ({ vault, key }) => {
  const accounts = [];
  let vaultBuffer = vault;

  while (vaultBuffer.length > 0) {
    const id = vaultBuffer.slice(0, 4).toString('utf8');
    const size = vaultBuffer.slice(4, 8).readUInt32BE(0) + 8;
    const payload = vaultBuffer.slice(8, size);

    // I think we need to look at SHAR & PRIK too... What are these?
    // Maybe they are needed in the future or something...
    // https://github.com/detunized/lastpass-ruby/blob/master/lib/lastpass/parser.rb#L65

    if (id === 'ACCT') {
      accounts.push(decryptAccount({ account: payload, key }));
    }

    vaultBuffer = vaultBuffer.slice(size, vaultBuffer.length);
  }

  return Promise.all(accounts);
};

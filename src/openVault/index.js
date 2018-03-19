import decryptAccount from './decryptAccount';

export default ({ vault, key }) => {
  const accounts = [];
  let vaultBuffer = vault;

  while (vaultBuffer.length > 0) {
    const id = vaultBuffer.slice(0, 4).toString('utf8');
    const size = vaultBuffer.slice(4, 8).readUInt32BE(0) + 8;
    const payload = vaultBuffer.slice(8, size);

    // TODO: `SHAR` & `PRIK` need to be parsed as well.
    // These are for shared account passwords et cetra.
    // https://github.com/detunized/lastpass-ruby/blob/master/lib/lastpass/parser.rb#L65

    if (id === 'ACCT') {
      accounts.push(decryptAccount({ account: payload, key }));
    }

    vaultBuffer = vaultBuffer.slice(size, vaultBuffer.length);
  }

  return Promise.all(accounts);
};

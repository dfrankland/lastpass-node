import openAccount from './openAccount';

export default (vault, key) => {
  const accounts = [];
  let newBuffer = vault;

  while (newBuffer.length > 0) {
    const id = newBuffer.slice(0, 4).toString('utf8');
    const size = newBuffer.slice(4, 8).readUInt32BE(0) + 8;
    const payload = newBuffer.slice(8, size);

    // I think we need to look at SHAR & PRIK too... What are these?
    // Maybe they are needed in the future or something...
    // https://github.com/detunized/lastpass-ruby/blob/master/lib/lastpass/parser.rb#L65

    if (id === 'ACCT') {
      accounts.push(openAccount(payload, key));
    }

    newBuffer = newBuffer.slice(size, newBuffer.length);
  }

  return Promise.all(accounts);
};

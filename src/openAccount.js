import decryptData from './decryptData';

let newBuffer;

const readPayload = () => {
  const size = newBuffer.slice(0, 4).readUInt32BE(0) + 4;
  const content = newBuffer.slice(4, size);

  newBuffer = newBuffer.slice(size, newBuffer.length);

  return content;
};

export default (account, key) => {
  newBuffer = account;

  const id = readPayload().toString('utf8');
  const name = decryptData(readPayload(), key).toString('utf8');
  const group = decryptData(readPayload(), key).toString('utf8');
  const url = Buffer.from(readPayload().toString('utf8'), 'hex').toString('utf8');
  const notes = decryptData(readPayload(), key).toString('utf8');

  readPayload();
  readPayload();

  const username = decryptData(readPayload(), key).toString('utf8');
  const password = decryptData(readPayload(), key).toString('utf8');

  readPayload();
  readPayload();

  const secureNote = readPayload().toString('utf8') === '1';

  return {
    id,
    name,
    group,
    url,
    notes,
    username,
    password,
    secureNote,
  };
};

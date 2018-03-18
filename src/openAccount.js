import decryptData from './decryptData';

const PayloadReader = class {
  constructor(newBuffer) {
    this.newBuffer = newBuffer;
  }

  readPayload() {
    const size = this.newBuffer.slice(0, 4).readUInt32BE(0) + 4;
    const content = this.newBuffer.slice(4, size);

    this.newBuffer = this.newBuffer.slice(size, this.newBuffer.length);

    return content;
  }
};

export default (account, key) => {
  const payloadReader = new PayloadReader(account);

  const id = payloadReader.readPayload().toString('utf8');
  const name = decryptData(payloadReader.readPayload(), key).toString('utf8');
  const group = decryptData(payloadReader.readPayload(), key).toString('utf8');
  const url = Buffer.from(payloadReader.readPayload().toString('utf8'), 'hex').toString('utf8');
  const notes = decryptData(payloadReader.readPayload(), key).toString('utf8');

  payloadReader.readPayload();
  payloadReader.readPayload();

  const username = decryptData(payloadReader.readPayload(), key).toString('utf8');
  const password = decryptData(payloadReader.readPayload(), key).toString('utf8');

  payloadReader.readPayload();
  payloadReader.readPayload();

  const secureNote = payloadReader.readPayload().toString('utf8') === '1';

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

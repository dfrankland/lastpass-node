import decryptData from './decryptData';

const PayloadReader = class {
  constructor(newBuffer, key) {
    this.newBuffer = newBuffer;
    this.key = key;
  }

  readPayload() {
    const size = this.newBuffer.slice(0, 4).readUInt32BE(0) + 4;
    const content = this.newBuffer.slice(4, size);

    this.newBuffer = this.newBuffer.slice(size, this.newBuffer.length);

    return content;
  }

  readPayloadToUtf8() {
    return this.readPayload().toString('utf8');
  }

  readPayloadFromHexToUtf8() {
    return Buffer.from(this.readPayloadToUtf8(), 'hex').toString('utf8');
  }

  readAndDecryptPayloadToUtf8() {
    return decryptData(this.readPayload(), this.key).toString('utf8');
  }
};

export default (account, key) => {
  const payloadReader = new PayloadReader(account, key);

  const id = payloadReader.readPayloadToUtf8();
  const name = payloadReader.readAndDecryptPayloadToUtf8();
  const group = payloadReader.readAndDecryptPayloadToUtf8();
  const url = payloadReader.readPayloadFromHexToUtf8();
  const notes = payloadReader.readAndDecryptPayloadToUtf8();

  payloadReader.readPayload();
  payloadReader.readPayload();

  const username = payloadReader.readAndDecryptPayloadToUtf8();
  const password = payloadReader.readAndDecryptPayloadToUtf8();

  payloadReader.readPayload();
  payloadReader.readPayload();

  const secureNote = payloadReader.readPayloadToUtf8() === '1';

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

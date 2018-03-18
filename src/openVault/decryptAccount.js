import decryptAccountChunk from './decryptAccountChunk';

const AccountReader = class {
  constructor({ account, key }) {
    this.newBuffer = account;
    this.key = key;
  }

  readChunk() {
    const size = this.newBuffer.slice(0, 4).readUInt32BE(0) + 4;
    const content = this.newBuffer.slice(4, size);

    this.newBuffer = this.newBuffer.slice(size, this.newBuffer.length);

    return content;
  }

  readChunkToUtf8() {
    return this.readChunk().toString('utf8');
  }

  readChunkFromHexToUtf8() {
    return Buffer.from(this.readChunkToUtf8(), 'hex').toString('utf8');
  }

  readAndDecryptChunkToUtf8() {
    return decryptAccountChunk({
      chunk: this.readChunk(),
      key: this.key,
    }).toString('utf8');
  }
};

export default ({ account, key }) => {
  const accountReader = new AccountReader({ account, key });

  const id = accountReader.readChunkToUtf8();
  const name = accountReader.readAndDecryptChunkToUtf8();
  const group = accountReader.readAndDecryptChunkToUtf8();
  const url = accountReader.readChunkFromHexToUtf8();
  const notes = accountReader.readAndDecryptChunkToUtf8();

  accountReader.readChunk();
  accountReader.readChunk();

  const username = accountReader.readAndDecryptChunkToUtf8();
  const password = accountReader.readAndDecryptChunkToUtf8();

  accountReader.readChunk();
  accountReader.readChunk();

  const secureNote = accountReader.readChunkToUtf8() === '1';

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

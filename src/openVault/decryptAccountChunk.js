import { createDecipher, createDecipheriv } from 'crypto';

const decrypt = ({ encryptedData, key, iv }) => {
  const decipher = typeof iv === 'undefined' ? (
    createDecipher('aes-256-ecb', key)
  ) : (
    createDecipheriv('aes-256-cbc', key, iv)
  );

  decipher.setAutoPadding(false);

  return Buffer.concat([
    decipher.update(encryptedData),
    decipher.final(),
  ]);
};

export default ({ chunk, key }) => {
  const { length } = chunk;

  if (length === 0) return '';

  const isAes256Cbc = (
    chunk.slice(0, 1).toString('utf8') === '!' &&
    length % 16 === 1 &&
    length > 32
  );

  return isAes256Cbc ? (
    decrypt({
      encryptedData: chunk.slice(17, length),
      key,
      iv: chunk.slice(1, 17),
    })
  ) : (
    decrypt({
      encryptedData: chunk,
      key,
    })
  );
};

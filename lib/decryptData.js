import { createDecipher, createDecipheriv } from 'crypto';

const decrypt = (encrypted, key, iv = false) => {
  const decipher = iv ?
    createDecipheriv('aes-256-cbc', key, iv) :
    createDecipher('aes-256-ecb', key);

  decipher.setAutoPadding(false);

  return Buffer.concat(
    [
      decipher.update(encrypted),
      decipher.final(),
    ]
  );
};

export default (data, key) => {
  const length = data.length;

  if (length === 0) return '';

  let decrypted;

  if (data.slice(0, 1).toString('utf8') === '!' && length % 16 === 1 && length > 32) {
    decrypted = decrypt(data.slice(17, length), key, data.slice(1, 17));
  } else {
    decrypted = decrypt(data, key);
  }

  return decrypted;
};

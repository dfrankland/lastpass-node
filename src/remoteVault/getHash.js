import { pbkdf2 } from 'crypto';
import { promisify } from 'util';
import getKey from './getKey';

const pbkdf2Async = promisify(pbkdf2);

export default async ({ username, password }) => {
  const { key, iterations } = await getKey({ username, password });

  const hash = (
    await pbkdf2Async(
      key,
      password,
      1,
      32,
      'sha256',
    )
  ).toString('hex');

  return {
    hash,
    key,
    iterations,
  };
};

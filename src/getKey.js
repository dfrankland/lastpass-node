import { pbkdf2 } from 'crypto';
import { promisify } from 'util';
import getIterations from './getIterations';

const pbkdf2Async = promisify(pbkdf2);

export default async (username, password) => (
  pbkdf2Async(
    password,
    username,
    await getIterations(username),
    32,
    'sha256',
  )
);

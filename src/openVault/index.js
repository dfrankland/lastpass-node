import getKey from '../remoteVault/getKey';
import decryptVault from './decryptVault';

export default async ({
  vault,
  username,
  password,
  key,
}) => (
  decryptVault({
    vault,
    key: key || (await getKey({ username, password })).key,
  })
);

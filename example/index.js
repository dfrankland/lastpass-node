import {
  getLocalVaultPath,
  readLocalVault,
  writeLocalVault,
  getRemoteVault,
  getRemoteVaultKey,
  openVault,
} from '../src';
import question from './question';
import * as credentials from './credentials';

const localVaultPath = getLocalVaultPath(credentials);

const getLocalVault = async () => {
  const [vault, key] = await Promise.all([
    readLocalVault(localVaultPath),
    getRemoteVaultKey(credentials),
  ]);

  return { vault, key, local: true };
};

(async () => {
  const closedVault = await (async () => {
    try {
      return await getLocalVault();
    } catch (err1) {
      try {
        return await getRemoteVault(credentials);
      } catch (err2) {
        return getRemoteVault({
          ...credentials,
          twoFactor: await question('2 Factor Authentication Pin: '),
        });
      }
    }
  })();

  const vault = await openVault(closedVault);

  console.log(vault.slice(0, 3)); // eslint-disable-line no-console

  if (!closedVault.local) await writeLocalVault(localVaultPath);
})().catch((
  (err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  }
));

import {
  getLocalVaultPath,
  readLocalVault,
  writeLocalVault,
  getRemoteVaultKeyAndIterations,
  getRemoteVaultSession,
  getRemoteVault,
  openVault,
} from '../src';
import question from './question';
import * as credentials from './credentials';

const localVaultPath = getLocalVaultPath(credentials);

(async () => {
  const { local, ...vaultAndKey } = await (async () => {
    try {
      const [vault, { key }] = await Promise.all([
        readLocalVault({ path: localVaultPath }),
        getRemoteVaultKeyAndIterations(credentials),
      ]);
      console.log('Got local vault and remote key.'); // eslint-disable-line no-console
      return { vault, key, local: true };
    } catch (err1) {
      const answer = await question('2 Factor Authentication Pin (hit "enter" to skip): ');
      const twoFactor = answer.length === 6 ? answer : undefined;

      const keyAndIterations = await getRemoteVaultKeyAndIterations(credentials);
      const session = await getRemoteVaultSession({
        ...credentials,
        twoFactor,
        ...keyAndIterations,
      });
      const remoteClosedVault = await getRemoteVault(session);

      console.log(`Got remote vault and remote key with${twoFactor ? '' : 'out'} 2FA.`); // eslint-disable-line no-console
      return {
        vault: remoteClosedVault,
        key: keyAndIterations.key,
      };
    }
  })();

  const vault = await openVault({ ...vaultAndKey });

  console.log('Vault is open! Here are some accounts:'); // eslint-disable-line no-console
  console.log(vault.slice(0, 3)); // eslint-disable-line no-console

  if (!local) {
    console.log(`Writing remote vault to ${localVaultPath}.`); // eslint-disable-line no-console
    await writeLocalVault({
      ...vaultAndKey,
      path: localVaultPath,
    });
  }
})().catch((
  (err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1);
  }
));

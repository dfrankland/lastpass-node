export { default as openVault } from './openVault';

export { default as getRemoteVault } from './remoteVault';
export { default as getRemoteVaultKey } from './remoteVault/getKey';

export {
  filePath as getLocalVaultPath,
  write as writeLocalVault,
  read as readLocalVault,
} from './localVault';

export { default as openVault } from './openVault';
export * from './remoteVault';
export {
  filePath as getLocalVaultPath,
  write as writeLocalVault,
  read as readLocalVault,
} from './localVault';

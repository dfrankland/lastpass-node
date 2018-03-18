import { resolve as resolvePath } from 'path';
import { homedir } from 'os';
import { access, readFile, writeFile, R_OK } from 'fs';
import { promisify } from 'util';
import sanitize from 'sanitize-filename';
import { filter } from 'fuzzaldrin';
import getSession from './getSession';
import getVault from './getVault';
import getKey from './getKey';
import openVault from './openVault';
import LastpassError from './lastpassError';

const accessAsync = promisify(access);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const Lastpass = class {
  constructor(username) {
    this.username = username;
  }

  async loadVault(username, password, twoFactor) {
    if (this.vault) throw new LastpassError({ title: 'Vault already loaded' });

    const session = await getSession(username, password, twoFactor);
    this.vault = await getVault(session);

    this.username = username;
  }

  getVaultFilePath(vaultFile) {
    let vaultFileDefault;
    if (typeof vaultFile === 'undefined') {
      vaultFileDefault = (
        this.loadedVaultFile ||
        resolvePath(
          homedir(),
          `./.lastpass-vault${
            this.username ? `-${sanitize(this.username)}` : ''
          }`,
        )
      );
    }

    return vaultFileDefault || vaultFile;
  }

  async loadVaultFile(vaultFile) {
    if (this.vault) throw new LastpassError({ title: 'Vault already loaded' });

    const filePath = this.getVaultFilePath(vaultFile);

    try {
      await accessAsync(filePath, R_OK);
    } catch (err) {
      throw new LastpassError({
        title: `Vault file could not be accessed ${filePath}`,
        body: err,
      });
    }

    try {
      this.vault = await readFileAsync(filePath);
    } catch (err) {
      throw new LastpassError({
        title: `Vault file could not be read ${filePath}`,
        body: err,
      });
    }

    this.loadedVaultFile = vaultFile;
  }

  async saveVaultFile(vaultFile, options = {}) {
    if (!this.vault) throw new LastpassError({ title: 'Vault is not loaded' });

    const filePath = this.getVaultFilePath(vaultFile);

    try {
      await writeFileAsync(
        filePath,
        this.vault,
        {
          ...{ encoding: 'binary', mode: 0o400 },
          ...options,
        },
      );
    } catch (err) {
      throw new LastpassError({
        title: `Vault could not be saved to file ${filePath}`,
        body: err,
      });
    }
  }

  getVault() {
    if (!this.vault) {
      throw new LastpassError({
        title: 'Vault is not loaded',
      });
    }

    return this.vault;
  }

  async getAccounts(username, password, search = {}) {
    if (!username) throw new LastpassError({ title: 'No username!' });
    if (!password) throw new LastpassError({ title: 'No password!' });
    if (!this.vault) throw new LastpassError({ title: 'Vault is not loaded' });

    const key = await getKey(username, password);
    const accounts = await openVault(this.vault, key);

    if (!search.keyword) return accounts;
    return filter(accounts, search.keyword, { ...{ key: 'name' }, ...search.options });
  }
};

export default Lastpass;

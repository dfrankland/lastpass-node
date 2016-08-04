import Lastpass from '../index';
import question from './question';
import { USERNAME, PASSWORD, FILE, SEARCH } from './credentials';

(async () => {
  try {
    // Pass username here to use default vault file
    // If you do pass it here, it will be saved as `~/.lastpass-vault-${USERNAME}`
    // If you don't pass it here, it will be saved as `~/.lastpass-vault`
    const lpass = new Lastpass(USERNAME);

    try {
      // Try to load vault from file
      // Pass `undefined` to use default file or pass any other valid path
      await lpass.loadVaultFile(FILE);
    } catch (err) {
      console.error(err.title);
      try {
        // Else try to get vault without 2FA
        await lpass.loadVault(USERNAME, PASSWORD);
      } catch (errLoad) {
        console.error(errLoad.title);
        if (errLoad && errLoad.body && errLoad.body.cause === 'googleauthrequired') {
          // Else try to get vault with 2FA
          const twoFactor = await question('2 Factor Authentication Pin: ');
          await lpass.loadVault(USERNAME, PASSWORD, twoFactor);
        }
      }
    }

    // Check if vault is actually loaded... sometimes it's not :(
    try {
      lpass.getVault();
    } catch (err) {
      console.error(err.title);
      return;
    }

    // Try to load some accounts
    // Search is an object with 2 properties like so:
    // {
    //   keyword: 'Term to search for',
    //   options: { key: 'name of key in account object', maxResults: 2 },
    // }
    // Leaving search undefined returns all accounts
    const accounts = await lpass.getAccounts(
      USERNAME,
      PASSWORD,
      SEARCH,
    );

    console.log(accounts);

    // If accounts are loaded save the vault to use later.
    // Because no path is given it gets saved to `~/.lastpass-vault-${USERNAME}`
    if (accounts) {
      await lpass.saveVaultFile();
    }
  } catch (err) {
    // Errors are of the LastpassError class and include some explanation to the
    // error that is getting thrown. Check the title and body properties for the
    // real meat of the issue.
    console.error(err.name);
    console.error(err.title);
    console.error(err.body);
    console.error(err.stack);
  }
})();

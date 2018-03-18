# lastpass-node

> Lastpass client for Node.js

## About

I always see people using other password integrations with Node.js, like
1Password, and that made me sad. I _really_ like Lastpass, but it seems they
aren't too dev friendly. This changes that! Now it's extremely easy to access
your Lastpass Vault, securely, and with a promised based API.

### Getting started

1.  Install and save the package

    ```bash
    npm i -S lastpass
    ```

2.  Import the package

    ```js
    import Lastpass from 'lastpass'; // ES6
    // OR
    var Lastpass = require('lastpass').default; // ES5
    ```

3.  Instantiate the class `Lastpass`

    ```js
    const lpass = new Lastpass();
    ```

### Methods

#### `new Lastpass([username])`

Parameters:

*   `username`: Lastpass account username (probably an email) used to set the
    account from which to load a vault blob file (if it exists);

    *   Type: string
    *   Required: false

#### `loadVault(username, password, [twoFactor])`

Parameters:

*   `username`: Lastpass account username (probably an email)

    *   Type: string
    *   Required: true

*   `password`: Lastpass account password

    *   Type: string
    *   Required: true

*   `twoFactor`: Two factor authentication pin (if it's needed and none is
    provided an error will be thrown)

    *   Type: string
    *   Required: false

Returns:

*   `Promise`: resolves to `undefined`

#### `loadVaultFile([vaultFile])`

Parameters:

*   `vaultFile`: Absolute path to location of a stored vault blob. Defaults to
    `~/.lastpass-vault-${USERNAME}` if a username is set, otherwise to
    `~/.lastpass-vault`.

    *   Type: string
    *   Required: false

Returns:

*   `Promise`: resolves to `undefined`

#### `saveVaultFile([vaultFile, options])`

Parameters:

*   `vaultFile`: Absolute path to store a vault blob file. Defaults to
    `~/.lastpass-vault-${USERNAME}` if a username is set, otherwise to
    `~/.lastpass-vault`.

    *   Type: string
    *   Required: false

*   `options`: File options for saving the file. Defaults to
    `{ encoding: 'binary', mode: 0o400 }` for safe keeping.

    *   Type: object
    *   Required: false

Returns:

*   `Promise`: resolves to `undefined`

#### `getVault()`

Parameters:

*   none

Returns:

*   `Buffer`: encrypted contents of the vault blob from Lastpass

#### `getAccounts(username, password)`

Parameters:

*   `username`: Lastpass account username (probably an email)

    *   Type: string
    *   Required: true

*   `password`: Lastpass account password

    *   Type: string
    *   Required: true

Returns:

*   `Promise`: resolves to an `Array` of accounts

### Credit

This wouldn't be possible without the amazing [`lastpass-ruby`][2] and
[`lastpass-cli`][3].

[1]: https://github.com/atom/fuzzaldrin
[2]: https://github.com/detunized/lastpass-ruby
[3]: https://github.com/lastpass/lastpass-cli

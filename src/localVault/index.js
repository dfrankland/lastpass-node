import { resolve as resolvePath } from 'path';
import { homedir } from 'os';
import { promisify } from 'util';
import { readFile, writeFile } from 'fs';
import sanitize from 'sanitize-filename';

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

export const filePath = ({ username }) => (
  resolvePath(
    homedir(),
    `./.lastpass-vault${
      username ? `-${sanitize(username)}` : ''
    }`,
  )
);

export const read = async ({ path, username, options }) => {
  try {
    return await readFileAsync(path);
  } catch (err) {
    return readFileAsync(filePath({ username }), options);
  }
};

export const write = async ({
  vault,
  path,
  username,
  options = {},
}) => {
  const writeVaultFile = p => (
    writeFileAsync(
      p,
      vault,
      {
        ...{ encoding: 'binary', mode: 0o400 },
        ...options,
      },
    )
  );

  try {
    await writeVaultFile(path);
  } catch (err) {
    await writeVaultFile(filePath({ username }));
  }
};

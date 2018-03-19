import fetch from 'node-fetch';
import FormData from 'form-data';
import { pbkdf2 } from 'crypto';
import { promisify } from 'util';
import { API_ITERATIONS } from './apiEndpoints';

const pbkdf2Async = promisify(pbkdf2);

const getIterations = async ({ username }) => {
  const form = new FormData();
  form.append('email', username);

  try {
    const result = await fetch(
      API_ITERATIONS,
      {
        method: 'POST',
        body: form,
        headers: form.getHeaders(),
      },
    );

    const text = await result.text();

    return parseInt(text, 10);
  } catch (err) {
    // TODO: Make this a better error.
    throw new Error('Could not fetch key from Lastpass API');
  }
};

export default async ({ username, password }) => {
  const iterations = await getIterations({ username });

  return {
    key: await pbkdf2Async(
      password,
      username,
      iterations,
      32,
      'sha256',
    ),
    iterations,
  };
};

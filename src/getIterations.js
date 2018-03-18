import fetch from 'node-fetch';
import FormData from 'form-data';
import { API_ITERATIONS } from './apiEndpoints';

export default async (username) => {
  const form = new FormData();
  form.append('email', username);

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
};

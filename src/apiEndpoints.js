import { stringify } from 'querystring';

const apiEndpoint = (endpoint, query = '') => (
  `https://lastpass.com/${endpoint}.php${query}`
);

export const API_ITERATIONS = apiEndpoint('iterations');

export const API_LOGIN = apiEndpoint('login');

export const API_GETACCTS = apiEndpoint(
  'getaccts',
  `?${
    stringify({
      mobile: 1,
      hash: '0.0',
      hasplugin: '1.0.0',
      requestsrc: 'cli',
    })
  }`,
);

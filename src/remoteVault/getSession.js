import fetch from 'node-fetch';
import FormData from 'form-data';
import { parseString } from 'xml2js';
import { pbkdf2 } from 'crypto';
import { promisify } from 'util';
import { API_LOGIN } from './apiEndpoints';

const pbkdf2Async = promisify(pbkdf2);
const parseXmlAsync = promisify(parseString);

export default async ({
  username,
  password,
  twoFactor,
  key,
  iterations,
}) => {
  const form = new FormData();
  form.append('method', 'mobile');
  form.append('web', 1);
  form.append('xml', 1);
  form.append('username', username);
  form.append('hash', (await pbkdf2Async(key, password, 1, 32, 'sha256')).toString('hex'));
  form.append('iterations', iterations);
  form.append('imei', 'node.js');
  if (twoFactor) form.append('otp', twoFactor);

  const result = await fetch(
    API_LOGIN,
    {
      method: 'POST',
      body: form,
      headers: form.getHeaders(),
    },
  );

  const xml = await result.text();

  const json = await parseXmlAsync(xml);

  if (!json || !json.ok || !json.ok.$ || !json.ok.$.sessionid) {
    // Bad API Response
    // {
    //   message: 'Google Authenticator authentication required! Upgrade your
    //             browser extension so you can enter it.',
    //   cause: 'googleauthrequired',
    //   allowmultifactortrust: 'true',
    //   tempuid: '22759306',
    //   trustexpired: '0',
    //   trustlabel: '',
    //   hidedisable: 'false',
    // }

    throw new Error((
      `Session API response is bad:\n${(() => {
        try {
          return JSON.stringify(json);
        } catch (err) {
          return xml;
        }
      })()}`
    ));
  }

  return json.ok.$.sessionid;
};

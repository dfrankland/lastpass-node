import fetch from 'node-fetch';
import FormData from 'form-data';
import { parseString } from 'xml2js';
import { promisify } from 'util';
import getHash from './getHash';
import { API_LOGIN } from './apiEndpoints';

const parseXmlAsync = promisify(parseString);

export default async ({ username, password, twoFactor }) => {
  const { hash, key, iterations } = await getHash({ username, password });

  const form = new FormData();
  form.append('method', 'mobile');
  form.append('web', 1);
  form.append('xml', 1);
  form.append('username', username);
  form.append('hash', hash);
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
      `Session API response is bad:\n${
        (
          json &&
          json.response &&
          json.response.error &&
          json.response.error[0] &&
          json.response.error[0].$
        ) || (
          xml
        )
      }`
    ));
  }

  return {
    session: json.ok.$.sessionid,
    key,
  };
};

import fetch from 'node-fetch';
import FormData from 'form-data';
import { parseString } from 'xml2js';
import { promisify } from 'util';
import getIterations from './getIterations';
import getHash from './getHash';
import getEndpoint from './getEndpoint';
import LastpassError from './lastpassError';

const parseXmlAsync = promisify(parseString);

export default async (username, password, twoFactor) => {
  const form = new FormData();
  form.append('method', 'mobile');
  form.append('web', 1);
  form.append('xml', 1);
  form.append('username', username);
  form.append('hash', await getHash(username, password));
  form.append('iterations', await getIterations(username));
  form.append('imei', 'node.js');
  if (twoFactor) form.append('otp', twoFactor);

  const result = await fetch(
    getEndpoint('login'),
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

    throw new LastpassError({
      title: 'Session API response is bad',
      body: (
        json &&
        json.response &&
        json.response.error &&
        json.response.error[0] &&
        (json.response.error[0].$ || xml)
      ),
    });
  }

  return json.ok.$.sessionid;
};

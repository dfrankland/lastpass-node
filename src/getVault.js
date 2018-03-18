import fetch from 'node-fetch';
import { stringify } from 'querystring';
import htmlToText from 'html-to-text';
import getEndpoint from './getEndpoint';
import LastpassError from './lastpassError';

const endpoint = getEndpoint(
  'getaccts',
  `?${
    stringify({
      mobile: 1,
      hash: '0.0',
      hasplugin: '1.0.0',
      requestsrc: 'cli',
    })
  }`
);

export default async session => {
  const result = await fetch(
    endpoint,
    {
      credentials: 'include',
      headers: {
        Cookie: stringify(
          { PHPSESSID: encodeURIComponent(session) }, ';', '='
        ),
      },
    }
  );

  const body = result.body;

  let vaultBuffer = Buffer.from([]);
  body.on('data', buffer => {
    vaultBuffer = Buffer.concat([vaultBuffer, buffer]);
  });

  await new Promise(
    resolve => {
      body.on('end', resolve);
    }
  );

  if (!result.ok) {
    throw new LastpassError({
      title: 'Could not retrieve Lastpass vault',
      body: htmlToText.fromString(vaultBuffer.toString('utf8'), { wordwrap: 130 }),
    });
  }

  return vaultBuffer;
};

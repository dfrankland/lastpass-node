import fetch from 'node-fetch';
import { stringify } from 'querystring';
import htmlToText from 'html-to-text';
import { API_GETACCTS } from './apiEndpoints';
import LastpassError from './lastpassError';

export default async (session) => {
  const { body, ok } = await fetch(
    API_GETACCTS,
    {
      credentials: 'include',
      headers: {
        Cookie: stringify(
          {
            PHPSESSID: encodeURIComponent(session),
          },
          ';',
          '=',
        ),
      },
    },
  );

  let vaultBuffer = Buffer.from([]);
  body.on('data', (buffer) => {
    vaultBuffer = Buffer.concat([vaultBuffer, buffer]);
  });

  await new Promise(resolve => body.on('end', resolve));

  if (!ok) {
    throw new LastpassError({
      title: 'Could not retrieve Lastpass vault',
      body: htmlToText.fromString(vaultBuffer.toString('utf8'), { wordwrap: 130 }),
    });
  }

  return vaultBuffer;
};

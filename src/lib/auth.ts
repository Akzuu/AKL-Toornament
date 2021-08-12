import bent from 'bent';
import config from 'config';
import { ApiScope, IAuthResponse } from '../types/toornament.types';

const AUTH_ENDPOINT = 'https://api.toornament.com/oauth/v2';

const AUTH_POST = bent(AUTH_ENDPOINT, 'POST', 'json', 200);

const CLIENT_ID = config.get('clientId');
const CLIENT_SECRET = config.get('clientSecret');

export const getAccessToken = async (scope: ApiScope) => {
  const res = await AUTH_POST('/token',
    `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${scope}`,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
    }) as IAuthResponse;

  return res.access_token;
};

import bent from 'bent';
import config from 'config';
import { ApiScope } from '../../types/toornament.types';
import { getAccessToken } from '../auth';
import { TOORNAMENT_ENDPOINT } from './common';

const API_KEY = config.get('apiKey');

export const getTournaments = async () => {
  const get = bent(TOORNAMENT_ENDPOINT, 'GET', 'json', 206);

  const token = await getAccessToken(ApiScope.OrganizerView);

  const tournaments = await get('/tournaments', undefined, {
    'X-Api-Key': API_KEY,
    Authorization: `Bearer ${token}`,
    Range: 'tournaments=0-10',
  });

  return tournaments;
};

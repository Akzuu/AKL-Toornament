import bent from 'bent';
import camelcaseKeys from 'camelcase-keys';
import config from 'config';
import { ApiScope, ITournament } from '../../types/toornament.types';
import { authHandler, TOORNAMENT_ENDPOINT } from './common';

const API_KEY = config.get('apiKey');
const GET_TOURNAMENTS = bent(TOORNAMENT_ENDPOINT, 'GET', 'json', 206);

export const getTournaments = async () => {
  const token = await authHandler.getAccessToken(ApiScope.OrganizerView);

  const result = await GET_TOURNAMENTS('/tournaments', undefined, {
    'X-Api-Key': API_KEY,
    Authorization: `Bearer ${token}`,
    Range: 'tournaments=0-10',
  }) as object[];

  return camelcaseKeys(result) as ITournament[];
};

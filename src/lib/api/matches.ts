import bent, { BentResponse } from 'bent';
import camelcaseKeys from 'camelcase-keys';
import config from 'config';
import { ApiScope, IMatch } from '../../types/toornament.types';
import { authHandler, TOORNAMENT_ENDPOINT } from './common';

const API_KEY = config.get('apiKey');
const GET_MATCHES = bent(TOORNAMENT_ENDPOINT, 'GET', 206);

const queryMatches = async (
  queriedMatches: any[],
  token: string, tournamentId:
  string,
  rangeStart: number,
  rangeEnd: number,
) => {
  const result = await GET_MATCHES(`/matches?tournament_ids=${tournamentId}`,
    undefined,
    {
      'X-Api-Key': API_KEY,
      Authorization: `Bearer ${token}`,
      Range: `matches=${rangeStart}-${rangeEnd}`,
    }) as BentResponse & { headers: { 'content-range': string } };

  const matches = await result.json();
  const total = Number(result.headers['content-range'].split('/')[1]);

  let allMatches = queriedMatches.concat(matches);

  if (allMatches.length < total) {
    allMatches = await queryMatches(
      allMatches, token, tournamentId, rangeStart + 100, rangeEnd + 100,
    );
  }

  return allMatches;
};

export const getMatches = async (tournamentId: string) => {
  const token = await authHandler.getAccessToken(ApiScope.OrganizerResult);

  const matches = await queryMatches([], token, tournamentId, 0, 99);

  return camelcaseKeys(matches) as IMatch[];
};

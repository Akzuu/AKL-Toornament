import bent, { BentResponse } from 'bent';
import camelcaseKeys from 'camelcase-keys';
import config from 'config';
import { ApiScope, IParticipant } from '../../types/toornament.types';
import { authHandler, TOORNAMENT_ENDPOINT } from './common';

const API_KEY = config.get('apiKey');
const GET_PARTICIPANTS = bent(TOORNAMENT_ENDPOINT, 'GET', 206);

const queryParticipants = async (
  queriedParticipants: any[],
  token: string,
  tournamentId: string,
  rangeStart: number,
  rangeEnd: number,
) => {
  const result = await GET_PARTICIPANTS(`/participants?tournament_ids=${tournamentId}`,
    undefined,
    {
      'X-Api-Key': API_KEY,
      Authorization: `Bearer ${token}`,
      Range: `participants=${rangeStart}-${rangeEnd}`,
    }) as BentResponse & { headers: { 'content-range': string } };

  const participants = await result.json();
  const total = Number(result.headers['content-range'].split('/')[1]);

  let allParticipants = queriedParticipants.concat(participants);

  if (allParticipants.length < total) {
    allParticipants = await queryParticipants(
      allParticipants, token, tournamentId, rangeStart + 50, rangeEnd + 50,
    );
  }

  return allParticipants;
};

export const getParticipants = async (tournamentId: string) => {
  const token = await authHandler.getAccessToken(ApiScope.OrganizerParticipant);

  const participants = await queryParticipants([], token, tournamentId, 0, 49);

  return camelcaseKeys(participants) as IParticipant[];
};

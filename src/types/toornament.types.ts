import { ISO8601Date } from './common.types';

export enum ApiScope {
  OrganizerView = 'organizer:view',
  OrganizerAdmin = 'organizer:admin',
  OrganizerResult = 'organizer:result',
  OrganizerParticipant = 'organizer:participant',
  OrganizerRegistration = 'organizer:registration',
  OrganizerPermission = 'organizer:permission',
  OrganizerDelete = 'organizer:delete',
}

export interface IAuthResponse {
  scope: ApiScope,
  token_type: string,
  expires_in: number,
  access_token: string,
}
export interface ITournament {
  name: string,
  fullName: string | undefined,
  scheduledDateStart: ISO8601Date | undefined,
  timezone: string,
  public: boolean,
  size: number,
  online: boolean | undefined,
  location: string | undefined,
  country: string | undefined,
  logo: object | undefined,
  registrationEnabled: boolean,
  registrationOpeningDateTime: boolean,
  registrationClosingDateTime: boolean,
  id: string,
  discipline: string,
  status: string,
  platforms: string[],
}

export interface IMatch {
  scheduledDatetime: string | undefined,
  publicNote: string | undefined,
  privateNote: string | undefined,
  id: string,
  status: MatchStatus,
  stageId: string,
  groupId: string,
  roundId: string,
  number: number,
  type: MatchType,
  settings: object,
  playedAt: string | undefined,
  reportClosed: boolean,
  opponents: object[],
  tournamentId: string,
}

export enum MatchStatus {
  Pending = 'pending',
  Running = 'running',
  Completed = 'completed',
}

export enum MatchType {
  Duel = 'duel',
  FFA = 'ffa',
  BYE = 'bye',
}

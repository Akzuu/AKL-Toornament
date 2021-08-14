import { ISO8601Date } from './common.types';

export enum ApiScope {
  OrganizerView = 'organizer:view',
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

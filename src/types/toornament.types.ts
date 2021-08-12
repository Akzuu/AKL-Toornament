export enum ApiScope {
  OrganizerView = 'organizer:view',
}

export interface IAuthResponse {
  scope: ApiScope,
  token_type: string,
  expires_in: number,
  access_token: string,
}

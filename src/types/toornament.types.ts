import { Static, Type } from '@sinclair/typebox';

export enum ApiScope {
  OrganizerView = 'organizer:view',
  OrganizerAdmin = 'organizer:admin',
  OrganizerResult = 'organizer:result',
  OrganizerParticipant = 'organizer:participant',
  OrganizerRegistration = 'organizer:registration',
  OrganizerPermission = 'organizer:permission',
  OrganizerDelete = 'organizer:delete',
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
export interface IAuthResponse {
  scope: ApiScope,
  token_type: string,
  expires_in: number,
  access_token: string,
}

export const Tournament = Type.Object({
  name: Type.String(),
  fullName: Type.Optional(Type.String()),
  scheduledDateStart: Type.Optional(Type.String()),
  timezone: Type.String(),
  public: Type.Boolean(),
  size: Type.Number(),
  online: Type.Optional(Type.Boolean()),
  location: Type.Optional(Type.String()),
  country: Type.Optional(Type.String()),
  logo: Type.Object(Type.Any()),
  registrationEnabled: Type.Boolean(),
  registrationOpeningDateTime: Type.Boolean(),
  registrationClosingDateTime: Type.Boolean(),
  id: Type.String(),
  discipline: Type.String(),
  status: Type.String(),
  platforms: Type.Array(Type.String()),
});

export type ITournament = Static<typeof Tournament>;

export const Match = Type.Object({
  scheduledDatetime: Type.Optional(Type.String()),
  publicNote: Type.Optional(Type.String()),
  privateNote: Type.Optional(Type.String()),
  id: Type.String(),
  status: Type.Enum(MatchStatus),
  stageId: Type.String(),
  groupId: Type.String(),
  roundId: Type.String(),
  number: Type.Number(),
  type: Type.Enum(MatchType),
  settings: Type.Object(Type.Any()),
  playedAt: Type.Optional(Type.String()),
  reportClosed: Type.Boolean(),
  opponents: Type.Array(Type.Object(Type.Any())),
  tournamentId: Type.String(),
});

export type IMatch = Static<typeof Match>;

// Participant aka team in CS:GO
export const Participant = Type.Object({
  name: Type.String(),
  email: Type.Optional(Type.String()),
  customUserIdentifier: Type.Optional(Type.String()),
  checkedIn: Type.Boolean(),
  customFields: Type.Object(Type.Any()),
  id: Type.String(),
  userId: Type.Optional(Type.String()),
  createdAt: Type.String(),
  type: Type.String(),
  tournamentId: Type.String(),
  lineup: Type.Array(Type.Object({
    name: Type.String(),
    customUserIdentifier: Type.Optional(Type.Object(Type.Any())),
    email: Type.String(),
    customFields: Type.Object(Type.Any()),
    userId: Type.Optional(Type.String()),
  })),
});

export type IParticipant = Static<typeof Participant>;

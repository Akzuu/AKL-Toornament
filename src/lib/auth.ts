import bent from 'bent';
import config from 'config';
import { ApiScope, IAuthResponse } from '../types/toornament.types';

const AUTH_ENDPOINT = 'https://api.toornament.com/oauth/v2';

const AUTH_POST = bent(AUTH_ENDPOINT, 'POST', 'json', 200);

const CLIENT_ID = config.get('clientId');
const CLIENT_SECRET = config.get('clientSecret');

interface IAuthInfo {
  accessToken: string,
  expiryDate: Date,
  scope: ApiScope,
}

export class AuthHandler {
  private authInfos : Map<ApiScope, IAuthInfo> = new Map();

  private async setAccessToken(
    token: string,
    expiryDate: Date,
    scope: ApiScope,
  ) {
    this.authInfos.set(scope, {
      accessToken: token,
      expiryDate,
      scope,
    });
  }

  private async queryAccessToken(scope: ApiScope) {
    const res = await AUTH_POST('/token',
      `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${scope}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }) as IAuthResponse;

    const dateNow = new Date();

    this.setAccessToken(
      res.access_token,
      new Date(dateNow.setSeconds(dateNow.getSeconds() + res.expires_in)),
      res.scope,
    );
  }

  public async getAccessToken(scope: ApiScope) {
    const authInfo = this.authInfos.get(scope);

    if (authInfo === undefined || authInfo?.expiryDate < new Date()) {
      await this.queryAccessToken(scope);
    }

    return this.authInfos.get(scope)?.accessToken;
  }
}

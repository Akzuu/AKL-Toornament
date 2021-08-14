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

  private async queryAccessToken(scope: ApiScope) {
    const res = await AUTH_POST('/token',
      `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${scope}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }) as IAuthResponse;

    const dateNow = new Date();
    const payload = {
      accessToken: res.access_token,
      expiryDate: new Date(dateNow.setSeconds(dateNow.getSeconds() + res.expires_in)),
      scope: res.scope,
    };

    this.authInfos.set(res.scope, payload);

    return payload;
  }

  public async getAccessToken(scope: ApiScope) {
    let authInfo = this.authInfos.get(scope);

    if (authInfo === undefined || authInfo?.expiryDate < new Date()) {
      authInfo = await this.queryAccessToken(scope);
    }

    return authInfo.accessToken;
  }
}

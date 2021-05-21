import axios from 'axios';
import { IUser } from '@example/services/user';
import { USER_PHONE, USER_PWD } from '@example/constants';
const sessionKey = 'session-key';
const tokenKey = 'token-key';
export class UserStorage {
  static async getAccount(): Promise<IUser> {
    const token = window.localStorage.getItem(tokenKey);
    let account: IUser;
    if (token) {
      const sesseionAccout = window.sessionStorage.getItem(sessionKey);
      if (sesseionAccout) {
        account = JSON.parse(sesseionAccout);
      } else {
        try {
          const { data } = await axios.get<IUser>('/user/user/info', {
            headers: {
              authorization: token,
            },
            baseURL: 'https://www.maocanhua.cn',
          });
          account = data;
        } catch (error) {
          this.logout();
          return this.getAccount();
        }
      }
    } else {
      const { data } = await axios.post<IUser>(
        '/user/visitor/login',
        {
          phone: USER_PHONE,
          password: USER_PWD,
        },
        {
          baseURL: 'https://www.maocanhua.cn',
        }
      );

      account = data;
    }
    window.sessionStorage.setItem(sessionKey, JSON.stringify(account));
    window.localStorage.setItem(tokenKey, account.token);
    return account;
  }

  static async getToken() {
    const account = await this.getAccount();
    return account ? account.token : '';
  }

  static setToken(token: string) {
    window.localStorage.setItem(tokenKey, token);
  }

  static logout() {
    window.localStorage.setItem(tokenKey, '');
    window.sessionStorage.setItem(sessionKey, '');
  }
}

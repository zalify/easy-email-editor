import { UserStorage } from '@demo/utils/user-storage';
import { USER } from '.';

type IConfigUser = {
  phone: string;
  password: string;
  categoryId: number;
  provideUserId?: number;
  provideCategoryId?: number;
};

const DEFAULT_USER_KEY = 'DEFAULT_USER_KEY';

window.setUser = (user: IConfigUser) => {
  if (!user.phone) {
    throw new Error('Need phone');
  }
  if (!user.password) {
    throw new Error('Need password');
  }
  if (!user.categoryId) {
    throw new Error('Need categoryId');
  }
  localStorage.setItem(DEFAULT_USER_KEY, JSON.stringify(user));
  UserStorage.logout();
  window.location.reload();
};

window.getUser = () => USER;

window.removeUser = () => {
  localStorage.setItem(DEFAULT_USER_KEY, '');
  window.location.reload();
};

export function getUserConfig(defaultUser: IConfigUser): IConfigUser {
  try {
    const newUser = JSON.parse(localStorage.getItem(DEFAULT_USER_KEY)!);
    if (!newUser) return defaultUser;
    return newUser;
  } catch (error) {
    return defaultUser;
  }
}

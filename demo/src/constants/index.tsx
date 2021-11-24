import { getUserConfig } from './getUserConfig';

export const ASSET_DOMAIN = 'https://assets.maocanhua.cn';

export const USER = getUserConfig({
  // your account
  phone: '12252691060',
  password: '12252691060',
  categoryId: 96,

  // standard user
  provideUserId: 77,
  provideCategoryId: 90
});


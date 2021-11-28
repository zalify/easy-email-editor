import { IPage } from 'easy-email-core';

export interface IEmailTemplate {
  content: IPage;
  subject: string;
  subTitle: string;
}

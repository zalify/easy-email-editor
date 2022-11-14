import { IPage } from 'easy-email-core';
export interface IEmailTemplate {
    content: IPage;
    subject: string;
    subTitle: string;
}
declare global {
    function t(key: string): string;
    function t(key: string, placeholder?: React.ReactNode): JSX.Element;
    interface Window {
        t: (key: string, placeholder?: React.ReactNode) => JSX.Element;
    }
}

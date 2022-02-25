import { request } from './axios.config';
import { getCookie } from '../utils/utils';
import { v4 as uuidv4 } from 'uuid';
const QI_NIUI_KEY = 'qiniuConfig';

type QiniuConfig = { origin: string; token: string; };

export const common = {
  async uploadByQiniu(file: File | Blob): Promise<string> {
    const qiniuCookie = getCookie(QI_NIUI_KEY); // 有cookie先拿cookie
    let qiniuConfig: QiniuConfig;
    if (qiniuCookie) {
      qiniuConfig = JSON.parse(qiniuCookie);
    } else {
      qiniuConfig = await request.get<QiniuConfig>(
        '/upload/visitor/qiniu-token'
      );
      document.cookie = `${QI_NIUI_KEY}=${JSON.stringify(
        qiniuConfig
      )}; max-age=540;`; // 设置十分钟有效期
    }
    const { token, origin } = qiniuConfig;

    const data = new FormData();
    data.append('file', file);
    data.append('token', token);
    data.append('key', uuidv4() + `-${(file as any)?.name || ''}`);
    const res = await request.post<{ key: string; }>(
      'https://up.qiniu.com',
      data
    );
    return origin + '/' + res.key;
  },
  uploadByUrl(url: string) {
    return request.get<string>('/upload/user/upload-by-url', {
      params: {
        url,
      },
    });
  },
  getMenu(): Promise<IAppMenuItem[]> {
    return Promise.resolve([
      {
        name: '数据模板',
        icon: 'bar-chart',
        isOpen: true,
        children: [
          {
            name: '数据模板',
            url: '/',
          },
        ],
      },
    ]);
  },
  sendTestEmail(data: {
    toEmail: string;
    subject: string;
    html: string;
    text: string;
  }) {
    return request.post('/email/user/send', {
      to_email: data.toEmail,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  },
};

export interface IAppMenuItem {
  name: string;
  url?: string;
  icon: string;
  isOpen?: boolean;
  children: IAppSubMenuItem[];
}

export interface IAppSubMenuItem {
  name: string;
  url: string;
  isOpen?: boolean;
}

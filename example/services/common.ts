import { request } from './axios.config';
import { getCookie } from '../util/utils';
import { IBlockData } from '../../VisualEditor/typings';
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
    const res = await request.post<{ key: string; }>(
      'http://upload.qiniu.com',
      data
    );
    return origin + '/' + res.key;
  },
  postSketchToJson(file: File | Blob) {
    const data = new FormData();
    data.append('file', file);
    return request.post<IBlockData[][]>('/parse/sketch-json', data);
  },
  uploadByUrl(url: string) {
    return request.get<string>('/upload/user/upload-by-url', {
      params: {
        url
      }
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
            url: '/'
          }

        ]
      }
    ]);
  }
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

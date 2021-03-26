import { request } from './axios.config';
import { randomRange } from '@example/util/utils';
const ONE_DAY = 86400;

export const promotion = {
  async getExample1Data() {
    const data = {
      end_time: new Date().getTime() / 1000 + randomRange(ONE_DAY, ONE_DAY * 3),
      list: [
        {
          id: 1,
          title: '19个副业赚钱项目，没钱没人脉也能开启你的第二事业!',
        },
        {
          id: 2,
          title: '29个副业赚钱项目，没钱没人脉也能开启你的第二事业!',
        },
        {
          id: 3,
          title: '39个副业赚钱项目，没钱没人脉也能开启你的第二事业!',
        },
        {
          id: 4,
          title: '49个副业赚钱项目，没钱没人脉也能开启你的第二事业!',
        },
      ],
    };
    return Promise.resolve(data);
  },
  async getExample2Data() {
    const awards = [
      {
        id: 1,
        bitmap: 'https://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
        bgColor: '#F8D484',
        text: '苹果手机1',
        color: '#AC6900',
      },
      {
        id: 2,
        bitmap: 'https://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
        bgColor: '#FEE8A6',
        text: '扫地机器人2',
        color: '#AC6900',
      },
      {
        id: 3,
        bitmap: 'https://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
        bgColor: '#F8D484',
        text: '扫地机器人3',
        color: '#AC6900',
      },
      {
        id: 4,
        bitmap: 'https://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
        bgColor: '#FEE8A6',
        text: '精品图书4',
        color: '#AC6900',
      },
      {
        id: 5,
        bitmap: 'https://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
        bgColor: '#F8D484',
        text: '扫地机器人5',
        color: '#AC6900',
      },
      {
        id: 6,
        bitmap: 'https://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
        bgColor: '#FEE8A6',
        text: '扫地机器人6',
        color: '#AC6900',
      },
    ];
    const data = {
      awards,
      select_id: randomRange(0, awards.length - 1),
    };
    return Promise.resolve(data);
  },
};

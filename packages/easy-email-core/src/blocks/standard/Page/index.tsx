import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { Wrapper } from '../Wrapper';
import { merge } from 'lodash';

export type IPage = IBlockData<
  {
    'background-color'?: string;
    width: string;
  },
  {
    breakpoint?: string;
    headAttributes: string;
    fonts?: { name: string; href: string }[];
    headStyles?: {
      content?: string;
      inline?: 'inline';
    }[];
    responsive?: boolean;
    'font-family': string;
    'font-size': string;
    'line-height': string;
    'text-color': string;
    'user-style'?: {
      content?: string;
      inline?: 'inline';
    };
    'content-background-color'?: string;
  }
>;

export const Page = createBlock<IPage>({
  name: 'Page',
  type: BasicType.PAGE,
  create: (payload) => {
    const defaultData: IPage = {
      type: BasicType.PAGE,
      data: {
        value: {
          breakpoint: '480px',
          headAttributes: '',
          'font-size': '14px',
          'line-height': '1.7',
          headStyles: [],
          fonts: [],
          responsive: true,
          'font-family': 'lucida Grande,Verdana,Microsoft YaHei',
          'text-color': '#000000',
        },
      },
      attributes: {
        'background-color': '#efeeea',
        width: '600px',
      },
      children: [Wrapper.create()],
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
});

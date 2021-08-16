import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

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
    'text-color': string;
    'user-style'?: {
      content?: string;
      inline?: 'inline';
    };
    'content-background-color'?: string;
  }
>;

export const Page: IBlock<IPage> = {
  name: 'Page',
  type: BasicType.PAGE,
  Panel,
  createInstance,
  validParentType: [],
};

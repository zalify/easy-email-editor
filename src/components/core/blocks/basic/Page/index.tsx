import { Panel } from './Panel';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IPage = IBlockData<{}>;

export const Page: IBlock<IPage> = {
  name: 'email layout',
  type: BasicType.PAGE,
  Editor,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType).filter(
      (type) => ![BasicType.PAGE].includes(type)
    ),
  ],
};

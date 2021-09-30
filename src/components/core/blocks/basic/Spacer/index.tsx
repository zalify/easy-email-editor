import { Panel } from './Panel';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';

export type ISpacer = IBlockData<{
  'container-background-color'?: string;
  height?: string;
  padding?: string;
}>;

export const Spacer: IBlock<ISpacer> = createBlock({
  name: 'Spacer',
  type: BasicType.SPACER,
  Panel,
  create: (payload) => {
    const defaultData: ISpacer = {
      type: BasicType.SPACER,
      data: {
        value: {},
      },
      attributes: {
        height: '20px',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
});

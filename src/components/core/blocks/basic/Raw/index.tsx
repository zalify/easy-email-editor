import { Panel } from './Panel';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';

export type IRaw = IBlockData<{}>;

export const Raw = createBlock<IRaw>({
  name: 'Raw',
  type: BasicType.RAW,
  Panel,
  create: (payload) => {
    const defaultData: IRaw = {
      type: BasicType.RAW,
      data: {
        value: {
          content: '<% if (user) { %>'
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER, BasicType.SECTION, BasicType.GROUP, BasicType.COLUMN, BasicType.HERO],
});

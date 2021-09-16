import { Panel } from './Panel';
import { IBlockData } from '@/typings';
import { BasicType } from '@/constants';
import { createBlock } from '@/utils/createBlock';
import { merge } from 'lodash';
export type IDivider = IBlockData<
  {
    'border-color'?: string;
    'border-style'?: string;
    'border-width'?: string;
    'container-background-color'?: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    padding?: string;
  },
  {}
>;

export const Divider = createBlock<IDivider>({
  name: 'Divider',
  type: BasicType.DIVIDER,
  Panel,
  create: (payload) => {
    const defaultData: IDivider = {
      type: BasicType.DIVIDER,
      data: {
        value: {},
      },
      attributes: {
        align: 'center',
        'border-width': '1px',
        'border-style': 'solid',
        'border-color': '#C9CCCF',
        padding: '10px 0px 10px 0px',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
});

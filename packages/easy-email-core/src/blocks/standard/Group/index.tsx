import { IBlock, IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';

export type IGroup = IBlockData<{
  width?: string;
  'vertical-align'?: 'middle' | 'top' | 'bottom';
  'background-color'?: string;
  direction?: 'ltr' | 'rtl';
}>;

export const Group: IBlock<IGroup> = createBlock({
  name: 'Group',
  type: BasicType.GROUP,
  create: (payload) => {
    const defaultData: IGroup = {
      type: BasicType.GROUP,
      data: {
        value: {},
      },
      attributes: {
        'vertical-align': 'top',
        direction: 'ltr',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION],
});

import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';

export type ITemplate = IBlockData<
  {},
  {
    idx?: string | null;
  }
>;

export const Template = createBlock<ITemplate>({
  name: 'Template',
  type: BasicType.TEMPLATE,
  create: (payload) => {
    const defaultData: ITemplate = {
      type: BasicType.TEMPLATE,
      data: {
        value: {
          idx: '',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [],
});

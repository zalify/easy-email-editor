import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';

export type ITable = IBlockData<{}, { content: string }>;

export const Table = createBlock<ITable>({
  name: 'Table',
  type: BasicType.TABLE,
  create: (payload) => {
    const defaultData: ITable = {
      type: BasicType.TABLE,
      data: {
        value: {
          content: '',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN],
});

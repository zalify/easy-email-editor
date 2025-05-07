import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export type IColumn = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'inner-border'?: string;
    'inner-border-radius'?: string;
    padding?: string;
    'text-align'?: string;
    'vertical-align'?: string;
    width?: string;
  },
  {}
>;

export const Column = createBlock<IColumn>({
  get name() {
    return t('Column');
  },
  type: BasicType.COLUMN,
  create: payload => {
    const defaultData: IColumn = {
      type: BasicType.COLUMN,
      data: {
        value: {},
      },
      attributes: {
        padding: '0px 0px 0px 0px',
        border: 'none',
        'vertical-align': 'top',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.SECTION, BasicType.GROUP],

  render(params) {
    return (
      <BasicBlock
        params={params}
        tag='mj-column'
      />
    );
  },
});

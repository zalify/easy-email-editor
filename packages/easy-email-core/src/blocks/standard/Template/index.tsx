import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { BlockRenderer } from '@core/components/BlockRenderer';
import { t } from '@core/utils';

export type ITemplate = IBlockData<
  {},
  {
    idx?: string | null;
  }
>;

export const Template = createBlock<ITemplate>({
  get name() {
    return t('Template');
  },
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
  render(params) {
    const { data } = params;
    return (
      <>
        {`
          ${data.children.map((child) => (
          <BlockRenderer {...params} data={child} />
        ))}
        `}
      </>
    );
  },
});

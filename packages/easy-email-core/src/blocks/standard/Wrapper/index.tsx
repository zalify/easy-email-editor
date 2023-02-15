
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { CSSProperties } from 'react';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import React from 'react';
import { BasicBlock } from '@core/components/BasicBlock';
export type IWrapper = IBlockData<
  {
    'background-color'?: string;
    border?: string;
    'border-radius'?: string;
    'full-width'?: string;
    direction?: 'ltr' | 'rtl';
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
  },
  {}
>;

export const Wrapper = createBlock<IWrapper>({
  name: 'Wrapper',
  type: BasicType.WRAPPER,
  create: (payload) => {
    const defaultData: IWrapper = {
      type: BasicType.WRAPPER,
      data: {
        value: {},
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        border: 'none',
        direction: 'ltr',
        'text-align': 'center',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE],
  render(params) {
    return <BasicBlock params={params} tag="mj-wrapper" />;
  },
});

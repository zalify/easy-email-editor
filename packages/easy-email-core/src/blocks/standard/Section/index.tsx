import React, { CSSProperties } from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { t } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';

export type ISection = IBlockData<
  {
    'background-color'?: string;
    'background-position'?: string;
    'background-position-x'?: string;
    'background-position-y'?: string;
    'background-repeat'?: 'repeat' | 'no-repeat';
    'background-size'?: string;
    'background-url'?: string;
    border?: string;
    'border-radius'?: string;
    direction?: 'ltr' | 'rtl';
    'full-width'?: 'ltr' | 'rtl';
    padding?: string;
    'text-align'?: CSSProperties['textAlign'];
    'max-width'?: string;
  },
  {}
>;

export const Section = createBlock<ISection>({
  get name() {
    return t('Section');
  },
  type: BasicType.SECTION,
  create: payload => {
    const defaultData: ISection = {
      type: BasicType.SECTION,
      data: {
        value: {
          noWrap: false,
        },
      },
      attributes: {
        padding: '20px 0px 20px 0px',
        'background-repeat': 'repeat',
        'background-size': 'auto',
        'background-position': 'top center',
        border: 'none',
        direction: 'ltr',
        'text-align': 'center',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  render(params) {
    return (
      <BasicBlock
        params={params}
        tag='mj-section'
      />
    );
  },
});

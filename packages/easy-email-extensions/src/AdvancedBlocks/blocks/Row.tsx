import { components, blocks, BasicType } from 'easy-email-core';
import { AdvancedType } from '../constants';
import { IBlockData } from '@core/typings';
import { createCustomBlock } from '@core/utils/createCustomBlock';
import { merge } from 'lodash';
import React from 'react';
import { CSSProperties } from 'react';

const { Section, Template } = components;
const { Column: ColumnBlock } = blocks;

export type IRow = IBlockData<
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
  {
    noWrap: boolean,
  }
>;

export const Row = createCustomBlock<IRow>({
  name: 'Row',
  type: AdvancedType.ROW,
  create: (payload) => {
    const defaultData: IRow = {
      type: AdvancedType.ROW,
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
  render(data, idx, mode, context) {
    const attributes = data.attributes;
    return (
      <Section {...attributes}>
        <Template idx={idx} value={{ idx }}>
          {
            data.children
          }
        </Template>
      </Section>
    );

  },
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
});

ColumnBlock.validParentType.push(Row.type);
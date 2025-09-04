import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { BasicBlock } from '@core/components/BasicBlock';
import { t } from '@core/utils';

export type IText = IBlockData<
  {
    color?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
    height?: string;
    'text-decoration'?: string;
    'text-transform'?: string;
    align?: string;
    'container-background-color'?: string;
    width?: string;
    padding?: string;
  },
  {
    content: string;
  }
>;

// Function to detect Persian/Farsi text
function isPersianText(text: string): boolean {
  if (!text) return false;
  // Persian/Farsi Unicode ranges
  const persianRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return persianRegex.test(text);
}

export const Text = createBlock<IText>({
  get name() {
    return t('Text');
  },
  type: BasicType.TEXT,
  create: payload => {
    const defaultData: IText = {
      type: BasicType.TEXT,
      data: {
        value: {
          content: t('Make it easy for everyone to compose emails!'),
        },
      },
      attributes: {
        padding: '10px 25px 10px 25px',
        align: 'left',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.COLUMN, BasicType.HERO],
  render(params) {
    const { data } = params;
    const content = data.data.value.content;

    // Check if content contains Persian text
    const hasPersian = isPersianText(content);

    // Wrap content with RTL attributes if Persian text is detected
    const wrappedContent = hasPersian
      ? `<div dir="rtl" lang="fa" data-rtl="true">${content}</div>`
      : content;

    return (
      <BasicBlock
        params={params}
        tag='mj-text'
      >
        {wrappedContent}
      </BasicBlock>
    );
  },
});

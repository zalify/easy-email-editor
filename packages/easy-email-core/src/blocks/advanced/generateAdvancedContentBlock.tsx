
import { Column, Section, Template } from '@core/components';
import { BasicType } from '@core/constants';
import { IBlockData } from '@core/typings';
import { getParentByIdx } from '@core/utils';
import { classnames } from '@core/utils/classnames';
import { createCustomBlock } from '@core/utils/createCustomBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { merge } from 'lodash';
import React from 'react';
import { standardBlocks } from '../standard';

export function generateAdvancedContentBlock<T extends IBlockData>(option: {
  type: string;
  baseType: BasicType;
}) {
  const baseBlock = Object.values(standardBlocks).find(b => b.type === option.baseType as any as keyof typeof standardBlocks);
  if (!baseBlock) {
    throw new Error(`Can not find ${option.baseType}`);
  }

  return createCustomBlock<T>({
    name: baseBlock.name,
    type: option.type,
    validParentType: [BasicType.PAGE, BasicType.WRAPPER, BasicType.COLUMN, BasicType.GROUP],
    create: (payload) => {
      const defaultData = {
        ...baseBlock.create(),
        type: option.type
      } as any;
      return merge(defaultData, payload);
    },
    render: (data, idx, mode, context) => {

      const content = (
        <Template>{{
          ...data,
          type: option.baseType,
          attributes: {
            ...data.attributes,
            'css-class': classnames(data.attributes['css-class'], getPreviewClassName(idx, option.type))
          }
        }}
        </Template>
      );

      if (!idx || !context) {
        return content;
      }

      const parentBlockData = getParentByIdx({ content: context }, idx);
      if (!parentBlockData) {
        return content;
      }
      if (parentBlockData.type === BasicType.PAGE || parentBlockData.type === BasicType.WRAPPER) {
        return <Template><Section padding="0px"><Column>{content}</Column></Section></Template>;
      }

      return content;

    },
  });
}
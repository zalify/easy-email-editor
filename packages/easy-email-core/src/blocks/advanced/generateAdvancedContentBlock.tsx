import { Column, Section } from '@core/components';
import { BasicType, AdvancedType } from '@core/constants';
import { BlockManager, getParentByIdx } from '@core/utils';
import { classnames } from '@core/utils/classnames';
import React from 'react';
import { generateAdvancedBlock } from './generateAdvancedBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { IBlockData } from '@core';

export function generateAdvancedContentBlock<T extends IBlockData>(option: {
  type: string;
  baseType: BasicType;
}) {
  return generateAdvancedBlock<T>({
    ...option,

    validParentType: [
      BasicType.PAGE,
      BasicType.WRAPPER,
      BasicType.COLUMN,
      BasicType.GROUP,
      BasicType.HERO,

      AdvancedType.WRAPPER,
      AdvancedType.COLUMN,
      AdvancedType.GROUP,
      AdvancedType.HERO,
    ],
    getContent: (params) => {
      const { data, idx, mode, context, index } = params;

      const previewClassName =
        mode === 'testing'
          ? classnames(
              index === 0 && idx && getPreviewClassName(idx, data.type)
            )
          : '';

      const blockData = {
        ...data,
        type: option.baseType,
        attributes: {
          ...data.attributes,
          'css-class': classnames(
            data.attributes['css-class'],
            previewClassName
          ),
        },
      };

      const block = BlockManager.getBlockByType(blockData.type);
      if (!block) {
        throw new Error(`Can not find ${blockData.type}`);
      }

      const children = block?.render({ ...params, data: blockData, idx });

      const parentBlockData = getParentByIdx({ content: context! }, idx!);
      if (!parentBlockData) {
        return children;
      }

      if (
        parentBlockData.type === BasicType.PAGE ||
        parentBlockData.type === BasicType.WRAPPER ||
        parentBlockData.type === AdvancedType.WRAPPER
      ) {
        return (
          <Section padding='0px' text-align='left'>
            <Column>{children}</Column>
          </Section>
        );
      }

      return children;
    },
  });
}

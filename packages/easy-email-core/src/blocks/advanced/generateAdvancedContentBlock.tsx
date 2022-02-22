import { Column, Section } from '@core/components';
import { BasicType, AdvancedType } from '@core/constants';
import { getParentByIdx } from '@core/utils';
import { classnames } from '@core/utils/classnames';
import { MERGE_TAG_CLASS_NAME } from '@core/constants';
import React from 'react';
import { AdvancedBlock, generateAdvancedBlock } from './generateAdvancedBlock';

export function generateAdvancedContentBlock<T extends AdvancedBlock>(option: {
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

      AdvancedType.WRAPPER,
      AdvancedType.COLUMN,
      AdvancedType.GROUP,
    ],
    getContent: (data, idx, mode, context, dataSource) => {
      const parentBlockData = getParentByIdx({ content: context! }, idx!);
      if (!parentBlockData) return null;
      const blockData = {
        ...data,
        type: option.baseType,
        attributes: {
          ...data.attributes,
          'css-class': classnames(
            option.type === AdvancedType.TEXT &&
              mode === 'testing' &&
              MERGE_TAG_CLASS_NAME
          ),
        },
      };

      if (
        parentBlockData.type === BasicType.PAGE ||
        parentBlockData.type === BasicType.WRAPPER ||
        parentBlockData.type === AdvancedType.WRAPPER
      ) {
        return (
          <Section padding='0px'>
            <Column>{blockData}</Column>
          </Section>
        );
      }

      return blockData;
    },
  });
}

import { Column, Section, Template, Raw } from '@core/components';
import { BasicType } from '@core/constants';
import { IBlockData } from '@core/typings';
import { getParentByIdx } from '@core/utils';
import { classnames } from '@core/utils/classnames';
import { createCustomBlock } from '@core/utils/createCustomBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { TemplateEngineManager } from '@core/utils/TemplateEngineManager';
import { merge } from 'lodash';
import React from 'react';
import { standardBlocks } from '../standard';

export function generateAdvancedContentBlock<T extends AdvancedBlock>(option: {
  type: string;
  baseType: BasicType;
}) {
  const baseBlock = Object.values(standardBlocks).find(
    (b) => b.type === (option.baseType as any as keyof typeof standardBlocks)
  );
  if (!baseBlock) {
    throw new Error(`Can not find ${option.baseType}`);
  }

  return createCustomBlock<T>({
    name: baseBlock.name,
    type: option.type,
    validParentType: [
      BasicType.PAGE,
      BasicType.WRAPPER,
      BasicType.COLUMN,
      BasicType.GROUP,
    ],
    create: (payload) => {
      const defaultData = {
        ...baseBlock.create(),
        type: option.type,
      } as any;
      return merge(defaultData, payload);
    },
    render: (data, idx, mode, context) => {
      const { iteration } = data.data.value;

      let content = (
        <Template>
          {{
            ...data,
            type: option.baseType,
            attributes: {
              ...data.attributes,
              'css-class': classnames(
                data.attributes['css-class'],
                getPreviewClassName(idx, option.type)
              ),
            },
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

      if (
        parentBlockData.type === BasicType.PAGE ||
        parentBlockData.type === BasicType.WRAPPER
      ) {
        content = (
          <Section padding='0px'>
            <Column>{content}</Column>
          </Section>
        );
      }

      if (!iteration) return content;

      return TemplateEngineManager.generateTagTemplate('iteration')(
        iteration,
        <Template>{content}</Template>
      );
    },
  });
}

// {% for product in collection.products %}
//   {{ product.title }}
// {% endfor %}
export interface AdvancedBlock extends IBlockData {
  data: {
    value: {
      condition: '';
      iteration: {
        dataSource: string; // -> collection.products
        itemName: string; // -> product
        limit: number;
      };
    };
  };
}

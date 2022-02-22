import { Template, Raw } from '@core/components';
import { BasicType } from '@core/constants';
import { IBlock, IBlockData } from '@core/typings';
import { getParentByIdx } from '@core/utils';
import { createCustomBlock } from '@core/utils/createCustomBlock';
import { getPreviewClassName } from '@core/utils/getPreviewClassName';
import { TemplateEngineManager } from '@core/utils/TemplateEngineManager';
import { merge } from 'lodash';
import React from 'react';
import { standardBlocks } from '../standard';

export function generateAdvancedBlock<T extends AdvancedBlock>(option: {
  type: string;
  baseType: BasicType;
  getContent: NonNullable<IBlock['render']>;
  validParentType: string[];
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
    validParentType: option.validParentType,
    create: (payload) => {
      const defaultData = {
        ...baseBlock.create(),
        type: option.type,
      } as any;
      return merge(defaultData, payload);
    },
    render: (data, idx, mode, context, dataSource) => {
      const { iteration, condition } = data.data.value;

      if (!idx || !context) {
        return null;
      }

      const parentBlockData = getParentByIdx({ content: context }, idx);
      if (!parentBlockData) {
        return null;
      }

      const baseContent = option.getContent(
        data,
        idx,
        mode,
        context,
        dataSource
      ) as any;

      let children = baseContent;
      if (mode === 'testing') {
        return (
          <Template>
            {new Array(iteration?.mockQuantity || 1)
              .fill(true)
              .map((_, index) => (
                <Template key={index}>{baseContent}</Template>
              ))}
          </Template>
        );
      }

      if (!iteration || !iteration.enabled) return children;

      // mode === 'production'

      children = TemplateEngineManager.generateTagTemplate('iteration')(
        {
          ...iteration,
          limit: iteration.limit,
        },
        <Template>{baseContent}</Template>
      );

      if (condition) {
        children = TemplateEngineManager.generateTagTemplate('condition')(
          condition,
          children
        );
      }

      return children;
    },
  });
}

// {% for product in collection.products %}
//   {{ product.title }}
// {% endfor %}

export interface AdvancedBlock extends IBlockData {
  data: {
    value: {
      condition?: {
        groups: [
          {
            symbol: 'and' | 'or';
            groups: Array<{
              path: string;
              operator: Operator;
              value: string | number;
            }>;
          }
        ];
        symbol: 'and' | 'or';
      };
      iteration?: {
        enabled: boolean;
        dataSource: string; // -> collection.products
        itemName: string; // -> product
        limit: number;
        mockQuantity: number;
      };
    };
  };
}

export enum Operator {
  EQUAL = '==',
  NOT_EQUAL = '!=',
  GREATER = '>',
  GREATER_OR_EQUAL = '>=',
  LESS = '<',
  LESS_OR_EQUAL = '<=',
}

function wrapTable(content: any, classname: string) {
  return (
    <Template>
      <Raw>{`<table class="${classname}" width="100%"><tbody><tr><td>`}</Raw>
      {content}
      <Raw>{`</td></tr></tbody></table>`}</Raw>
    </Template>
  );
}

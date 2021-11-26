import React, { ReactElement, useMemo } from 'react';
import { BlockManager } from '@core/utils';
import { IBlockData, RecursivePartial } from '@core/typings';
import { parseReactBlockToBlockData } from '@core/utils/parseReactBlockToBlockData';
import { set } from 'lodash';

export interface MjmlBlockProps<T extends IBlockData> {
  type: T['type'];
  value?: RecursivePartial<T['data']['value']>;
  attributes?: RecursivePartial<T['attributes']>;
  children?: ReactElement | ReactElement[] | string;
}

export default function MjmlBlock<T extends IBlockData>({
  value,
  type,
  attributes,
  children,
}: MjmlBlockProps<T>) {
  const block = BlockManager.getBlockByType(type);
  if (!block) {
    throw new Error(`Can no find ${type}`);
  }

  const mergeValue = useMemo((): undefined | {} => {
    if (typeof children === 'string') {
      if (!value) {
        return {
          content: children,
        };
      } else {
        set(value, 'content', children);
        return value;
      }
    }

    return value;
  }, [children, value]);

  const instance = block.create({
    data: {
      value: mergeValue,
    },
    attributes,
    children:
      typeof children === 'string'
        ? []
        : React.Children.map(
            children,
            (child) => child && parseReactBlockToBlockData(child)
          )?.filter(Boolean) || [],
  });

  return <>{JSON.stringify(instance)}</>;
}

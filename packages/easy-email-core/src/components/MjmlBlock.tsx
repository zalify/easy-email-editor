import React, { useMemo } from 'react';
import { BlockManager } from '@core/utils';
import { IBlockData, RecursivePartial } from '@core/typings';
import { set } from 'lodash';

export interface MjmlBlockProps<T extends IBlockData> {
  idx?: string | null;
  type: T['type'];
  value?: RecursivePartial<T['data']['value']>;
  attributes?: RecursivePartial<T['attributes']>;
  children?: React.ReactNode;
}

export default function MjmlBlock<T extends IBlockData>({
  idx,
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

  return (
<>
    {block.render({
      idx: idx,
      mode: 'production',
      data: {
        type: block.type,
        data: {
          value: mergeValue,
        },
        attributes,
        children: [],
      },
      children
    })}
</>
);
}

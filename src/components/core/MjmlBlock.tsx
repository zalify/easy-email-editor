import { IBlockData, RecursivePartial } from '@/typings';
import { parseMjmlBlockToBlockData } from '@/utils/parseMjmlBlockToBlockData';
import { set } from 'lodash';
import React, { ReactElement, useMemo } from 'react';
import { BlocksMap } from './blocks';

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
  const block = BlocksMap.findBlockByType(type);

  const mergeData = useMemo((): undefined | {} => {
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

  const instance = block.createInstance({
    data: mergeData,
    attributes,
    children:
      typeof children === 'string'
        ? []
        : React.Children.map(
            children,
            (child) => child && parseMjmlBlockToBlockData(child)
          )?.filter(Boolean) || [],
  });

  return <>{JSON.stringify(instance)}</>;
}

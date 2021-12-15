import React, { ReactElement, useMemo } from 'react';
import { BlockManager, isValidBlockData } from '@core/utils';
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

  const getChild = (child: any) => {
    if (!child) return false;
    if (isValidBlockData(child)) return child;
    return child && parseReactBlockToBlockData(child);
  };

  const getChildren = () => {
    if (
      Array.isArray(children) &&
      children.every((child) => isValidBlockData(child))
    ) {
      return children;
    }

    if (isValidBlockData(children)) {
      return [children];
    }

    if (typeof children === 'string') return [];
    return React.Children.map(children, getChild);
  };

  const instance = block.create({
    data: {
      value: mergeValue,
    },
    attributes,
    children: getChildren(),
  });

  return <>{JSON.stringify(instance)}</>;
}

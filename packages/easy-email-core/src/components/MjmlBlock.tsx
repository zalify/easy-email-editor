import React, { isValidElement, useMemo } from 'react';
import { BlockManager, isValidBlockData } from '@core/utils';
import { IBlockData, RecursivePartial } from '@core/typings';
import { parseReactBlockToBlockData } from '@core/utils/parseReactBlockToBlockData';
import { set } from 'lodash';

export type MjmlBlockChild = JSX.Element | IBlockData | string | null | false;

export interface MjmlBlockProps<T extends IBlockData> {
  type: T['type'];
  value?: RecursivePartial<T['data']['value']>;
  attributes?: RecursivePartial<T['attributes']>;
  children?: MjmlBlockChild | Array<MjmlBlockChild>;
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
    if (!child) return null;
    if (isValidBlockData(child)) return child;
    if (isValidElement(child)) return parseReactBlockToBlockData(child);
    return child;
  };

  const getChildren = () => {
    if (Array.isArray(children)) {
      return children.map(getChild).filter(Boolean);
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
    children: getChildren() || [],
  });

  return <>{JSON.stringify(instance)}</>;
}

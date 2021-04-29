import { BlockType } from '@/constants';
import { IBlockData, RecursivePartial } from '@/typings';
import { findBlockByType } from './block';

export function createBlockItem<T extends IBlockData>(
  type: BlockType,
  payload?: RecursivePartial<T>
): IBlockData {
  const component = findBlockByType(type);
  if (component) {
    return component.createInstance(payload as any);
  }
  throw new Error('没有匹配的组件');
}
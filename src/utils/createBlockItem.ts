import { BlocksMap } from '@/components/core/blocks';
import { BlockType } from '@/constants';
import { IBlockData, RecursivePartial } from '@/typings';

export function createBlockItem<T extends IBlockData>(
  type: BlockType,
  payload?: RecursivePartial<T>
): IBlockData {
  const component = Object.values(BlocksMap).find((item) => {
    return item.type === type;
  });
  if (component) {
    return component.createInstance(payload as any);
  }
  throw new Error('没有匹配的组件');
}
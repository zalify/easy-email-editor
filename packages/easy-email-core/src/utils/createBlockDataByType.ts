import { IBlockData, RecursivePartial } from '@core/typings';
import { BlockManager } from './BlockManager';

export function createBlockDataByType<T extends IBlockData>(
  type: string,
  payload?: RecursivePartial<T>
): IBlockData {
  const component = BlockManager.getBlockByType(type);
  if (component) {
    return component.create(payload as any);
  }
  throw new Error(`No match \`${type}\` block`);
}

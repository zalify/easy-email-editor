import { BlockManager } from './BlockManager';
import { IBlockData } from '../typings';

export function isValidBlockData<T>(data: any): data is IBlockData {
  try {
    if (
      data.attributes &&
      data.children &&
      data.data &&
      data.type &&
      BlockManager.getBlockByType(data.type)
    ) {
      return true;
    }
  } catch (error) {}
  return false;
}

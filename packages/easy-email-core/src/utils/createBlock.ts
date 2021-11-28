import { IBlock, IBlockData } from '@core/typings';

interface CreateBlockOption<T extends IBlockData>
  extends Omit<IBlock<T>, 'transform'> {}

export function createBlock<T extends IBlockData>(
  block: CreateBlockOption<T>
): IBlock<T> {
  return block;
}

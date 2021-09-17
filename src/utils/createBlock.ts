import { IBlock, IBlockData } from '@/typings';

interface CreateBlockOption<T extends IBlockData>
  extends Omit<IBlock<T>, 'transform'> { }

export function createBlock<T extends IBlockData>(
  block: CreateBlockOption<T>
): IBlock<T> {
  return block;
}

export function createCustomBlock<T extends IBlockData>(
  block: CreateBlockOption<T> & { render: IBlock<T>['render']; }
): IBlock<T> {
  return {
    ...block,
  };
}

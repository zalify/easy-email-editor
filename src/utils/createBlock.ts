import { IBlock, IBlockData } from '@/typings';

interface CreateBlockOption<T extends IBlockData>
  extends Omit<IBlock<T>, 'transform' | 'createInstance'> {
  create: IBlock<T>['createInstance'];
}

export function createBlock<T extends IBlockData>(
  block: CreateBlockOption<T>
): IBlock<T> {
  return {
    ...block,
    createInstance: block.create,
  };
}

export function createCustomBlock<T extends IBlockData>(
  block: CreateBlockOption<T> & { render: IBlock['transform'] }
): IBlock<T> {
  return {
    ...block,
    transform: block.render,
    createInstance: block.create,
  };
}

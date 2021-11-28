import { IBlock, IBlockData } from '@core/typings';

interface CreateBlockOption<T extends IBlockData>
  extends Omit<IBlock<T>, 'transform'> {}

export function createCustomBlock<T extends IBlockData>(
  block: CreateBlockOption<T> & { render: IBlock<T>['render'] }
): IBlock<T> {
  return {
    ...block,
  };
}

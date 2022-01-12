import { IPage } from '@core/blocks';
import { IBlock, IBlockData } from '@core/typings';
import { ReactElement } from 'react';

interface CreateBlockOption<T extends IBlockData>
  extends Omit<IBlock<T>, 'transform'> {}

export function createCustomBlock<T extends IBlockData>(
  block: CreateBlockOption<T> & {
    render: (
      data: T,
      idx: string | null,
      mode: 'testing' | 'production',
      context?: IPage,
      dataSource?: { [key: string]: any }
    ) => IBlockData | ReactElement | null;
  }
): IBlock<T> {
  return {
    ...block,
  };
}

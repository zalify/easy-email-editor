import { BlockManager } from '../BlockManager';
import { BasicType } from '@core/constants';
import { createBlockDataByType } from '../createBlockDataByType';

describe('Test createBlockItem', () => {
  it('should render as expected', () => {
    expect(createBlockDataByType(BasicType.TEXT)).toEqual(
      BlockManager.getBlockByType(BasicType.TEXT)!.create()
    );
  });
});

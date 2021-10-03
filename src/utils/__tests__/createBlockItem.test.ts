import { BlocksMap } from './../../components/core/blocks/index';
import { BasicType } from '@/constants';
import { createBlockItem } from '@/utils/createBlockItem';

describe('Test createBlockItem', () => {
  it('should render as expected', () => {
    expect(createBlockItem(BasicType.TEXT)).toEqual(
      BlocksMap.findBlockByType(BasicType.TEXT).create()
    );
  });
});

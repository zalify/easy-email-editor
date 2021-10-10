import { BasicType } from '@/constants';
import { BlocksMap } from '../index';

describe('Test "blocks"', () => {
  const blocks = BlocksMap.getBlocks();

  it.each(blocks)('$name should have required property', (block) => {
    expect(block).toHaveProperty('name');
    expect(block).toHaveProperty('type');
    expect(block).toHaveProperty('validParentType');
    expect(block).toHaveProperty('create');
    expect(block).toHaveProperty('Panel');
  });
});

describe('Test "blocksMap.getAutoCompletePath" ', () => {
  expect(BlocksMap.getAutoCompletePath(BasicType.TEXT, BasicType.SECTION)).toEqual([BasicType.COLUMN]);
  expect(BlocksMap.getAutoCompletePath(BasicType.TEXT, BasicType.WRAPPER)).toEqual([BasicType.COLUMN, BasicType.SECTION]);
  expect(BlocksMap.getAutoCompletePath(BasicType.TEXT, BasicType.PAGE)).toEqual([BasicType.COLUMN, BasicType.SECTION]);
});

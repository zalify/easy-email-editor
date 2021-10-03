import { BlocksMap } from '@/components/core/blocks';
import { omit } from 'lodash';
import { isValidBlockData } from '../isValidBlockData';

describe('Test "isValidBlockData"', () => {
  const blocks = BlocksMap.getBlocks();

  it.each(blocks)('$name is valid block', (block) => {
    expect(block).toHaveProperty('name');
    expect(isValidBlockData(block.create())).toBeTruthy();
  });

  it('should return false when block has no `data` property', () => {
    const fakerBlock = omit({ ...blocks[0].create() }, 'data');
    expect(isValidBlockData(fakerBlock)).toBeFalsy();
  });

  it('should return false when block has no `attributes` property', () => {
    const fakerBlock = omit({ ...blocks[0].create() }, 'attributes');
    expect(isValidBlockData(fakerBlock)).toBeFalsy();
  });

  it('should return false when block has no `type` property', () => {
    const fakerBlock = omit({ ...blocks[0].create() }, 'type');
    expect(isValidBlockData(fakerBlock)).toBeFalsy();
  });

  it('should return false when block has no `children` property', () => {
    const fakerBlock = omit({ ...blocks[0].create() }, 'children');
    expect(isValidBlockData(fakerBlock)).toBeFalsy();
  });
});

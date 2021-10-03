import React, { isValidElement } from 'react';
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

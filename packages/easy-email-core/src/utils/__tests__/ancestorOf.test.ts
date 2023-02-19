import { BlockManager } from './../BlockManager';

import { BasicType } from '@core/constants';
import { ancestorOf } from '../ancestorOf';

const allBlocks = BlockManager.getBlocks();

const ContentBlocks = [
  BasicType.TEXT,
  BasicType.IMAGE,
  BasicType.SPACER,
  BasicType.DIVIDER,

  BasicType.BUTTON,
  BasicType.ACCORDION,
  BasicType.CAROUSEL,
  BasicType.NAVBAR,
  BasicType.SOCIAL,
];

describe('Test content block', () => {
  it.each(ContentBlocks)(
    'drop content block to "column" should return 1',
    (block) => {
      expect(ancestorOf(block, BasicType.COLUMN)).toBe(1);
    }
  );

  it.each(ContentBlocks)(
    'drop content block to "section" should return 2',
    (block) => {
      expect(ancestorOf(block, BasicType.SECTION)).toBe(2);
    }
  );

  it.each(ContentBlocks)(
    'drop content block to "wrapper" should return 3',
    (block) => {
      expect(ancestorOf(block, BasicType.WRAPPER)).toBe(3);
    }
  );

  it.each(ContentBlocks)(
    'drop content block to "Page" should return 3',
    (block) => {
      expect(ancestorOf(block, BasicType.PAGE)).toBe(3);
    }
  );

  it.each(ContentBlocks)(
    'drop content block to content block should return -1',
    (block) => {
      ContentBlocks.forEach((item) => {
        expect(ancestorOf(block, item)).toBe(-1);
      });
    }
  );
});

describe('Test "column" block', () => {
  it('drop a "column" to "section" should return 1', () => {
    expect(ancestorOf(BasicType.COLUMN, BasicType.SECTION)).toBe(1);
  });

  it('drop a "column" to Group should return 1', () => {
    expect(ancestorOf(BasicType.COLUMN, BasicType.GROUP)).toBe(1);
  });

  it('drop a "column" to "wrapper" should return 2', () => {
    expect(ancestorOf(BasicType.COLUMN, BasicType.WRAPPER)).toBe(2);
  });

  it('drop a "column" to "Page" should return 2', () => {
    expect(ancestorOf(BasicType.COLUMN, BasicType.PAGE)).toBe(2);
  });
});

describe('Test "group" block', () => {
  it('drop a "group" to "section" should return 1', () => {
    expect(ancestorOf(BasicType.GROUP, BasicType.SECTION)).toBe(1);
  });

  it('drop a "group" to "wrapper" should return 2', () => {
    expect(ancestorOf(BasicType.GROUP, BasicType.WRAPPER)).toBe(2);
  });

  it('drop a "group" to "Page" should return 2', () => {
    expect(ancestorOf(BasicType.GROUP, BasicType.PAGE)).toBe(2);
  });
});

describe('Test "section" block', () => {
  it('drop a "section" to "wrapper" should return 1', () => {
    expect(ancestorOf(BasicType.SECTION, BasicType.WRAPPER)).toBe(1);
  });

  it('drop a "section" to "Page" should return 1', () => {
    expect(ancestorOf(BasicType.SECTION, BasicType.PAGE)).toBe(1);
  });
});

describe('Test "wrapper" block', () => {
  it('drop a "section" to "Page" should return 1', () => {
    expect(ancestorOf(BasicType.WRAPPER, BasicType.PAGE)).toBe(1);
  });
});

describe('Test all block', () => {
  it.each(allBlocks)('drop a block to same block should return -1', (block) => {
    expect(ancestorOf(block.type, block.type)).toBe(-1);
  });
});

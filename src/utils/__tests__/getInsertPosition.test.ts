import { BlocksMap } from './../../components/core/blocks/index';
import { BasicType } from '@/constants';
import { getInsertPosition } from '../getInsertPosition';
const blocks = BlocksMap.basicBlocksMap;

const page = blocks.Page.createInstance({
  children: [
    blocks.Section.createInstance({
      children: [
        blocks.Column.createInstance({
          children: [blocks.Text.createInstance()],
        }),
        blocks.Column.createInstance({
          children: [blocks.Image.createInstance()],
        }),
      ],
    }),
    blocks.Section.createInstance({
      children: [
        blocks.Column.createInstance({
          children: [blocks.Text.createInstance()],
        }),
        blocks.Column.createInstance({
          children: [blocks.Image.createInstance()],
        }),
      ],
    }),
    blocks.Section.createInstance({
      children: [
        blocks.Column.createInstance({
          children: [blocks.Text.createInstance()],
        }),
        blocks.Column.createInstance({
          children: [blocks.Image.createInstance()],
        }),
      ],
    }),
    blocks.Section.createInstance({
      children: [],
    }),
  ],
});

describe('Drag `Text` to `Image`', () => {
  it('should as expect when vertical direction is  top', () => {
    const directionPosition = {
      horizontal: {
        direction: '',
        isEdge: false,
      },
      vertical: {
        direction: 'top',
        isEdge: true,
      },
    };
    const idx = 'content.children.[0].children.[1].children.[0]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.COLUMN,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 0,
      parentIdx: 'content.children.[0].children.[1]',
      endDirection: 'top',
      hoverIdx: 'content.children.[0].children.[1].children.[0]',
    });
  });

  it('should as expect when direction is bottom', () => {
    const directionPosition = {
      horizontal: {
        direction: 'left',
        isEdge: false,
      },
      vertical: {
        direction: 'bottom',
        isEdge: true,
      },
    };
    const idx = 'content.children.[0].children.[1].children.[0]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.COLUMN,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 1,
      parentIdx: 'content.children.[0].children.[1]',
      endDirection: 'bottom',
      hoverIdx: 'content.children.[0].children.[1].children.[0]',
    });
  });
});

describe('Drag `Column` to `Image`', () => {
  it('should as expect when vertical direction is  left', () => {
    const directionPosition = {
      horizontal: {
        direction: 'left',
        isEdge: false,
      },
      vertical: {
        direction: 'top',
        isEdge: false,
      },
    };
    const idx = 'content.children.[0].children.[1].children.[0]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.SECTION,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 1,
      parentIdx: 'content.children.[0]',
      endDirection: 'left',
      hoverIdx: 'content.children.[0].children.[1]',
    });
  });

  it('should as expect when direction is bottom', () => {
    const directionPosition = {
      horizontal: {
        direction: 'right',
        isEdge: false,
      },
      vertical: {
        direction: 'bottom',
        isEdge: true,
      },
    };
    const idx = 'content.children.[0].children.[1].children.[0]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.SECTION,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 2,
      parentIdx: 'content.children.[0]',
      endDirection: 'right',
      hoverIdx: 'content.children.[0].children.[1]',
    });
  });
});

describe('Drag `Section` to 2nd `Section-Image`', () => {
  it('should as expect when vertical direction is  top', () => {
    const directionPosition = {
      horizontal: {
        direction: 'left',
        isEdge: false,
      },
      vertical: {
        direction: 'top',
        isEdge: false,
      },
    };
    const idx = 'content.children.[1].children.[1].children.[0]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.PAGE,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 1,
      parentIdx: 'content',
      endDirection: 'top',
      hoverIdx: 'content.children.[1]',
    });
  });

  it('should as expect when direction is bottom', () => {
    const directionPosition = {
      horizontal: {
        direction: 'right',
        isEdge: false,
      },
      vertical: {
        direction: 'bottom',
        isEdge: true,
      },
    };
    const idx = 'content.children.[1].children.[1].children.[0]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.PAGE,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 2,
      parentIdx: 'content',
      endDirection: 'bottom',
      hoverIdx: 'content.children.[1]',
    });
  });
});

describe('Drag `Text` to 4th `Section`', () => {
  it('should as expect', () => {
    const directionPosition = {
      horizontal: {
        direction: 'left',
        isEdge: false,
      },
      vertical: {
        direction: 'top',
        isEdge: false,
      },
    };
    const idx = 'content.children.[3]';
    const data = getInsertPosition({
      context: { content: page },
      idx,
      directionPosition: directionPosition,
      dragType: BasicType.SECTION,
      isShadowDom: true,
    });

    expect(data).toEqual({
      insertIndex: 0,
      parentIdx: 'content.children.[3]',
      endDirection: '',
      hoverIdx: 'content.children.[3]',
    });
  });
});

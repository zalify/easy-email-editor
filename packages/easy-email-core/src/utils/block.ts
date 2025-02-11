import { BlockType } from './../constants';
import { IBlock, IBlockData } from '@core/typings';
import { get, isString } from 'lodash';
import { ancestorOf } from './ancestorOf';
import { BlockManager } from './BlockManager';

export function getPageIdx() {
  return 'content';
}

export function getChildIdx(idx: string, index: number) {
  return `${idx}.children.[${index}]`;
}

export function getNodeIdxClassName(idx: string) {
  return `node-idx-${idx}`;
}

export function getNodeTypeClassName(type: string) {
  return `node-type-${type}`;
}

export function getNodeIdxFromClassName(classList: DOMTokenList) {
  return Array.from(classList)
    .find((item) => item.includes('node-idx-'))
    ?.replace('node-idx-', '');
}

export function getNodeTypeFromClassName(
  classList: DOMTokenList | string
): BlockType | null {
  return Array.from(isString(classList) ? classList.split(' ') : classList)
    .find((item) => item.includes('node-type-'))
    ?.replace('node-type-', '') as BlockType;
}

export const getIndexByIdx = (idx: string) => {
  return Number(/\.\[(\d+)\]$/.exec(idx)?.[1]) || 0;
};

export const getParentIdx = (idx: string) => {
  if (idx === getPageIdx()) return undefined;
  return /(.*)\.children\.\[\d+\]$/.exec(idx)?.[1];
};

export const getValueByIdx = <T extends IBlockData>(
  values: { content: IBlockData },
  idx: string
): T | null => {
  return get(values, idx);
};

export const getParentByIdx = <T extends IBlockData = IBlockData>(
  values: { content: IBlockData },
  idx: string
): T | null => {
  return get(values, getParentIdx(idx) || '');
};

export const getSiblingIdx = (sourceIndex: string, num: number) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => {
    if (Number(index) + num < 0) return '[0]';
    return `[${Number(index) + num}]`;
  });
};

export const getParentByType = <T extends IBlockData>(
  context: { content: IBlockData },
  idx: string,
  type: BlockType
): T | null => {
  if (!idx) return null;
  let parentIdx = getParentIdx(idx);
  while (parentIdx) {
    const parent = get(context, parentIdx) as T;
    if (parent && parent.type === type) return parent;
    parentIdx = getParentIdx(idx);
  }

  return null;
};

export const getSameParent = (
  values: { content: IBlockData },
  idx: string,
  dragType: string
): {
  parent: IBlockData;
  parentIdx: string;
} | null => {
  let parentIdx: string | undefined | null = idx;
  const block = BlockManager.getBlockByType(dragType);
  if (!block) return null;

  while (parentIdx) {
    const parent = get(values, parentIdx) as IBlockData;

    if (ancestorOf(block.type, parent.type) > 0) {
      return {
        parent,
        parentIdx,
      };
    }
    parentIdx = getParentIdx(parentIdx);
  }
  return null;
};

// 找到插入的位置，例如 一个 2 column section，第二个 column/image，image占满column, 拖拽 一个column到 image的边缘，我们认为他是要插入一个column，获取这个插入的位置，我们这里是 第二个，所以 是 1
export const getParenRelativeByType = <T extends IBlockData>(
  context: { content: IBlockData },
  idx: string,
  type: BlockType
): { parentIdx: string; insertIndex: number; parent: IBlockData } | null => {
  let prevIdx = '';
  let parentIdx: string | undefined = idx;
  while (parentIdx) {
    const parent = get(context, parentIdx) as T;
    if (parent && parent.type === type) {
      return {
        insertIndex: prevIdx
          ? getIndexByIdx(prevIdx)
          : parent.children.length - 1,
        parentIdx,
        parent,
      };
    } else {
      prevIdx = parentIdx;
      parentIdx = getParentIdx(parentIdx);
    }
  }
  return null;
};

export const getValidChildBlocks = (type: BlockType): IBlock[] => {
  return BlockManager.getBlocks().filter((item) =>
    item.validParentType.includes(type)
  );
};

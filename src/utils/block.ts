import { IPage } from '@/components/core/blocks/basic/Page';
import { IBlock, IBlockData } from '@/typings';
import { get } from 'lodash';
import { BlocksMap } from '../components/core/blocks';
import { BlockType } from '../constants';

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
  return Array.from(classList).find(item => item.includes('node-idx-'))?.replace('node-idx-', '');
}

export function getNodeTypeFromClassName(classList: DOMTokenList) {
  return Array.from(classList).find(item => item.includes('node-type-'))?.replace('node-type-', '');
}

export function findBlockByType(type: BlockType): IBlock {
  return BlocksMap.findBlockByType(type);
}

export const getIndexByIdx = (idx: string) => {
  return Number(idx?.match(/\.\[(\d+)\]$/)?.[1]) || 0;
};

export const getParentIdx = (idx: string) => {
  return idx.match(/(.*)\.children\.\[\d+\]$/)?.[1];
};

export const getValueByIdx = <T extends any>(
  values: { content: IPage; },
  idx: string
): IBlockData<T> | null => {
  return get(values, idx);
};

export const getParentByIdx = <T extends any>(
  values: { content: IPage; },
  idx: string
): IBlockData<T> | null => {
  return get(values, getParentIdx(idx) || '');
};

export const getSiblingIdx = (sourceIndex: string, num: number) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => {
    if (Number(index) + num < 0) return '[0]';
    return `[${Number(index) + num}]`;
  });
};

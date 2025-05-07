import { getContentEditableIdx, getContentEditableType } from './contenteditable';

export function getContentEditableClassName(blockType: string, idx: string) {
  return [getContentEditableType(blockType), getContentEditableIdx(idx)];
}
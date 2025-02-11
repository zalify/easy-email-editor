import { isString } from 'lodash';

export function getContentEditableType(type: string) {
  return `node-contenteditable-type-${type}`;
}

export function getContentEditableTypeFromClassName(
  classList: DOMTokenList | string
) {
  const arr = Array.from(isString(classList) ? classList.split(' ') : classList);
  return arr.find((item) => item.includes('node-contenteditable-type-'))
    ?.replace('node-contenteditable-type-', '') || '';
}

export function getContentEditableIdx(idx: string) {
  return `node-contenteditable-idx-${idx}`;
}

export function getContentEditableIdxFromClassName(
  classList: DOMTokenList | string
) {
  const arr = Array.from(isString(classList) ? classList.split(' ') : classList);
  return arr.find((item) => item.includes('node-contenteditable-idx-'))
    ?.replace('node-contenteditable-idx-', '') || '';
}

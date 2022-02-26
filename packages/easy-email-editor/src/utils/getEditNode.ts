import { getNodeTypeFromClassName } from 'easy-email-core';
import { isTextBlock } from './isTextBlock';

export function getEditNode(node: Element | null): null | HTMLElement {
  if (!node) return null;
  if (!node.classList) return null;
  const blockType = getNodeTypeFromClassName(node.classList);
  if (isTextBlock(blockType)) {
    return (
      node.querySelector('[contenteditable="true"]') ||
      node.querySelector('div')
    );
  }
  if (node.classList.contains('node-type-button')) {
    return node.querySelector('a') || node.querySelector('p');
  }
  return null;
}

export function getEditContent(node: HTMLElement) {
  const blockType = getNodeTypeFromClassName(node.classList);
  if (isTextBlock(blockType)) {
    return getEditNode(node)?.innerHTML || '';
  }
  if (node.classList.contains('node-type-button')) {
    return getEditNode(node)?.innerText || '';
  }
  return '';
}

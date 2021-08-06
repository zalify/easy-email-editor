import { BlocksMap } from './../components/core/blocks/index';
import { findBlockNode } from './findBlockNode';
import { deviation, Direction } from './getTangentDirection';
import { BlockType } from '@/constants';
import { getNodeTypeFromClassName } from './block';
import { ancestorOf } from './ancestorOf';

/**
 * Can it be connected by completion, like text => section
 * @param type
 * @param node
 * @param direction
 * @param autoComplete
 * @returns
 */
export function findInsertNode(
  type: BlockType,
  node: HTMLElement,
  direction: Direction,
  autoComplete: boolean
): HTMLElement | null {
  const block = BlocksMap.findBlockByType(type);
  if (!block) return null;
  const blockNode = findBlockNode(node);
  if (!blockNode) return null;
  const currentType = getNodeTypeFromClassName(
    blockNode.classList
  ) as BlockType;

  if (autoComplete && ancestorOf(type, currentType) > 0) {
    return node;
  } else if (block.validParentType.includes(currentType)) {
    return node;
  }

  if (node.parentElement) {
    const parentBlockNode = findBlockNode(node.parentElement);
    if (!parentBlockNode) return null;

    const isMatchTop = direction === 'top' && node.offsetTop <= deviation;
    const isMatchBottom =
      direction === 'bottom' &&
      parentBlockNode.clientHeight - node.clientHeight <= deviation;

    const isLeft = direction === 'left' && node.offsetLeft <= deviation;
    const isRight =
      direction === 'right' &&
      parentBlockNode.clientWidth - node.clientWidth <= deviation;

    if (isMatchTop || isMatchBottom || isLeft || isRight) {
      return findInsertNode(type, parentBlockNode, direction, autoComplete);
    }
  }

  return null;
}

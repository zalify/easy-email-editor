import { BlocksMap } from './../components/core/blocks/index';
import { findBlockNode } from './findBlockNode';
import { deviation, Direction } from './getTangentDirection';
import { BlockType } from '@/constants';
import { getNodeTypeFromClassName } from './block';
import { ancestorOf } from './ancestorOf';

/**
 * Can it be connected by completion, like text => section
 * @param dragType
 * @param node
 * @param direction
 * @param autoComplete
 * @returns
 */
export function findInsertNode(
  dragType: BlockType,
  node: HTMLElement,
  direction: Direction,
  autoComplete: boolean
): HTMLElement | null {
  const block = BlocksMap.findBlockByType(dragType);
  if (!block) return null;
  const targetNode = findBlockNode(node);
  if (!targetNode) return null;
  const targetType = getNodeTypeFromClassName(
    targetNode.classList
  ) as BlockType;

  if (autoComplete && ancestorOf(dragType, targetType) > 0) {
    return node;
  }
  if (!direction) return null;
  return getMatchBlock(dragType, node);
}

function getMatchBlock(dragType: BlockType, node: HTMLElement): HTMLElement | null {
  const draggingBlock = BlocksMap.findBlockByType(dragType);
  let targetNode = findBlockNode(node);

  while (targetNode) {

    if (!(targetNode instanceof HTMLElement)) return null;

    const targetType = getNodeTypeFromClassName(
      targetNode.classList
    ) as BlockType;

    if (draggingBlock.validParentType.includes(targetType)) {

      return targetNode;
    }
    targetNode = findBlockNode(targetNode.parentElement);

  }
  return targetNode;

}

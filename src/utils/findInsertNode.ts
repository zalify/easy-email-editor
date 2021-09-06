import { BlocksMap } from './../components/core/blocks/index';
import { findBlockNode } from './findBlockNode';
import { DirectionPosition } from './getDirectionPosition';
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
  direction: DirectionPosition,
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
  if (!direction.horizontal.direction || !direction.vertical.direction)
    return null;
  return getMatchBlock(dragType, node);
}

/**
 * 例如
 * <Section>
    <Column>
      <Image />
    </Column>
   </Section>
 *

 * 如果 drag `Column` 到 Image 的边缘， 由于我们可以找到 Image的 ancestor 同样可以作为 Column 的 ancestor， 则可以认为是 要插入到Section，我们需要把该Column 插入到 Image的父级Column 的前面或者后面， Insert Before Column  或者  Insert After Column
 *
 * 要点
 *    1. 边缘， Boolean(direction)
 *    2. Column.validParentType.includes(Image.ancestor.type)
 * @param dragType
 * @param node
 * @returns
 */

function getMatchBlock(
  dragType: BlockType,
  node: HTMLElement
): HTMLElement | null {
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

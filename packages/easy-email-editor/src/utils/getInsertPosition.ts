import { get } from 'lodash';
import {
  getChildIdx,
  getIndexByIdx,
  getParentIdx,
  getSameParent,
  IPage,
  BasicType,
  IBlockData,
} from 'easy-email-core';
import { DirectionPosition } from './getDirectionPosition';

interface Params {
  context: { content: IPage };
  idx: string;
  directionPosition: DirectionPosition;
  dragType: string;
}

export function getInsertPosition(params: Params) {
  const { idx, dragType, directionPosition, context } = params;

  const parentData = getSameParent(context, idx, dragType);

  if (!parentData) return null;

  const insertData = getInsetParentAndIndex(
    context,
    idx,
    parentData.parent.type,
    directionPosition
  );

  return insertData;
}

function getInsetParentAndIndex(
  context: { content: IPage },
  idx: string,
  type: string,
  directionPosition: DirectionPosition
): {
  parentIdx: string;
  insertIndex: number;
  endDirection: string;
  hoverIdx: string;
} | null {
  let hoverIdx = idx;
  let prevIdx = '';
  let parentIdx: string | undefined = idx;
  while (parentIdx) {
    const parent = get(context, parentIdx) as IBlockData;
    if (parent && parent.type === type) {
      const { direction, valid, isEdge } = getValidDirection(
        parent.type,
        directionPosition
      );

      if (!valid) return null;
      const isVertical =
        parent.type === BasicType.SECTION || parent.type === BasicType.GROUP;

      let insertIndex = 0; // 默认为0，表示拖拽到一个空children的节点
      let endDirection = direction;

      // 有 prevIdx 代表插入的位置不是同一层级的，比如 Column to  Image，prevId 指的是 Image 的父级 Column 的idx, 插入的位置就是 Column 父级的Section
      if (prevIdx) {
        const siblingIndex = getIndexByIdx(prevIdx);
        hoverIdx = getChildIdx(parentIdx, siblingIndex);

        if (
          parent.children.length > 0 &&
          /(right)|(bottom)/.test(endDirection)
        ) {
          insertIndex = siblingIndex + 1;
        } else {
          insertIndex = siblingIndex;
        }
      } else {
        // Section/Group block 只能插入column，只有左右方向
        if (parent.children.length === 0) {
          endDirection = ''; // 认为是直接插入就行了
        }

        if (isVertical) {
          if (direction === 'left') {
            insertIndex = 0;
            // 如果有children，则让children高亮
            if (parent.children.length > 0) {
              hoverIdx = getChildIdx(parentIdx, 0);
              endDirection = 'left';
            }
          } else {
            insertIndex = parent.children.length;
            if (parent.children.length > 0) {
              hoverIdx = getChildIdx(parentIdx, insertIndex - 1);
              endDirection = 'right';
            }
          }
        } else {
          if (direction === 'top') {
            insertIndex = 0;
            if (parent.children.length > 0) {
              hoverIdx = getChildIdx(parentIdx, 0);
              endDirection = 'top';
            }
          } else {
            insertIndex = parent.children.length;
            if (parent.children.length > 0) {
              hoverIdx = getChildIdx(parentIdx, insertIndex - 1);
              endDirection = 'bottom';
            }
          }
        }
      }

      return {
        insertIndex,
        parentIdx,
        endDirection,
        hoverIdx,
      };
    } else {
      prevIdx = parentIdx;
      parentIdx = getParentIdx(parentIdx);
    }
  }
  return null;
}

function getValidDirection(
  targetType: string,
  directionPosition: DirectionPosition
): { valid: boolean; direction: string; isEdge: boolean } {
  const isVertical =
    targetType === BasicType.SECTION || targetType === BasicType.GROUP;

  let direction = directionPosition.vertical.direction;
  let isEdge = directionPosition.vertical.isEdge;

  if (isVertical) {
    direction = directionPosition.horizontal.direction;
    isEdge = directionPosition.horizontal.isEdge;
  }

  return {
    valid: isVertical
      ? Boolean(directionPosition.horizontal.direction)
      : Boolean(directionPosition.vertical.direction),
    direction,
    isEdge,
  };
}

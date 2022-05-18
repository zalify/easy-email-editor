import { get } from 'lodash';
import {
  getChildIdx,
  getIndexByIdx,
  getParentIdx,
  getSameParent,
  IPage,
  IBlockData,
  getParentByIdx,
  BasicType,
  AdvancedType,
} from 'easy-email-core';
import { DirectionPosition } from './getDirectionPosition';

interface Params {
  context: { content: IPage };
  idx: string;
  directionPosition: DirectionPosition;
  dragType: string;
}

const verticalBlocks: string[] = [
  BasicType.SECTION,
  BasicType.GROUP,
  AdvancedType.SECTION,
  AdvancedType.GROUP,
];

const isColumnBlock = (type: string) =>
  ([BasicType.COLUMN, AdvancedType.COLUMN] as string[]).includes(type);

export function getInsertPosition(params: Params) {
  const { idx, dragType, directionPosition, context } = params;

  let parentData = getSameParent(context, idx, dragType);

  if (!parentData) return null;

  // 切边则认为是选择 parent， 这样的话，即使 child 和 parent 一样 size 也可以选到 parent
  const directlyParent = getParentByIdx(context, idx);

  if (directlyParent) {
    if (directionPosition.vertical.isEdge) {
      const isTop =
        directionPosition.vertical.direction === 'top' &&
        getIndexByIdx(idx) === 0;
      const isBottom =
        directionPosition.vertical.direction === 'bottom' &&
        getIndexByIdx(idx) === directlyParent.children.length - 1;
      // 只有第一个和最后一个才能插入
      if (isTop || isBottom) {
        const prevParent = getParentByIdx(context, parentData.parentIdx);
        if (prevParent) {
          parentData = {
            parent: prevParent,
            parentIdx: getParentIdx(parentData.parentIdx)!,
          };
          //  如果是 column 的话，选择到 section，这样做有个好处，例如 button 就可以直接 插入 section 后面
          if (isColumnBlock(parentData.parent.type)) {
            const sectionBlock = getParentByIdx(context, parentData.parentIdx);
            if (sectionBlock) {
              parentData = {
                parent: sectionBlock,
                parentIdx: getParentIdx(parentData.parentIdx)!,
              };
            }
          }
        }
      }
    } else if (directionPosition.horizontal.isEdge) {
      // 如果是 column 的话，选择到 section，这样做有个好处，可以插入一个 column
      if (isColumnBlock(parentData.parent.type)) {
        const prevParent = getParentByIdx(context, parentData.parentIdx);
        if (prevParent) {
          const isLeft = directionPosition.horizontal.direction === 'left';
          console.log('idx', parentData.parentIdx);
          return {
            parentIdx: getParentIdx(parentData.parentIdx)!,
            insertIndex: isLeft
              ? getIndexByIdx(parentData.parentIdx)
              : getIndexByIdx(parentData.parentIdx) + 1,
            endDirection: directionPosition.horizontal.direction,
            hoverIdx: parentData.parentIdx,
          };
        }
      }
    }
  }

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

      const isVertical = verticalBlocks.includes(parent.type);
      if (isVertical && parent.children.length > 0) {
        const isTop = directionPosition.vertical.direction === 'top';
        return {
          insertIndex: isTop
            ? getIndexByIdx(parentIdx)
            : getIndexByIdx(parentIdx) + 1,
          parentIdx: getParentIdx(parentIdx)!,
          endDirection: directionPosition.vertical.direction,
          hoverIdx: parentIdx,
        };
      }

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
  const isVertical = verticalBlocks.includes(targetType);

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

import React, { useCallback } from 'react';
import { BlockType } from '@/constants';
import { IBlockData, RecursivePartial } from '@/typings';
import { ReactSortable } from 'react-sortablejs';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { getChildIdx, getNodeIdxFromClassName, getNodeTypeFromClassName } from '@/utils/block';
import { BlocksMap } from '../../blocks';
import { useBlock } from '@/hooks/useBlock';
import { findBlockNode } from '@/utils/findBlockNode';

type BlockSortableWrapperProps = {
  list: IBlockData[];
  action: 'add' | 'move',
  type: BlockType;
  payload?: RecursivePartial<IBlockData>;
  tag?: string;
  disabled?: boolean;
  idx?: string;
  onStart?: () => void;
  onEnd?: () => void;
  id?: string;
  className?: string;
  style?: any;
};
export const BlockSortableWrapper: React.FC<BlockSortableWrapperProps> = (props) => {
  const { children, list, disabled, idx, onStart, onEnd, tag, action, type, payload, ...restProps } = props;
  const { setIsDragging, setHoverIdx, setDirection } = useHoverIdx();
  const { addBlock, moveBlock } = useBlock();

  const onDragEnd = useCallback((evt: { originalEvent: { dataTransfer: DataTransfer; }; from: HTMLElement; to: HTMLElement; newIndex: number; oldIndex: number; }, sortable: any, store: any) => {

    setIsDragging(false);
    setHoverIdx('');
    onEnd?.();

    const targetBlockNode = findBlockNode(evt.to);
    if (!targetBlockNode) return;
    const idx = getNodeIdxFromClassName(targetBlockNode.classList)!;

    if (action === 'add') {

      if (targetBlockNode) {

        addBlock({
          type,
          parentIdx: idx,
          positionIndex: evt.newIndex,
          payload
        });
      }
    } else {
      const sourceParentBlockNode = findBlockNode(evt.from);
      if (!sourceParentBlockNode) return;
      const sourceIdx = getChildIdx(getNodeIdxFromClassName(sourceParentBlockNode.classList)!, evt.oldIndex);
      const targetIdx = getChildIdx(idx, evt.newIndex);

      moveBlock({
        sourceIdx: sourceIdx,
        destinationIdx: targetIdx,
      });

    }

  }, [action, addBlock, moveBlock, onEnd, payload, setHoverIdx, setIsDragging, type]);

  const onDragStart = useCallback((evt: { originalEvent: { dataTransfer: DataTransfer; }; }) => {
    setIsDragging(true);
    onStart?.();
  }, [onStart, setIsDragging]);

  const onSpill = useCallback((evt: { originalEvent: { dataTransfer: DataTransfer; }; }) => {

  }, []);

  const onChoose = useCallback(() => {

  }, []);

  const onCheckValidate = useCallback(
    (evt: { dragged: HTMLElement; related: HTMLElement; willInsertAfter: boolean; }, sortable: any, store: any) => {

      if (!evt.dragged) return false;

      const type =
        getNodeTypeFromClassName(evt.dragged.classList) ||
        (evt.dragged.getAttribute('data-type') as BlockType);

      const dragoverType = evt.related.getAttribute(
        'data-parent-type'
      ) as BlockType;
      if (!type || !dragoverType) return false;

      const block = BlocksMap.findBlockByType(type);
      const isValid = block.validParentType.includes(dragoverType);
      const targetIdx = getNodeIdxFromClassName(evt.related.classList)!;
      if (isValid) {
        setHoverIdx(targetIdx);
        setDirection(evt.willInsertAfter ? 'bottom' : 'top');
      } else {
        setHoverIdx('');
        setDirection('');
      }

      return isValid;
    },
    [setHoverIdx, setDirection]
  );

  return (
    <ReactSortable
      {...restProps}
      tag={tag as any}
      revertOnSpill
      disabled={disabled}
      list={list as any}
      setList={() => { }}
      onMove={onCheckValidate}
      onEnd={onDragEnd}
      onSpill={onSpill}
      onChoose={onChoose}
      onStart={onDragStart}
      {...{
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        ghostClass: 'ghost',
        group: 'shared',
      }}
    >
      {children}
    </ReactSortable>
  );
};

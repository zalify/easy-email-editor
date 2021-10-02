import React, { useCallback, useEffect, useRef } from 'react';
import { BlockType } from '@/constants';
import { IBlockData, RecursivePartial } from '@/typings';
import { ReactSortable } from 'react-sortablejs';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import {
  getChildIdx,
  getIndexByIdx,
  getNodeIdxFromClassName,
  getParentIdx,
} from '@/utils/block';
import { BlocksMap } from '../../blocks';
import { useBlock } from '@/hooks/useBlock';
import { findBlockNode } from '@/utils/findBlockNode';
import { useDataTransfer } from '@/hooks/useDataTransfer';
import { isUndefined } from 'lodash';

type BlockSortableWrapperProps = {
  action: 'add' | 'move';
  type: BlockType;
  payload: RecursivePartial<IBlockData>;
  tag?: string;
  disabled?: boolean;
  idx?: string;
  onStart?: () => void;
  onEnd?: () => void;
  id?: string;
  className?: string;
  style?: any;
};
export const BlockSortableWrapper: React.FC<BlockSortableWrapperProps> = (
  props
) => {
  const {
    children,
    disabled,
    idx,
    onStart,
    onEnd,
    tag,
    action,
    type,
    payload,
    ...restProps
  } = props;
  const { setIsDragging, setHoverIdx, setDirection } = useHoverIdx();
  const { addBlock, moveBlock } = useBlock();
  const { setDataTransfer, dataTransfer } = useDataTransfer();
  const cacheDataTransfer = useRef(dataTransfer);

  useEffect(() => {
    cacheDataTransfer.current = dataTransfer;
  }, [dataTransfer]);

  const onDragEnd = useCallback(
    (
      evt: {
        originalEvent: { dataTransfer: DataTransfer; };
        from: HTMLElement;
        to: HTMLElement;
        newIndex: number;
        oldIndex: number;
      },
      sortable: any,
      store: any
    ) => {
      setIsDragging(false);
      setHoverIdx('');
      onEnd?.();

      const transferData = cacheDataTransfer.current;
      if (!transferData) return;
      if (action === 'add' && !isUndefined(transferData.parentIdx)) {
        addBlock({
          type,
          parentIdx: transferData.parentIdx,
          positionIndex: transferData.positionIndex,
          payload,
        });
      } else {
        if (
          idx &&
          !isUndefined(transferData.sourceIdx) &&
          !isUndefined(transferData.parentIdx) &&
          !isUndefined(transferData.positionIndex)
        ) {
          moveBlock({
            sourceIdx: transferData.sourceIdx,
            destinationIdx: getChildIdx(
              transferData.parentIdx,
              transferData.positionIndex
            ),
          });
        }
      }
    },
    [
      action,
      addBlock,
      idx,
      moveBlock,
      onEnd,
      payload,
      setHoverIdx,
      setIsDragging,
      type,
    ]
  );

  const onDragStart = useCallback(
    (evt: { originalEvent: DragEvent; }) => {
      if (action === 'add') {
        setDataTransfer({
          type: type,
          action,
          payload,
        });
      } else {
        setDataTransfer({
          type: type,
          action,
          sourceIdx: idx,
        });
      }

      setIsDragging(true);
      onStart?.();
    },
    [action, idx, onStart, payload, setDataTransfer, setIsDragging, type]
  );

  const onSpill = useCallback(
    (evt: { originalEvent: { dataTransfer: DataTransfer; }; }) => { },
    []
  );

  const onChoose = useCallback(() => { }, []);

  const onMove = useCallback(
    (
      evt: {
        dragged: HTMLElement;
        related: HTMLElement;
        willInsertAfter: boolean;
      },
      sortable: any,
      store: any
    ) => {

      const dragoverType = evt.related.getAttribute(
        'data-parent-type'
      ) as BlockType;
      if (!type || !dragoverType) return false;

      const block = BlocksMap.findBlockByType(type);
      const isValid = block.validParentType.includes(dragoverType);
      const targetIdx = evt.related.getAttribute('data-idx')!;

      if (isValid) {
        setHoverIdx(targetIdx);
        setDirection(evt.willInsertAfter ? 'bottom' : 'top');
        setDataTransfer((dataTransfer: any) => {
          return {
            ...dataTransfer,
            parentIdx: getParentIdx(targetIdx),
            positionIndex:
              getIndexByIdx(targetIdx) + (evt.willInsertAfter ? 1 : 0),
          };
        });
      } else {
        setHoverIdx('');
        setDirection('');
      }
      return isValid;
    },
    [type, setHoverIdx, setDirection, setDataTransfer]
  );

  return (
    <ReactSortable
      {...restProps}
      tag={tag as any}
      revertOnSpill
      disabled={disabled}
      list={[{}] as any}
      setList={() => { }}
      onMove={onMove}
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

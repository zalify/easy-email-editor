import React, { useCallback, useEffect, useRef } from 'react';
import { BlockType } from '@/constants';
import { IBlockData, RecursivePartial } from '@/typings';
import { ReactSortable } from 'react-sortablejs';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { getChildIdx, getIndexByIdx, getParentIdx } from '@/utils/block';
import { BlocksMap } from '../../blocks';
import { useBlock } from '@/hooks/useBlock';
import { useDataTransfer } from '@/hooks/useDataTransfer';
import { get, isUndefined } from 'lodash';
import { DATA_ATTRIBUTE_ID } from '@/components/EmailEditor/components/ConfigurationPanel/components/BlockLayerManager/components/BlockTree/components/BlockTreeItem';

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
  const { addBlock, moveBlock, values } = useBlock();
  const { setDataTransfer, dataTransfer } = useDataTransfer();
  const cacheDataTransfer = useRef(dataTransfer);

  useEffect(() => {
    cacheDataTransfer.current = dataTransfer;
  }, [dataTransfer]);

  const onDragEnd = useCallback(() => {
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
        moveBlock(
          transferData.sourceIdx,
          getChildIdx(transferData.parentIdx, transferData.positionIndex)
        );
      }
    }
  }, [
    action,
    addBlock,
    idx,
    moveBlock,
    onEnd,
    payload,
    setHoverIdx,
    setIsDragging,
    type,
  ]);

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
    (evt: { originalEvent: { dataTransfer: DataTransfer; }; }) => {
      // cacheDataTransfer.current = null;
    },
    []
  );

  const onChoose = useCallback(() => { }, []);

  const allowDrop = useCallback(
    (evt: {
      dragged: HTMLElement;
      related: HTMLElement;
      willInsertAfter: boolean;
    }) => {
      const dragBlock = BlocksMap.findBlockByType(type);

      if (!type) return false;
      const dropIdx = evt.related.getAttribute(DATA_ATTRIBUTE_ID);
      if (!dropIdx) return false;

      const dropBlockData = get(values, dropIdx);

      if (
        dragBlock.validParentType.includes(dropBlockData.type) &&
        evt.willInsertAfter
      ) {
        return true;
      }

      const parentIdx = getParentIdx(dropIdx);
      if (parentIdx) {
        const dropParentBlock = get(values, parentIdx);
        if (
          dropParentBlock &&
          dragBlock.validParentType.includes(dropParentBlock.type)
        ) {
          return true;
        }
      }

      return false;
    },
    [type, values]
  );

  const onMove = useCallback(
    (evt: {
      dragged: HTMLElement;
      related: HTMLElement;
      willInsertAfter: boolean;
    }) => {
      const dropIdx = evt.related.getAttribute(DATA_ATTRIBUTE_ID);
      if (dropIdx && allowDrop(evt)) {
        setHoverIdx(dropIdx);
        setDirection(evt.willInsertAfter ? 'bottom' : 'top');
        setDataTransfer((dataTransfer: any) => {
          return {
            ...dataTransfer,
            parentIdx: getParentIdx(dropIdx),
            positionIndex:
              getIndexByIdx(dropIdx) + (evt.willInsertAfter ? 1 : 0),
          };
        });
        return true;
      }

      setHoverIdx('');
      setDirection('');

      return false;
    },
    [allowDrop, setHoverIdx, setDirection, setDataTransfer]
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
        removeCloneOnHide: true,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        ghostClass: 'ghost',
        group: {
          name: 'shared',
          pull: 'clone',
          put: true,
          revertClone: false,
        },
      }}
    >
      {children}
    </ReactSortable>
  );
};

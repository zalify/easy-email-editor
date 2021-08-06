import { BasicType, BLOCK_HOVER_CLASSNAME } from './../constants';
import { useEffect, useMemo, useState, useContext } from 'react';

import {
  getIndexByIdx,
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
  getParentIdx,
} from '@/utils/block';
import { findBlockNode } from '@/utils/findBlockNode';
import { BlockType, DRAG_HOVER_CLASSNAME } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getTangentDirection } from '@/utils/getTangentDirection';
import { get } from 'lodash';
import {
  findBlockNodeByIdx,
  getBlockNodes,
  getShadowRoot,
} from '@/utils/findBlockNodeByIdx';
import { useFocusIdx } from './useFocusIdx';
import { useDataTransfer } from './useDataTransfer';
import { useHoverIdx } from './useHoverIdx';
import { findInsertNode } from '@/utils/findInsertNode';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export function useDropBlock() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { values, addBlock, moveBlock } = useBlock();
  const { autoComplete } = useContext(EditorPropsContext);

  const isShadowDom = useMemo(
    () => !Boolean(ref && document.contains(ref)),
    [ref]
  );

  const { setFocusIdx } = useFocusIdx();
  const {
    setHoverIdx,
    setIsDragging,
    setDirection,
    isDragging,
    hoverIdx,
    direction,
  } = useHoverIdx();

  const { dataTransfer } = useDataTransfer();

  useEffect(() => {
    if (ref) {
      const onClick = (ev: MouseEvent) => {
        ev.preventDefault();
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setFocusIdx(idx);
          const editBlock = findBlockNodeByIdx(idx);
          if (editBlock === blockNode) {
            const listItemNode = document.querySelector(`[data-idx="${idx}"]`);
            listItemNode?.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          } else {
            editBlock?.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          }
        }
      };

      ref.addEventListener('click', onClick);
      return () => {
        ref.removeEventListener('click', onClick);
      };
    }
  }, [ref, setFocusIdx]);

  useEffect(() => {
    if (!ref) return;

    const onDrop = (ev: DragEvent) => {
      const target = ev.target as HTMLElement;
      const blockNode = findBlockNode(target);
      if (!blockNode) return;

      const type = dataTransfer?.type as BlockType;
      const action = dataTransfer?.action;
      if (!type) return;
      const payload = dataTransfer?.payload || {};

      const parentIdx = getNodeIdxFromClassName(blockNode.classList)!;

      const parent = get(values, parentIdx);

      if (parent) {
        ev.preventDefault();

        const direction = getTangentDirection(ev);
        const blockData: Parameters<typeof addBlock>[0] = {
          payload,
          type,
          parentIdx,
        };

        if (action === 'move') {
          if (direction === 'top' || direction === 'left') {
            blockData.parentIdx = getParentIdx(parentIdx)!;
            blockData.positionIndex = +getIndexByIdx(parentIdx);
          } else if (direction === 'bottom' || direction === 'right') {
            blockData.parentIdx = getParentIdx(parentIdx)!;
            blockData.positionIndex = +getIndexByIdx(parentIdx) + 1;
          }
          moveBlock({
            sourceIdx: blockData.payload,
            destinationIdx: blockData.parentIdx,
            positionIndex: blockData.positionIndex!,
          });
        } else {
          if (direction === 'top' || direction === 'left') {
            blockData.parentIdx = getParentIdx(parentIdx)!;
            blockData.positionIndex = +getIndexByIdx(parentIdx);
          } else if (direction === 'bottom' || direction === 'right') {
            blockData.parentIdx = getParentIdx(parentIdx)!;
            blockData.positionIndex = +getIndexByIdx(parentIdx) + 1;
          }
          addBlock(blockData);
        }
      }
    };

    ref.addEventListener('drop', onDrop);
    return () => {
      ref.removeEventListener('drop', onDrop);
    };
  }, [
    addBlock,
    dataTransfer?.action,
    dataTransfer?.payload,
    dataTransfer?.type,
    moveBlock,
    ref,
    setIsDragging,
    values,
  ]);

  useEffect(() => {
    if (ref) {
      const onMouseover = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);

        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setHoverIdx(idx);
        }
      };

      const onMouseOut = (ev: MouseEvent) => {
        ev.stopPropagation();
        setHoverIdx('');
        setDirection('');
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (!blockNode) {
          setIsDragging(false);
        }
      };
      const onDrop = (ev: MouseEvent) => {
        setIsDragging(false);
      };

      const onDragOver = (ev: DragEvent) => {
        let isValid = false;
        setIsDragging(true);

        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        if (blockNode) {
          const direction = getTangentDirection(ev);
          setDirection(direction);

          const type = dataTransfer?.type!;
          const validBlockNode = isShadowDom
            ? findInsertNode(
                type,
                direction ? blockNode.parentElement! : blockNode,
                direction,
                Boolean(autoComplete)
              )
            : blockNode;

          if (validBlockNode) {
            const targetType = getNodeTypeFromClassName(
              validBlockNode.classList
            );

            // Because only the Section is lined up horizontally, right and left are only useful for section, and top and bottom are only useful for other blocks.

            const isInsert = !direction;
            const isSectionBeforeAfter =
              targetType === BasicType.SECTION &&
              ['left', 'right'].includes(direction);

            const isOtherInsertBeforeAfter =
              targetType !== BasicType.SECTION &&
              ['top', 'bottom'].includes(direction);

            if (
              isInsert ||
              isSectionBeforeAfter ||
              isOtherInsertBeforeAfter ||
              !isShadowDom
            ) {
              isValid = true;
              ev.preventDefault();
              const idx = getNodeIdxFromClassName(blockNode.classList)!;
              setHoverIdx(idx);
            }
          }
        }
        if (!isValid) {
          setDirection('');
          setHoverIdx('');
        }
      };
      const onDragLeave = (ev: DragEvent) => {
        setIsDragging(false);
      };

      ref.addEventListener('mouseover', onMouseover);
      ref.addEventListener('mouseout', onMouseOut);
      document.addEventListener('dragleave', onMouseOut);
      ref.addEventListener('drop', onDrop);
      ref.addEventListener('dragover', onDragOver);
      ref.addEventListener('dragleave', onDragLeave);
      return () => {
        ref.removeEventListener('mouseover', onMouseover);
        ref.removeEventListener('mouseout', onMouseOut);
        document.removeEventListener('dragleave', onMouseOut);
        ref.removeEventListener('drop', onDrop);
        ref.removeEventListener('dragover', onDragOver);
        ref.removeEventListener('dragleave', onDragLeave);
      };
    }
  }, [
    autoComplete,
    dataTransfer?.type,
    isShadowDom,
    ref,
    setDirection,
    setHoverIdx,
    setIsDragging,
  ]);

  useEffect(() => {
    if (ref) {
      ref.setAttribute('data-dragging', String(isDragging));
      ref.setAttribute('data-direction', direction || 'none');
    }
  }, [direction, isDragging, ref]);

  useEffect(() => {
    if (!isDragging) return;

    const blockNode = findBlockNodeByIdx(hoverIdx, !document.contains(ref));

    if (!blockNode) return;

    blockNode.classList.add(DRAG_HOVER_CLASSNAME);

    return () => {
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
    };
  }, [direction, hoverIdx, isDragging, ref]);

  useEffect(() => {
    if (!isDragging) {
      getBlockNodes(isShadowDom).forEach((blockNode) => {
        if (getNodeIdxFromClassName(blockNode.classList) !== hoverIdx) {
          blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
        } else {
          blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
        }
      });
    }
  }, [hoverIdx, isDragging, isShadowDom, ref]);

  return useMemo(
    () => ({
      setRef,
    }),
    [setRef]
  );
}

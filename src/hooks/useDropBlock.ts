import { BLOCK_HOVER_CLASSNAME } from './../constants';
import { useEffect, useMemo, useState, useContext, useRef } from 'react';

import { getNodeIdxFromClassName } from '@/utils/block';
import { findBlockNode } from '@/utils/findBlockNode';
import { DRAG_HOVER_CLASSNAME } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getDirectionPosition } from '@/utils/getDirectionPosition';
import { findBlockNodeByIdx, getBlockNodes } from '@/utils/findBlockNodeByIdx';
import { useFocusIdx } from './useFocusIdx';
import { useDataTransfer } from './useDataTransfer';
import { useHoverIdx } from './useHoverIdx';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { getInsertPosition } from '@/utils/getInsertPosition';

export function useDropBlock() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { values, addBlock, moveBlock } = useBlock();
  const { autoComplete } = useContext(EditorPropsContext);
  const { dataTransfer, setDataTransfer } = useDataTransfer();
  const cacheValues = useRef(values);
  const cacheDataTransfer = useRef(dataTransfer);

  useEffect(() => {
    cacheValues.current = values;
  }, [values]);

  useEffect(() => {
    cacheDataTransfer.current = dataTransfer;
  }, [dataTransfer]);

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
    setDragPosition,
  } = useHoverIdx();

  useEffect(() => {
    if (ref) {
      const onClick = (ev: MouseEvent) => {
        ev.preventDefault(); // prevent link
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
      if (!dataTransfer) return;
      const target = ev.target as HTMLElement;
      const blockNode = findBlockNode(target);
      if (!blockNode) return;

      const type = dataTransfer.type;
      const action = dataTransfer.action;
      if (!type) return;
      const payload = dataTransfer.payload || {};

      if (parent) {
        ev.preventDefault();

        const blockData: Parameters<typeof addBlock>[0] = {
          payload,
          type,
          parentIdx: dataTransfer.parentIdx!,
          positionIndex: dataTransfer.positionIndex,
        };

        if (action === 'move') {
          moveBlock({
            sourceIdx: blockData.payload,
            destinationIdx: blockData.parentIdx,
            positionIndex: blockData.positionIndex!,
          });
        } else {
          addBlock(blockData);
        }
      }
    };

    ref.addEventListener('drop', onDrop);
    return () => {
      ref.removeEventListener('drop', onDrop);
    };
  }, [addBlock, dataTransfer, moveBlock, ref, setIsDragging, values]);

  useEffect(() => {
    if (ref) {
      let lastHoverTarget: EventTarget | null = null;

      let lastDragover: {
        target: EventTarget | null;
        valid: boolean;
      } = {
        target: null,
        valid: false,
      };

      const onMouseover = (ev: MouseEvent) => {
        if (lastHoverTarget === ev.target) return;
        lastHoverTarget = ev.target;
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
        lastDragover.target = null;
        setIsDragging(false);
      };

      const onDragOver = (ev: DragEvent) => {
        if (!cacheDataTransfer.current) return;

        if (ev.target === lastDragover.target) {
          if (lastDragover.valid) {
            ev.preventDefault();
          }
          return;
        }

        lastDragover.target = ev.target;
        lastDragover.valid = false;

        setIsDragging(true);
        setDragPosition({
          left: ev.pageX,
          top: ev.pageY,
        });
        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        if (blockNode) {
          const directionPosition = getDirectionPosition(ev);

          const idx = getNodeIdxFromClassName(blockNode.classList)!;

          const positionData = getInsertPosition({
            context: cacheValues.current,
            idx,
            directionPosition,
            dragType: cacheDataTransfer.current.type,
            isShadowDom,
            actionType: cacheDataTransfer.current.action,
          });
          if (positionData) {
            ev.preventDefault();
            lastDragover.valid = true;
            setDirection(positionData.endDirection);
            setDataTransfer({
              ...cacheDataTransfer.current,
              positionIndex: positionData.insertIndex,
              parentIdx: positionData.parentIdx,
            });

            setHoverIdx(positionData.hoverIdx);
          }
        }
        if (!lastDragover.valid) {
          setDirection('');
          setHoverIdx('');
        }
      };

      ref.addEventListener('mouseover', onMouseover);
      ref.addEventListener('mouseout', onMouseOut);
      document.addEventListener('dragleave', onMouseOut);
      document.addEventListener('dragleave', onMouseOut);
      ref.addEventListener('drop', onDrop);
      ref.addEventListener('dragover', onDragOver);

      return () => {
        ref.removeEventListener('mouseover', onMouseover);
        ref.removeEventListener('mouseout', onMouseOut);
        document.removeEventListener('dragleave', onMouseOut);
        ref.removeEventListener('drop', onDrop);
        ref.removeEventListener('dragover', onDragOver);
      };
    }
  }, [
    autoComplete,
    cacheDataTransfer,
    isShadowDom,
    ref,
    setDataTransfer,
    setDirection,
    setDragPosition,
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

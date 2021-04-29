import { useEffect, useMemo, useState } from 'react';

import {
  findBlockByType,
  getIndexByIdx,
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
  getParentIdx,
} from '@/utils/block';
import { findBlockNode } from '@/utils/findBlockNode';
import {
  BlockType,
  BLOCK_HOVER_CLASSNAME,
  DRAG_HOVER_CLASSNAME,
  DRAG_TANGENT_CLASSNAME,
} from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getTangentDirection } from '@/utils/getTangentDirection';
import { get } from 'lodash';
import { IBlockData } from '@/typings';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { copy } from '@/utils/clipboard';

export function useDropBlock() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { values, setFocusIdx, hoverIdx, addBlock, focusIdx, focusBlock } = useBlock();

  useEffect(() => {
    if (ref) {
      const onClick = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setFocusIdx(idx);
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
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
      if (!blockNode) return;

      const type = ev.dataTransfer?.getData('Text') as BlockType;
      if (!type) return;

      const payload = ev.dataTransfer?.getData('Payload')
        ? JSON.parse(ev.dataTransfer?.getData('Payload'))
        : ({} as IBlockData);

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

        if (direction === 'top' || direction === 'left') {
          blockData.parentIdx = getParentIdx(parentIdx)!;
          blockData.positionIndex = +getIndexByIdx(parentIdx);
        } else if (direction === 'bottom' || direction === 'right') {
          blockData.parentIdx = getParentIdx(parentIdx)!;
          blockData.positionIndex = +getIndexByIdx(parentIdx) + 1;
        }

        addBlock(blockData);
      }
    };

    const onDragstart = (ev: DragEvent) => {
      ev.preventDefault();
    };

    ref.addEventListener('dragstart', onDragstart);
    ref.addEventListener('drop', onDrop);
    return () => {
      ref.removeEventListener('drop', onDrop);
      ref.removeEventListener('dragstart', onDragstart);
    };
  }, [addBlock, ref, values]);


  useEffect(() => {
    if (ref) {
      const onMouseover = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);

        if (blockNode) {
          blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
        }
      };
      const onMouseOut = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
        }
      };

      const onDragOver = (ev: DragEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        if (blockNode) {
          ev.preventDefault();

          blockNode.classList.remove(DRAG_HOVER_CLASSNAME);
          blockNode.classList.remove(DRAG_TANGENT_CLASSNAME);
          if (
            ['top', 'bottom', 'right', 'left'].includes(getTangentDirection(ev))
          ) {

            blockNode.classList.add(DRAG_TANGENT_CLASSNAME);
          } else {

            blockNode.classList.add(DRAG_HOVER_CLASSNAME);
          }
        }
      };
      const onDragLeave = (ev: DragEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
        blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
      };

      ref.addEventListener('mouseover', onMouseover);
      ref.addEventListener('mouseout', onMouseOut);
      ref.addEventListener('dragover', onDragOver);
      ref.addEventListener('dragleave', onDragLeave);
      return () => {
        ref.removeEventListener('mouseover', onMouseover);
        ref.removeEventListener('mouseout', onMouseOut);
        ref.removeEventListener('dragover', onDragOver);
        ref.removeEventListener('dragleave', onDragLeave);
      };
    }
  }, [ref]);


  useEffect(() => {
    if (ref) {
      const onCopy = (ev: ClipboardEvent) => {
        ev.preventDefault();
        const range = document.getSelection()?.getRangeAt(0);
        if (!range || (range.startOffset === 0 && range.startOffset === range.endOffset))
          copy(JSON.stringify({
            copyBlock: focusBlock
          }));
      };
      const onPaste = (ev: ClipboardEvent) => {
        ev.preventDefault();
        var text = ev.clipboardData?.getData('text/plain') || '';
        try {
          const block: IBlockData = JSON.parse(text).copyBlock;
          addBlock({
            type: block.type,
            parentIdx: focusIdx,
            payload: block,
            canReplace: true
          });
        } catch (error) {

        }
      };

      ref.addEventListener('copy', onCopy);
      ref.addEventListener('paste', onPaste);
      return () => {
        ref.removeEventListener('copy', onCopy);
        ref.removeEventListener('paste', onPaste);
      };
    }
  }, [ref, focusIdx]);

  const hoverBlock = useMemo(() => {
    if (!ref) return null;

    const blockNode = findBlockNodeByIdx(hoverIdx);

    if (blockNode) {
      const block = findBlockByType(
        getNodeTypeFromClassName(blockNode.classList) as BlockType
      );
      const { left, top } = blockNode.getBoundingClientRect();
      return { left, top, name: block?.name };
    }

    return null;
  }, [hoverIdx, ref]);

  return {
    hoverBlock,
    setRef,
  };
}

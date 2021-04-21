import React, { useEffect, useMemo } from 'react';

import {
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
import { getBlockByType } from '@/components/core/blocks';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { Tooltip } from 'antd';

export function HoverTooltip({
  container: ref,
}: {
  container?: HTMLDivElement | null;
}) {
  const { focusIdx, hoverIdx, setHoverIdx } = useBlock();
  useEffect(() => {
    if (ref) {
      const onMouseover = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);

        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setHoverIdx(idx);
          blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
        }
      };
      const onMouseOut = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          setHoverIdx('');
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
            const idx = getParentIdx(
              getNodeIdxFromClassName(blockNode.classList)!
            )!;
            setHoverIdx(idx);

            blockNode.classList.add(DRAG_TANGENT_CLASSNAME);
          } else {
            const idx = getNodeIdxFromClassName(blockNode.classList)!;
            setHoverIdx(idx);
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
  }, [ref, setHoverIdx]);

  const hoverBlock = useMemo(() => {
    if (!ref) return null;

    const blockNode = findBlockNodeByIdx(hoverIdx);

    if (blockNode) {
      const block = getBlockByType(
        getNodeTypeFromClassName(blockNode.classList) as BlockType
      );
      const { left, top } = blockNode.getBoundingClientRect();
      return { left, top, name: block.name };
    }

    return null;
  }, [hoverIdx, ref]);

  return (
    <>
      <Tooltip
        key={hoverIdx}
        placement='leftTop'
        title={hoverBlock?.name}
        visible={!!hoverBlock && hoverIdx !== focusIdx}
      >
        <div
          style={{
            height: '100%',
            position: 'fixed',
            top: hoverBlock?.top,
            left: hoverBlock?.left,
          }}
        />
      </Tooltip>
      <div />
    </>
  );
}

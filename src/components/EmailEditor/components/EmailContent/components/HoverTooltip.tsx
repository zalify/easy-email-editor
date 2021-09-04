import React, { useMemo } from 'react';

import {
  findBlockByType,
  getChildIdx,
  getNodeTypeFromClassName,
} from '@/utils/block';
import { BlockType } from '@/constants';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { BlocksMap } from '@/components/core/blocks';
import { useDataTransfer } from '@/hooks/useDataTransfer';

export function HoverTooltip() {
  const { hoverIdx, isDragging, direction } = useHoverIdx();

  const hoverBlock = useMemo(() => {
    const blockNode = findBlockNodeByIdx(hoverIdx);

    if (blockNode) {
      const block = findBlockByType(
        getNodeTypeFromClassName(blockNode.classList) as BlockType
      );
      const { left, top } = blockNode.getBoundingClientRect();
      return { left, top, name: block?.name };
    }

    return null;
  }, [hoverIdx]);

  const tooltip = useMemo(() => {
    const blockName = hoverBlock?.name;
    const visible = Boolean(hoverBlock);
    return {
      blockName,
      visible,
      top: hoverBlock?.top,
      left: hoverBlock?.left,
    };
  }, [hoverBlock]);

  const tooltipContent = useMemo(() => {
    let idx = hoverIdx;
    const blockNode = findBlockNodeByIdx(idx);

    if (!isDragging || !blockNode) return tooltip.blockName;
    const type = getNodeTypeFromClassName(blockNode.classList)!;
    const block = BlocksMap.findBlockByType(type);
    if (!block) return;

    if (direction) {
      if (['top', 'left'].includes(direction)) {
        return `Insert before ${block.name}`;
      } else {
        return `Insert after ${block.name}`;
      }
    }

    return `Append to ${block.name}`;
  }, [direction, hoverIdx, isDragging, tooltip.blockName]);

  return useMemo(() => {
    return (
      <div
        style={{
          position: 'fixed',
          top: tooltip.top,
          left: tooltip.left,
          transform: 'translate(-100%, 50%)',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            opacity: Number(tooltip.visible),
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            position: 'relative',
            padding: '6px 8px',
            color: '#fff',
            minWidth: 40,
            borderRadius: 2,
            transform: 'translate(-20%,-50%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              width: 0,
              height: 0,
              borderTop: '5px solid rgba(0, 0, 0, 0.75)',
              borderRight: '5px solid transparent',
              borderLeft: '5px solid transparent',
              borderBottom: '5px solid transparent',
              pointerEvents: 'none',
              transform: 'translate(100%,-50%) rotate(-90deg)',
            }}
          />
          {tooltipContent}
        </div>
      </div>
    );
  }, [tooltip.left, tooltip.top, tooltip.visible, tooltipContent]);
}

import React, { useEffect, useMemo } from 'react';

import {
  findBlockByType,
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
} from '@/utils/block';
import { BlockType, BLOCK_HOVER_CLASSNAME } from '@/constants';
import { findBlockNodeByIdx, getBlockNodes } from '@/utils/findBlockNodeByIdx';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useHoverIdx } from '@/hooks/useHoverIdx';

export function HoverTooltip() {
  const { focusIdx } = useFocusIdx();
  const { hoverIdx, isDragging } = useHoverIdx();

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

  useEffect(() => {
    getBlockNodes().forEach((blockNode) => {
      if (getNodeIdxFromClassName(blockNode.classList) !== hoverIdx) {
        blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
      } else {
        blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
      }
    });
  }, [hoverIdx]);

  const tooltip = useMemo(() => {
    const blockName = hoverBlock?.name;
    const visible = Boolean(hoverBlock && hoverIdx !== focusIdx);
    return {
      blockName,
      visible,
      top: hoverBlock?.top,
      left: hoverBlock?.left,
    };
  }, [focusIdx, hoverBlock, hoverIdx]);

  return useMemo(() => {
    return (
      <div
        style={{
          position: 'fixed',
          top: tooltip.top,
          left: tooltip.left,
          transform: 'translate(-100%, 50%)'
        }}
      >
        <div style={{
          opacity: Number(tooltip.visible),
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          position: 'relative',
          padding: '6px 8px',
          color: '#fff',
          minWidth: 40,
          borderRadius: 2,
          transform: 'translate(-20%,-50%)'
        }}
        >
          <div style={{
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
            transform: 'translate(100%,-50%) rotate(-90deg)'
          }}
          />
          {isDragging ? `Drag to ${tooltip.blockName}` : tooltip.blockName}
        </div>
      </div>
    );
  }, [isDragging, tooltip.blockName, tooltip.left, tooltip.top, tooltip.visible]);
}

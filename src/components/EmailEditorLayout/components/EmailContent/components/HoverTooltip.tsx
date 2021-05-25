import React, { useEffect, useMemo } from 'react';

import {
  findBlockByType,
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
} from '@/utils/block';
import { BlockType, BLOCK_HOVER_CLASSNAME } from '@/constants';
import { findBlockNodeByIdx, getBlockNodes } from '@/utils/findBlockNodeByIdx';
import { Tooltip } from 'antd';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useHoverIdx } from '@/hooks/useHoverIdx';

export function HoverTooltip() {
  const { focusIdx } = useFocusIdx();
  const { hoverIdx } = useHoverIdx();

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
      <Tooltip
        placement='leftTop'
        title={tooltip.blockName}
        visible={tooltip.visible}
      >
        <div
          style={{
            height: '100%',
            position: 'fixed',
            top: tooltip.top,
            left: tooltip.left,
          }}
        />
      </Tooltip>
    );
  }, [tooltip]);
}

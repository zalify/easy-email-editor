import React, { useMemo } from 'react';

import {
  findBlockByType,
  getNodeTypeFromClassName,
} from '@/utils/block';
import {
  BlockType,
} from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { Tooltip } from 'antd';

export function HoverTooltip() {
  const { focusIdx, hoverIdx, } = useBlock();

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

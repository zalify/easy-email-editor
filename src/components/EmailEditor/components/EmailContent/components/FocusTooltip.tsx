import React, { useEffect, useMemo, useState } from 'react';

import { BlocksMap } from '@/components/core/blocks';
import { createPortal } from 'react-dom';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { ToolsBar } from './Toolsbar';
import { awaitForElement } from '@/utils/awaitForElement';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { BLOCK_SELECTED_CLASSNAME, styleZIndex } from '@/constants';
import { useBlock } from '@/hooks/useBlock';

export function FocusTooltip() {
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  const { isDragging } = useHoverIdx();
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    const promiseObj = awaitForElement<HTMLDivElement>(focusIdx);
    promiseObj.promise.then((blockNode) => {
      setBlockNode(blockNode);
    });

    return () => {
      promiseObj.cancel();
    };
  }, [focusIdx, focusBlock]);

  useEffect(() => {
    if (blockNode && focusBlock) {
      blockNode.classList.add(BLOCK_SELECTED_CLASSNAME);
      return () => {
        blockNode.classList.remove(BLOCK_SELECTED_CLASSNAME);
      };
    }
  }, [blockNode, focusBlock]);

  const block = useMemo(() => {
    if (!focusBlock) return null;
    return BlocksMap.findBlockByType(focusBlock.type);
  }, [focusBlock]);

  if (!block || !blockNode || isDragging) return null;

  return (
    <>
      {createPortal(
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            left: 0,
            top: 0,
            zIndex: styleZIndex.SELECT_BLOCK_TOOLTIP,
          }}
        >
          <ToolsBar block={block} />
          {/* outline */}
          <div
            style={{
              position: 'absolute',
              fontSize: 14,
              zIndex: 2,
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              outlineOffset: '-2px',
              outline: '2px solid var(--selected-color)',
            }}
          />
        </div>,
        blockNode
      )}
    </>
  );
}

import React, { useEffect, useMemo, useState } from 'react';

import { getNodeTypeFromClassName } from '@/utils/block';
import { BlocksMap } from '@/components/core/blocks';
import { createPortal } from 'react-dom';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { ToolsBar } from './Toolsbar';
import { awaitForElement } from '@/utils/awaitForElement';
import { useHoverIdx } from '@/hooks/useHoverIdx';

export function FocusTooltip() {
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  const { isDragging } = useHoverIdx();

  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    const promiseObj = awaitForElement<HTMLDivElement>(focusIdx);
    promiseObj.promise.then((blockNode) => {
      setBlockNode(blockNode);
    });

    return () => {
      promiseObj.cancel();
    };
  }, [focusIdx]);

  const block = useMemo(() => {
    return blockNode
      ? BlocksMap.findBlockByType(
        getNodeTypeFromClassName(blockNode.classList)!
      )
      : null;
  }, [blockNode]);

  if (!block || !blockNode || isDragging) return null;

  return (
    <>
      {createPortal(
        <ToolsBar block={block} />,
        blockNode
      )}
      {createPortal(
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: 14,
            zIndex: 2,
            color: '#000',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            textAlign: 'left',
          }}
        >
          {/* outline */}
          <div
            style={{
              position: 'absolute',
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

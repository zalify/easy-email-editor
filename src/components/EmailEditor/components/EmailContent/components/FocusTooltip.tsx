import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { BlocksMap } from '@/components/core/blocks';
import { createPortal } from 'react-dom';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { ToolsBar } from './Toolsbar';
import { awaitForElement } from '@/utils/awaitForElement';
import { BLOCK_SELECTED_CLASSNAME, styleZIndex } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { IconFont } from '@/components/IconFont';

export function FocusTooltip() {
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
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

  if (!block || !blockNode) return null;

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
          <div
            style={{
              position: 'absolute',
              zIndex: 9999,
              right: 0,
              top: '50%',
            }}
          >
            <BlockAvatarWrapper idx={focusIdx} type={block.type} action='move'>
              <div
                style={
                  {
                    position: 'absolute',
                    backgroundColor: 'var(--selected-color)',
                    color: '#ffffff',
                    height: '28px',
                    width: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                    cursor: 'grab',
                    pointerEvents: 'auto',
                    WebkitUserDrag: 'element',
                  } as any
                }
              >
                <IconFont
                  iconName='icon-move'
                  style={{ color: '#fff', cursor: 'grab' }}
                />
              </div>
            </BlockAvatarWrapper>
          </div>

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

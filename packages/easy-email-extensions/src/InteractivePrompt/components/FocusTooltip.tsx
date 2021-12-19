import React, { useEffect, useMemo, useRef, useState } from 'react';

import { BlockManager, BasicType } from 'easy-email-core';
import { createPortal } from 'react-dom';
import {
  IconFont,
  useBlock,
  useFocusIdx,
  BlockAvatarWrapper,
} from 'easy-email-editor';
import { awaitForElement } from '@extensions/utils/awaitForElement';
import { Toolbar } from './Toolbar';

export function FocusTooltip() {
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();

  const isPage = focusBlock?.type === BasicType.PAGE;

  useEffect(() => {
    const promiseObj = awaitForElement<HTMLDivElement>(focusIdx);
    promiseObj.promise.then((blockNode) => {
      setBlockNode(blockNode);
    });

    return () => {
      promiseObj.cancel();
    };
  }, [focusIdx, focusBlock]);

  const block = useMemo(() => {
    if (!focusBlock) return null;
    return BlockManager.getBlockByType(focusBlock.type);
  }, [focusBlock]);

  if (!block || !blockNode) return null;

  return (
    <>
      {createPortal(
        <div
          id='easy-email-extensions-InteractivePrompt-FocusTooltip'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          <style>
            {`
                .email-block {
                  position: relative;
                }

            `}
          </style>
          <div
            style={{
              position: 'absolute',
              zIndex: 9999,
              right: 0,
              top: '50%',
              display: isPage ? 'none' : undefined,
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
          <Toolbar block={block} blockNode={blockNode} />
        </div>,
        blockNode
      )}
    </>
  );
}

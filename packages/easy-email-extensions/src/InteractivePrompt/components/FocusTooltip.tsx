import React, { useEffect, useMemo, useState } from 'react';

import { BlockManager, BasicType } from 'easy-email-core';
import { createPortal } from 'react-dom';
import {
  IconFont,
  useBlock,
  useFocusIdx,
  BlockAvatarWrapper,
  getShadowRoot,
} from 'easy-email-editor';
import { awaitForElement } from '@extensions/utils/awaitForElement';
import { Toolbar } from './Toolbar';

export function FocusTooltip() {
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  const [direction, setDirection] = useState<'top' | 'bottom'>('top');

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
  useEffect(() => {
    if (blockNode) {
      const options: IntersectionObserverInit = {
        rootMargin: '-24px 0px -24px 0px',
        root: getShadowRoot().host,
        threshold: [0, 0.001, 0.1, 0.999, 0.9, 1],
      };
      const checkDirection: IntersectionObserverCallback = (ev) => {
        const [current] = ev;
        const { top, bottom } = current.intersectionRect;
        const rootBounds = current.rootBounds;


        if (!rootBounds) return;
        if (rootBounds.bottom === bottom) {
          setDirection('top');
        } else if (rootBounds.top === top) {
          setDirection('bottom');
        } else {
          setDirection('top');
        }
      };
      const observer = new IntersectionObserver(checkDirection, options);
      observer.observe(blockNode);
      return () => {
        observer.unobserve(blockNode);
      };
    }
  }, [blockNode]);

  const block = useMemo(() => {
    if (!focusBlock) return null;
    return BlockManager.getBlockByType(focusBlock.type);
  }, [focusBlock]);

  if (isPage || !block || !blockNode) return null;

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

          <Toolbar direction={direction} block={block} />
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

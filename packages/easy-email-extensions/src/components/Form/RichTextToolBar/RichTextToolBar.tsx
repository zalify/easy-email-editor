import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { awaitForElement } from '@extensions/utils/awaitForElement';
import {
  getEditNode,
  useBlock,
  useFocusIdx,
  getShadowRoot,
  useEditorContext,
} from 'easy-email-editor';
import { Tools } from './components/Tools';
import styleText from './shadow-dom.scss?inline';

export function RichTextToolBar() {
  const [direction, setDirection] = useState<'top' | 'bottom'>('top');
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
  const [offsetX, setOffsetX] = useState(0);
  const { focusBlock } = useBlock();
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();

  const pageWidth = +(pageData.attributes.width || '600').replace('px', '');

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
        rootMargin: '-84px 0px 0px 0px',
        root: getShadowRoot().firstChild as HTMLElement,
        threshold: [0, 0.001, 0.1, 0.999, 0.8, 0.9, 1],
      };
      const checkDirection: IntersectionObserverCallback = (ev) => {
        const [current] = ev;
        const { top } = current.intersectionRect;
        const boundingClientRect = current.boundingClientRect;
        const rootBounds = current.rootBounds;
        const intersectionRatio = current.intersectionRatio;
        if (!rootBounds) return;

        const paddingLeft = (rootBounds.width - pageWidth) / 2;
        const offsetLeft = boundingClientRect.left - rootBounds.left;
        setOffsetX(paddingLeft - offsetLeft);
        if (intersectionRatio === 1) {
          setDirection('top');
        } else {
          if (top) {
            if (top > rootBounds.top) {
              setDirection('top');
            } else {
              setDirection('bottom');
            }
          }
        }
      };
      const observer = new IntersectionObserver(checkDirection, options);
      observer.observe(blockNode);
      return () => {
        observer.unobserve(blockNode);
      };
    }
  }, [blockNode, pageWidth]);

  if (!blockNode) return null;

  const editorContainer = blockNode && getEditNode(blockNode);

  return (
    <>
      {createPortal(
        <>
          <style dangerouslySetInnerHTML={{ __html: styleText }}></style>
          <div
            style={{
              transform: direction === 'top' ? 'translate(0,-100%)' : undefined,
              padding: '4px 8px',
              boxSizing: 'border-box',
              position: 'absolute',
              zIndex: 100,
              top: direction === 'top' ? -40 : 'calc(100% + 40px)',
              left: offsetX,
              width: pageWidth
            }}
          >
            <div
              style={{
                position: 'absolute',
                backgroundColor: '#41444d',
                height: '100%',
                width: '100%',
                left: 0,
                top: 0,
                cursor: 'move',
              }}
            />

            <Tools container={editorContainer} onChange={() => { }} />

          </div>
        </>,
        blockNode
      )}
    </>
  );
}

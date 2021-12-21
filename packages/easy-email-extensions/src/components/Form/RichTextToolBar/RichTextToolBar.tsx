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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [blockNode, setBlockNode] = useState<HTMLDivElement | null>(null);
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

    const ele = getShadowRoot().querySelector('.shadow-container');
    if (!blockNode || !ele) return;

    const check = () => {
      const { top, left } = blockNode.getBoundingClientRect();
      setPosition({ top, left });
    };

    const onScroll = () => {
      check();
    };
    check();
    ele.addEventListener('scroll', onScroll, true);
    return () => {
      ele.removeEventListener('scroll', onScroll, true);
    };
  }, [blockNode]);


  if (!blockNode) return null;

  const editorContainer = blockNode && getEditNode(blockNode);

  return (
    <>
      {createPortal(
        <>
          <style dangerouslySetInnerHTML={{ __html: styleText }} />
          <div
            style={{
              transform: 'translate(0,-100%)',
              padding: '4px 8px',
              boxSizing: 'border-box',
              position: 'fixed',
              zIndex: 100,
              top: position.top - 24,
              left: position.left,
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

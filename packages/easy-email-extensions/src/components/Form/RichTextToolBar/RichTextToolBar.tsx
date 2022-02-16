import React from 'react';
import { createPortal } from 'react-dom';
import {
  ActiveTabKeys,
  getEditNode,
  useActiveTab,
  useFocusBlockLayout,
} from 'easy-email-editor';
import { Tools } from './components/Tools';
import styleText from './shadow-dom.scss?inline';

export function RichTextToolBar(props: { onChange: (s: string) => void; }) {
  const { focusBlockNode } = useFocusBlockLayout();
  const { activeTab } = useActiveTab();

  if (!focusBlockNode || activeTab !== ActiveTabKeys.EDIT)
    return null;

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
              position: 'absolute',
              left: 0,
              top: -24,
              zIndex: 100,
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

            <Tools onChange={props.onChange} />
          </div>
        </>,
        focusBlockNode
      )}
    </>
  );
}

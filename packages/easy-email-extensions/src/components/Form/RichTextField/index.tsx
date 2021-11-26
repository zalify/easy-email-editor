import {
  useActiveTab,
  FIXED_CONTAINER_ID,
  useBlock,
  useFocusIdx,
  getBlockNodeByIdx,
  getEditorRoot,
} from 'easy-email-editor';
import { onDrag } from '@extensions/AttributePanel/utils/onDrag';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocalStorage } from 'react-use';
import { EnhancerProps } from '../enhancer';
import { InlineTextField } from '../index';
import { InlineTextProps } from '../InlineTextField';
import { TextToolbar } from './components/TextToolbar';
import { BasicType } from 'easy-email-core';
import { getEditNode } from '@extensions/AttributePanel/utils/getEditNode';

const TEXT_BAR_LOCATION_KEY = 'TEXT_BAR_LOCATION_KEY';
const RichTextFieldItem = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) => {
  const { activeTab } = useActiveTab();
  const isActive = activeTab === 'EDIT';

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [locationState, setLocationState] = useLocalStorage(
    TEXT_BAR_LOCATION_KEY,
    { left: 0, top: 0 }
  );
  const { idx } = props;

  const container = getBlockNodeByIdx(idx);

  useEffect(() => {
    const fixContainer = getEditorRoot();
    if (fixContainer && idx) {
      const { left, top } = fixContainer.getBoundingClientRect();

      setPosition({
        left: locationState?.left || left,
        top: locationState?.top || top - 46,
      });
    }
  }, [idx, locationState?.left, locationState?.top]);

  const onChange = useCallback(() => {}, []);

  const editorContainer = container && getEditNode(container);

  const textToolbar = useMemo(() => {
    const onMoveTextToolbar = (event: React.MouseEvent) => {
      onDrag({
        event: event as any,
        onMove(x, y) {
          setPosition({
            left: position.left + x,
            top: position.top + y,
          });
          setLocationState({
            left: position.left + x,
            top: position.top + y,
          });
        },
        onEnd() {},
      });
    };

    return createPortal(
      <div
        key={idx}
        style={{
          position: 'fixed',
          ...position,
          transform: 'translate(0,-100%)',
          padding: 16,
          boxSizing: 'border-box',

          zIndex: 100,
          display: Boolean(isActive) ? undefined : 'none',
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
          onMouseDown={onMoveTextToolbar}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <TextToolbar container={editorContainer} onChange={onChange} />
        </div>
      </div>,
      document.getElementById(FIXED_CONTAINER_ID) as HTMLDivElement
    );
  }, [idx, position, isActive, editorContainer, onChange, setLocationState]);

  return (
    <>
      <InlineTextField {...(props as any)} />
      {editorContainer && textToolbar}
    </>
  );
};

export const RichTextField = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) => {
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  if (focusBlock?.type !== BasicType.TEXT) return null;
  return <RichTextFieldItem key={focusIdx} {...props} />;
};

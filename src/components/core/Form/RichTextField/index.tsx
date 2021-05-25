import { findBlockNodeByIdx, getEditorRoot } from '@/utils/findBlockNodeByIdx';
import { getEditNode } from '@/utils/getEditNode';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EnhancerProps } from '../enhancer';
import { InlineTextField } from '../index';
import { InlineTextProps } from '../InlineTextField';
import { TextToolbar } from './components/TextToolbar';

export function RichTextField(
  props: Omit<InlineTextProps, 'onChange'> & EnhancerProps
) {
  const { idx } = props;
  const [isFocus, setIsFocus] = useState(true);

  const container = findBlockNodeByIdx(idx);

  const textToolbarPosition = useMemo(() => {
    if (!container)
      return {
        top: 0,
        left: 0,
      };

    const { left, top } = container.getBoundingClientRect();
    return {
      left,
      top: top - 16,
    };
  }, [container]);

  const onChange = useCallback(() => {}, []);

  const editorContainer = container && getEditNode(container);

  useEffect(() => {
    setIsFocus(true);
  }, [idx]);

  useEffect(() => {
    if (!editorContainer) return;

    const onFocus = () => {
      setIsFocus(true);
    };
    const onBlur = (ev: Event) => {
      const target = ev.target as HTMLElement;
      const richTextEditorToolbar = document.querySelector(
        '#RichTextEditorToolbar'
      );

      if (getEditorRoot()?.contains(target)) return;
      if (richTextEditorToolbar?.contains(target)) return;

      setIsFocus(false);
    };

    window.addEventListener('click', onBlur, true);
    editorContainer.addEventListener('focus', onFocus);
    return () => {
      window.removeEventListener('click', onBlur, true);
      editorContainer.removeEventListener('focus', onFocus);
    };
  }, [editorContainer]);

  const textToolbar = useMemo(() => {
    return createPortal(
      <div
        id='RichTextEditorToolbar'
        style={{
          position: 'fixed',
          ...textToolbarPosition,
          transform: 'translate(0,-100%)',
          padding: 16,
          boxSizing: 'border-box',
          backgroundColor: '#41444d',
          zIndex: 1000,
        }}
      >
        <TextToolbar container={editorContainer} onChange={onChange} />
      </div>,
      document.body
    );
  }, [editorContainer, onChange, textToolbarPosition]);

  return (
    <>
      <InlineTextField key={idx} {...props} />
      {isFocus && textToolbar}
    </>
  );
}

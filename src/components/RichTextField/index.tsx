import { findBlockNodeByIdx, getShadowRoot } from '@/utils/findBlockNodeByIdx';
import { getEditNode } from '@/utils/getEditNode';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EnhancerProps } from '../core/Form/enhancer';
import { InlineTextField, InlineTextProps } from '../InlineTextField';
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
      ev.stopPropagation();
      const target = ev.target as HTMLElement;
      const richTextEditorToolbar = document.querySelector(
        '#RichTextEditorToolbar'
      );

      if (editorContainer.contains(target)) return;
      if (richTextEditorToolbar?.contains(target as HTMLElement)) return;
      setIsFocus(false);
    };
    const root = getShadowRoot();
    root.addEventListener('click', onBlur);
    document.addEventListener('click', onBlur);
    editorContainer.addEventListener('focus', onFocus);
    return () => {
      root.removeEventListener('click', onBlur);
      document.removeEventListener('click', onBlur);
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

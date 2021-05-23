import React, { useEffect, useMemo } from 'react';
import { findBlockNodeByIdx, getEditorRoot, getShadowRoot } from '@/utils/findBlockNodeByIdx';
import { getEditContent, getEditNode } from '@/utils/getEditNode';
import enhancer from '../core/Form/enhancer';

export interface InlineTextProps { idx: string; children?: React.ReactNode; onChange: (content: string) => void; };

function InlineText({ idx, onChange, children }: InlineTextProps) {
  const textContainer = findBlockNodeByIdx(idx);

  useEffect(() => {
    if (!textContainer) return;

    const container = getEditNode(textContainer);

    if (container) {
      let focusTarget: HTMLElement | null = null;

      const onClick = (ev: MouseEvent) => {
        focusTarget = ev.target as HTMLElement;
      };

      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        var text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertHTML', false, text);
      };

      const onBlur = () => {
        const richTextEditorToolbar = document.querySelector('#RichTextEditorToolbar');
        if (richTextEditorToolbar?.contains(focusTarget)) return;

        onChange(getEditContent(textContainer));
      };
      container.addEventListener('paste', onPaste);
      container.addEventListener('blur', onBlur);
      document.addEventListener('mousedown', onClick);

      return () => {
        container.removeEventListener('paste', onPaste);
        container.removeEventListener('blur', onBlur);
        document.removeEventListener('mousedown', onClick);
      };
    }

  }, [onChange, textContainer]);

  return <>{children}</>;
}

export const InlineTextField = enhancer<InlineTextProps>(InlineText, (value) => value);
import React, { useEffect } from 'react';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { getEditContent, getEditNode } from '@/utils/getEditNode';

export interface InlineTextProps { idx: string; children?: React.ReactNode; onChange: (content: string) => void; }

export function InlineText({ idx, onChange, children }: InlineTextProps) {

  useEffect(() => {
    const textContainer = findBlockNodeByIdx(idx);
    if (!textContainer) return;

    const container = getEditNode(textContainer);

    if (container) {
      let focusTarget: HTMLElement | null = null;

      const onClick = (ev: MouseEvent) => {
        focusTarget = ev.target as HTMLElement;
      };

      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertHTML', false, text);
      };

      const onBlur = () => {
        const richTextEditorToolbar = document.querySelector('#RichTextEditorToolbar');
        if (richTextEditorToolbar?.contains(focusTarget)) return;

        onChange(getEditContent(textContainer));
      };
      container.addEventListener('paste', onPaste as any, true);
      container.addEventListener('blur', onBlur);
      document.addEventListener('mousedown', onClick);

      return () => {
        container.removeEventListener('paste', onPaste as any, true);
        container.removeEventListener('blur', onBlur);
        document.removeEventListener('mousedown', onClick);
      };
    }

  }, [onChange, idx]);

  return <>{children}</>;
}


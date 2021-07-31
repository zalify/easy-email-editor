import React, { useEffect } from 'react';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { getEditContent, getEditNode } from '@/utils/getEditNode';
import { findBlockNode } from '@/utils/findBlockNode';

export interface InlineTextProps { idx: string; children?: React.ReactNode; onChange: (content: string) => void; }

export function InlineText({ idx, onChange, children }: InlineTextProps) {

  useEffect(() => {
    const textContainer = findBlockNodeByIdx(idx);
    if (!textContainer) return;

    const container = getEditNode(textContainer);

    if (container) {
      const focusBlock = findBlockNode(container)!;
      let focusTarget: HTMLElement | null = null;

      const onClick = (ev: MouseEvent) => {
        focusTarget = ev.target as HTMLElement;
      };

      const onFocusBlockClick = (ev: MouseEvent) => {
        ev.stopPropagation();
        focusTarget = ev.target as HTMLElement;
      };

      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertHTML', false, text);
      };
      const stopDrag = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const onBlur = () => {
        const richTextEditorToolbar = document.querySelector('#RichTextEditorToolbar');

        if (focusBlock && focusBlock?.contains(focusTarget)) return;
        if (richTextEditorToolbar?.contains(focusTarget)) return;
        console.log('callback', focusBlock, focusTarget);
        onChange(getEditContent(textContainer));
      };
      container.addEventListener('paste', onPaste as any, true);
      container.addEventListener('blur', onBlur);
      container.addEventListener('dragstart', stopDrag);
      focusBlock.addEventListener('mousedown', onFocusBlockClick);
      document.addEventListener('mousedown', onClick);

      return () => {
        container.removeEventListener('paste', onPaste as any, true);
        container.removeEventListener('blur', onBlur);
        container.removeEventListener('dragstart', stopDrag);
        focusBlock.removeEventListener('mousedown', onFocusBlockClick);
        document.removeEventListener('mousedown', onClick);
      };
    }

  }, [onChange, idx]);

  return <>{children}</>;
}


import React, { useCallback, useEffect, useState } from 'react';
import {
  findBlockNodeByIdx,
  getEditorRoot,
  getShadowRoot,
} from '@/utils/findBlockNodeByIdx';
import { getEditContent, getEditNode } from '@/utils/getEditNode';
import { useBlock } from '@/hooks/useBlock';
import { FIXED_CONTAINER_ID } from '@/constants';
import { useField } from 'react-final-form';
import { awaitForElement } from '@/utils/awaitForElement';

export interface InlineTextProps {
  idx: string;
  children?: React.ReactNode;
  onChange: (content: string) => void;
  mutators: Record<string, (...args: any[]) => any>;
}

export function InlineText({
  idx,
  onChange,
  children,
  mutators: { setFieldTouched },
}: InlineTextProps) {
  const [isFocus, setIsFocus] = useState(false);
  const [textContainer, setTextContainer] = useState<HTMLElement | null>(null);

  useField(idx); // setFieldTouched will be work while register field,
  const { focusBlock } = useBlock();

  useEffect(() => {
    const promiseObj = awaitForElement<HTMLDivElement>(idx);
    promiseObj.promise.then((blockNode) => {
      setTextContainer(blockNode);
    });

    return () => {
      promiseObj.cancel();
    };
  }, [idx, focusBlock]);

  const onTextChange = useCallback(
    (text: string) => {
      if (focusBlock?.data.value.content !== text) {
        onChange(text);
      }
    },
    [focusBlock?.data.value.content, onChange]
  );

  useEffect(() => {
    if (!textContainer) return;

    const container = getEditNode(textContainer);

    if (container) {
      container.focus();
      let focusTarget: HTMLElement | null = null;
      const root = getShadowRoot();

      const onClick = (ev: Event) => {
        ev.stopPropagation();
        focusTarget = ev.target as HTMLElement;
        const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
        if (textContainer?.contains(focusTarget)) return;

        if (fixedContainer && fixedContainer.contains(focusTarget)) return;
        if (fixedContainer?.contains(document.activeElement)) return;

        onTextChange(getEditContent(textContainer));
      };

      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        console.log(text);
        debugger;
        document.execCommand('insertHTML', false, text);
      };
      const stopDrag = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const onInput = () => {
        setFieldTouched(idx, true);
      };

      container.addEventListener('paste', onPaste as any, true);
      container.addEventListener('dragstart', stopDrag);
      container.addEventListener('input', onInput);

      document.addEventListener('mousedown', onClick);
      root.addEventListener('mousedown', onClick);

      return () => {
        container.removeEventListener('paste', onPaste as any, true);
        container.removeEventListener('dragstart', stopDrag);
        container.removeEventListener('input', onInput);
        document.removeEventListener('mousedown', onClick);
        root.removeEventListener('mousedown', onClick);
      };
    }
  }, [idx, onTextChange, setFieldTouched, textContainer]);

  useEffect(() => {
    const onFocus = (ev: Event) => {
      ev.stopPropagation();
      if (document.activeElement === getEditorRoot()) {
        setIsFocus(true);
      } else {
        setIsFocus(false);
      }
    };
    const root = getShadowRoot();
    root.addEventListener('click', onFocus);
    root.addEventListener('focusin', onFocus);
    window.addEventListener('focusin', onFocus);
    return () => {
      root.addEventListener('click', onFocus);
      root.removeEventListener('focusin', onFocus);
      window.removeEventListener('focusin', onFocus);
    };
  }, []);

  if (!isFocus) return null;
  return <>{children}</>;
}

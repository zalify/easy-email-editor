import React, { useCallback, useEffect, useState } from 'react';
import {
  useBlock,
} from 'easy-email-editor';
import { useField, useForm } from 'react-final-form';
import { awaitForElement } from '@extensions/AttributePanel/utils/awaitForElement';
import { getEditContent, getEditNode } from 'easy-email-editor';

export interface InlineTextProps {
  idx: string;
  children?: React.ReactNode;
  onChange: (content: string) => void;
}

export function InlineText({ idx, onChange, children }: InlineTextProps) {
  const {
    mutators: { setFieldTouched },
  } = useForm();
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

  useEffect(() => {
    if (!textContainer) return;

    const container = getEditNode(textContainer);

    if (container) {
      container.focus();

      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertHTML', false, text);
        setFieldTouched(idx, true);
        onChange(getEditContent(textContainer));
      };

      const onInput = () => {
        setFieldTouched(idx, true);
        onChange(getEditContent(textContainer));
      };

      container.addEventListener('paste', onPaste as any, true);
      container.addEventListener('input', onInput);

      return () => {
        container.removeEventListener('paste', onPaste as any, true);
        container.removeEventListener('input', onInput);
      };
    }
  }, [idx, onChange, setFieldTouched, textContainer]);

  return <>{children}</>;
}

import React, { useEffect } from 'react';
import {
  ContentEditableType,
  DATA_CONTENT_EDITABLE_TYPE,
} from 'easy-email-editor';
import { useField, useForm } from 'react-final-form';
import { getIframeDocument } from '@extensions/utils/getIframeDocument';

export interface InlineTextProps {
  idx: string;
  children?: React.ReactNode;
  onChange: (content: string) => void;
}

export function InlineText({ idx, onChange, children }: InlineTextProps) {
  const {
    mutators: { setFieldTouched },
  } = useForm();

  useField(idx); // setFieldTouched will be work while register field,

  useEffect(() => {
    const iframeDocument = getIframeDocument();

    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;

      if (target.getAttribute('contenteditable')) {

        e.preventDefault();

        const text = e.clipboardData?.getData('text/plain') ?? '';
        iframeDocument?.execCommand('insertHTML', false, text);
        const contentEditableType = target.getAttribute(DATA_CONTENT_EDITABLE_TYPE);
        if (contentEditableType === ContentEditableType.RichText) {
          onChange(target.innerHTML || '');
        } else if (contentEditableType === ContentEditableType.Text) {
          onChange(target.textContent?.trim() ?? '');
        }
      }
    };

    const onInput = (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.getAttribute('contenteditable')) {

        const contentEditableType = target.getAttribute(DATA_CONTENT_EDITABLE_TYPE);
        if (contentEditableType === ContentEditableType.RichText) {
          onChange(target.innerHTML || '');
        } else if (contentEditableType === ContentEditableType.Text) {
          onChange(target.textContent?.trim() ?? '');
        }
      }
    };

    iframeDocument?.body.addEventListener('paste', onPaste as any, true);
    iframeDocument?.body.addEventListener('input', onInput);

    return () => {
      iframeDocument?.body.removeEventListener('paste', onPaste as any, true);
      iframeDocument?.body.removeEventListener('input', onInput);
    };
  }, [onChange, setFieldTouched]);

  return <>{children}</>;
}

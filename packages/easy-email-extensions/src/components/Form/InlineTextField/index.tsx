import React, { useEffect } from 'react';
import { ContentEditableType, DATA_CONTENT_EDITABLE_TYPE, getShadowRoot } from 'easy-email-editor';
import { useField, useForm } from 'react-final-form';

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
    const shadowRoot = getShadowRoot();

    const onPaste = (e: ClipboardEvent) => {
      if (!(e.target instanceof Element) || !e.target.getAttribute('contenteditable')) return;
      e.preventDefault();

      const text = e.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertHTML', false, text);
      const contentEditableType = e.target.getAttribute(DATA_CONTENT_EDITABLE_TYPE);
      if (contentEditableType === ContentEditableType.RichText) {
        onChange(e.target.innerHTML || '');
      } else if (contentEditableType === ContentEditableType.Text) {
        onChange(e.target.textContent?.trim() || '');
      }
    };

    const onInput = (e: Event) => {
      if (e.target instanceof Element && e.target.getAttribute('contenteditable')) {

        const contentEditableType = e.target.getAttribute(DATA_CONTENT_EDITABLE_TYPE);
        if (contentEditableType === ContentEditableType.RichText) {
          onChange(e.target.innerHTML || '');
        } else if (contentEditableType === ContentEditableType.Text) {
          onChange(e.target.textContent?.trim() || '');
        }
      }
    };

    shadowRoot.addEventListener('paste', onPaste as any, true);
    shadowRoot.addEventListener('input', onInput);

    return () => {
      shadowRoot.removeEventListener('paste', onPaste as any, true);
      shadowRoot.removeEventListener('input', onInput);
    };
  }, [onChange, setFieldTouched]);

  return <>{children}</>;
}

import React, { useEffect } from 'react';
import { getShadowRoot } from 'easy-email-editor';
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
      if (!(e.target instanceof Element)) return;
      e.preventDefault();

      const text = e.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertHTML', false, text);
      onChange(e.target.innerHTML || '');
    };

    const onInput = (e: Event) => {
      if (e.target instanceof Element) {
        onChange(e.target.innerHTML || '');
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

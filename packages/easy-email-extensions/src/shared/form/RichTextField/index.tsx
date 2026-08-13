import {
  useEditorProps,
  MergeTagBadge,
  getEditorRoot,
  getShadowRoot,
  FIXED_CONTAINER_ID,
  RICH_TEXT_BAR_ID,
  DATA_CONTENT_EDITABLE_IDX,
  CONTENT_EDITABLE_CLASS_NAME,
  DATA_CONTENT_EDITABLE_TYPE,
  ContentEditableType,
} from 'easy-email-editor';
import React, { useCallback, useEffect, useState } from 'react';
import { InlineText, InlineTextProps } from '../InlineTextField';
import { RichTextToolBar } from '../RichTextToolBar';
import { Field, FieldInputProps } from 'react-final-form';
import { debounce } from 'lodash';

export const RichTextField = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'>
) => {
  const [contentEditableName, setContentEditableName] = useState('');
  const [contentEditableType, setContentEditableType] = useState<string | null>(
    CONTENT_EDITABLE_CLASS_NAME
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (getEditorRoot()?.contains(e.target as Node)) {
        return;
      }
      const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
      if (fixedContainer?.contains(e.target as Node)) {
        return;
      }
      setContentEditableName('');
    };

    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    const root = getShadowRoot();
    if (!root) return;
    const onClick = (e: Event) => {
      const target = e.target as HTMLElement;

      const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
      const richTextBar = root.getElementById(RICH_TEXT_BAR_ID);
      if (fixedContainer?.contains(target) || richTextBar?.contains(target)) {
        return;
      }
      const activeElement = getShadowRoot().activeElement;
      if (!activeElement) {
        setContentEditableName('');
      } else {
        const idxName = activeElement.getAttribute(DATA_CONTENT_EDITABLE_IDX);
        const type = activeElement.getAttribute(DATA_CONTENT_EDITABLE_TYPE);
        setContentEditableType(type);
        if (idxName) {
          setContentEditableName(idxName);
        } else {
          setContentEditableName('');
        }
      }
    };

    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('click', onClick);
    };
  }, []);

  if (!contentEditableName) return null;

  return (
    <>
      <Field name={contentEditableName} parse={(v) => v}>
        {({ input }) => (
          <FieldWrapper
            {...props}
            contentEditableType={contentEditableType}
            input={input}
          />
        )}
      </Field>
    </>
  );
};

function FieldWrapper(
  props: Omit<InlineTextProps, 'onChange'> & {
    input: FieldInputProps<any, HTMLElement>;
    contentEditableType: string | null;
  }
) {
  const { input, contentEditableType, ...rest } = props;
  const { mergeTagGenerate, enabledMergeTagsBadge } = useEditorProps();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallbackChange = useCallback(
    debounce((val) => {
      if (enabledMergeTagsBadge) {
        input.onChange(MergeTagBadge.revert(val, mergeTagGenerate));
      } else {
        input.onChange(val);
      }

      input.onBlur();
    }, 200),
    [input]
  );

  return (
    <>
      {contentEditableType === ContentEditableType.RichText && (
        <RichTextToolBar onChange={debounceCallbackChange} />
      )}
      <InlineText {...rest} onChange={debounceCallbackChange} />
    </>
  );
}

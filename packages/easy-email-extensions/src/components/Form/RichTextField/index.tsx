import {
  isTextBlock,
  useBlock,
  useEditorProps,
  useFocusIdx,
} from 'easy-email-editor';
import React, { useCallback, useEffect } from 'react';
import { InlineText, InlineTextProps } from '../InlineTextField';
import { RichTextToolBar } from '../RichTextToolBar';
import { Field, FieldInputProps } from 'react-final-form';
import { debounce } from 'lodash';
import { MergeTagBadge } from '@/utils/MergeTagBadge';

export const RichTextField = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'>
) => {
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    MergeTagBadge.init();
  }, []);

  if (!isTextBlock(focusBlock?.type)) return null;

  const name = `${focusIdx}.data.value.content`;

  return (
    <>
      <Field name={name} parse={(v) => v}>
        {({ input }) => <FieldWrapper {...props} input={input} />}
      </Field>
    </>
  );
};

function FieldWrapper(
  props: Omit<InlineTextProps, 'onChange'> & {
    input: FieldInputProps<any, HTMLElement>;
  }
) {
  const { input, ...rest } = props;
  const { mergeTagGenerate } = useEditorProps();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallbackChange = useCallback(
    debounce((val) => {
      input.onChange(MergeTagBadge.revert(val, mergeTagGenerate));

      input.onBlur();
    }, 200),
    [input]
  );

  return (
    <>
      <RichTextToolBar onChange={debounceCallbackChange} />
      <InlineText {...rest} onChange={debounceCallbackChange} />;
    </>
  );
}

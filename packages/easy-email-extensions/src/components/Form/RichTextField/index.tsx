import {
  useBlock,
  useFocusIdx,
} from 'easy-email-editor';
import React, { useCallback } from 'react';
import { InlineText, InlineTextProps } from '../InlineTextField';
import { BasicType } from 'easy-email-core';
import { RichTextToolBar } from '../RichTextToolBar';
import { Field, FieldInputProps } from 'react-final-form';
import { debounce } from 'lodash';

export const RichTextField = (
  props: Omit<InlineTextProps, 'onChange' | 'mutators'>
) => {
  const { focusBlock } = useBlock();
  const { focusIdx } = useFocusIdx();
  if (focusBlock?.type !== BasicType.TEXT) return null;

  const name = `${focusIdx}.data.value.content`;

  return (
    <>
      <RichTextToolBar />
      <Field name={name} parse={v => v}>
        {
          ({ input }) => <FieldWrapper {...props} input={input} />
        }

      </Field>

    </>
  );
};


function FieldWrapper(props: Omit<InlineTextProps, 'onChange'> & { input: FieldInputProps<any, HTMLElement>; }) {

  const { input, ...rest } = props;

  const debounceCallbackChange = useCallback(
    debounce(
      (val) => {
        input.onChange(val);
      },
      500,
    ),
    [input]
  );

  return <InlineText {...rest} onChange={debounceCallbackChange} />;
}
import React, { useMemo } from 'react';
import {
  ColorPickerField,
  RadioGroupField,
  SelectField,
  TextAreaField,
  TextField,
} from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextAlign } from './TextAlign';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const whiteSpaceListOptions = getOptionsByStringArray([
  'inherit',
  'initial',
  'revert',
  'unset',
  '-moz-pre-wrap',
  'break-spaces',
  'normal',
  'nowrap',
  'pre',
  'pre-line',
  'pre-wrap',
]);

const textDecorationOptions = getOptionsByStringArray([
  'none',
  'underline',
  'overline',
  'line-through',
  'blink',
  'inherit',
]);

const fontWeightOptions = getOptionsByStringArray(['normal', 'bold', 'bolder']);

const fontStyleOptions = getOptionsByStringArray(['normal', 'italic']);

export interface FontProps {
  type?: 'text' | 'paragraph';
}
export default function Font(props: FontProps) {
  const { focusIdx } = useBlock();
  const { type } = props;

  return useMemo(() => {
    return (

      <Stack key={focusIdx} vertical spacing="extraTight">
        {type === 'text' && <TextAreaField label="文本内容" name={`${focusIdx}.data.value`} autoSize={{ minRows: 5, }} />}
        <ColorPickerField
          label="颜色"
          name={`${focusIdx}.style.color`}
          inline
          alignment="center"
        />
        <TextField label="大小" quickchange name={`${focusIdx}.style.fontSize`} inline />
        <TextField label="行高" quickchange name={`${focusIdx}.style.lineHeight`} inline />
        <TextField label="样式" name={`${focusIdx}.style.decoration`} inline />
        <SelectField
          label="换行方式"
          name={`${focusIdx}.style.whiteSpace`}
          options={whiteSpaceListOptions}
          inline
        />
        <SelectField
          label="文本装饰"
          name={`${focusIdx}.style.textDecoration`}
          options={textDecorationOptions}
          inline
        />
        <RadioGroupField
          label="加粗"
          name={`${focusIdx}.style.fontWeight`}
          options={fontWeightOptions}
          inline
        />
        <RadioGroupField
          label="倾斜"
          name={`${focusIdx}.style.fontStyle`}
          options={fontStyleOptions}
          inline
        />

        <TextAlign />
      </Stack>

    );
  }, [focusIdx, type]);
}

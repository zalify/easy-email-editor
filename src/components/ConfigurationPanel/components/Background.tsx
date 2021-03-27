import React, { useMemo } from 'react';
import { ColorPickerField, ImageUploaderField, SelectField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';
import { useEditorContext } from '@/hooks/useEditorContext';

const backgroundRepeatOptions = [
  {
    value: 'none',
    label: '不重复',
  },
  {
    value: 'repeat',
    label: '重复',
  },
  {
    value: 'repeat-x',
    label: 'x轴重复',
  },
  {
    value: 'repeat-y',
    label: 'y轴重复',
  }
];

// 'background-color': string;
// 'background-position': string;
// 'background-position-x': string;
// 'background-position-y': string;
// 'background-repeat': 'repeat' | 'no-repeat';
// 'background-size': string;
// 'background-url': string;

export function Background() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle size='large'>
          背景
        </TextStyle>
        <ColorPickerField
          label='颜色'
          name={`${focusIdx}.attribute.background-color`}
          inline
          alignment='center'
        />
        <Stack vertical spacing="none">
          <TextField label="背景图" inline
            name={`${focusIdx}.attribute.background-url`}
          />
          <TextField label="背景大小" inline
            name={`${focusIdx}.attribute.background-size`}

          />
        </Stack>
        <SelectField
          label='背景重复'
          name={`${focusIdx}.attribute.background-repeat`}
          options={backgroundRepeatOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}

import React, { useMemo } from 'react';
import { NumberField, TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';

export function Decoration() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle variation='strong' size='large'>
          装饰
        </TextStyle>
        <TextField
          label="圆角"
          name={`${focusIdx}.style.borderRadius`}
          inline
        />
        <TextField
          label='边框'
          name={`${focusIdx}.style.border`}
          inline
          alignment='center'
        />
        <NumberField
          label='透明度'
          max={1}
          min={0}
          step={0.1}
          name={`${focusIdx}.style.opacity`}
          inline
          alignment='center'
        />

      </Stack>
    );
  }, [focusIdx]);
}

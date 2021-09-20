import React, { useMemo } from 'react';
import { ColorPickerField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Color({ title = 'Color', inline = true }: { title?: string; inline?: boolean; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={`${focusIdx}.attributes.color`}
        inline={inline}
        alignment='center'
      />
    );
  }, [focusIdx, inline, title]);
}

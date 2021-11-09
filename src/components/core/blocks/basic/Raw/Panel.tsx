import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { TextAreaField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';

export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper style={{ padding: 20 }}>
      <Stack.Item fill>
        <TextAreaField
          label='content'
          name={`${focusIdx}.data.value.content`}
        />
      </Stack.Item>
    </AttributesPanelWrapper>

  );
}

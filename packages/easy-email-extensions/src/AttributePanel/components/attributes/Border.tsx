import { InlineGrid } from '@shopify/polaris';
import { useFocusIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { InputWithUnitField, SelectField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InlineGrid columns={1}>
        <SelectField
          label='Style'
          name={`${focusIdx}.attributes.border`}
          options={[
            {
              label: 'solid',
              value: 'solid',
            },
            {
              label: 'dashed',
              value: 'dashed',
            },
            {
              label: 'dotted',
              value: 'dotted',
            },
            {
              label: 'none',
              value: 'none',
            },
          ]}
        />

        <InputWithUnitField
          label={t('Border radius')}
          name={`${focusIdx}.attributes.border-radius`}
          suffix='px'
          config={pixelAdapter}
          type='number'
        />
      </InlineGrid>
    );
  }, [focusIdx]);
}

import { useFocusIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';
import { InlineStack } from '@shopify/polaris';

export function Height() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InlineStack>
        <TextField
          label={t('Height')}
          type='number'
          suffix='px'
          name={`${focusIdx}.attributes.height`}
          // quickchange
          config={pixelAdapter}
          autoComplete='off'
        />
      </InlineStack>
    );
  }, [focusIdx]);
}

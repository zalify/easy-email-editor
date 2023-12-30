import { IconLink } from '@arco-design/web-react/icon';
import { InlineGrid } from '@shopify/polaris';
import { useFocusIdx } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { SelectField, TextField } from '../../../components/Form';

export function Link() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <InlineGrid
        columns={2}
        gap='300'
      >
        <TextField
          prefix={<IconLink />}
          label={<span>{t('Href')}&nbsp;&nbsp;&nbsp;</span>}
          name={`${focusIdx}.attributes.href`}
          autoComplete='off'
        />

        <SelectField
          label={t('Target')}
          name={`${focusIdx}.attributes.target`}
          options={[
            {
              value: '',
              label: t('_self'),
            },
            {
              value: '_blank',
              label: t('_blank'),
            },
          ]}
        />
      </InlineGrid>
    );
  }, [focusIdx]);
}

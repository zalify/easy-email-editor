import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function TextAlign({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        value: 'left',
        label: t('attributes.left'),
      },
      {
        value: 'center',
        label: t('attributes.center'),
      },
      {
        value: 'right',
        label: t('attributes.right'),
      },
    ];
  }, [t]);

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label={t('attributes.textAlign')}
          name={name || `${focusIdx}.attributes.text-align`}
          options={options}
        />
      </Stack>
    );
  }, [focusIdx, name, t, options]);
}

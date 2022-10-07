import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

const options = [
  {
    value: 'top',
    label: 'top',
  },
  {
    value: 'middle',
    label: 'middle',
  },
  {
    value: 'bottom',
    label: 'bottom',
  },
];

export function VerticalAlign({
  attributeName = 'vertical-align',
}: {
  attributeName?: string;
}) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Stack>
        <SelectField
          style={{ width: 120 }}
          label={t('attributes.verticalAlign')}
          name={`${focusIdx}.attributes.${attributeName}`}
          options={options}
        />
      </Stack>
    );
  }, [attributeName, focusIdx, t]);
}

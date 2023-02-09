import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'top',
    label: t('top'),
  },
  {
    value: 'middle',
    label: t('middle'),
  },
  {
    value: 'bottom',
    label: t('bottom'),
  },
];

export function VerticalAlign({
  attributeName = 'vertical-align',
}: {
  attributeName?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack>
        <SelectField
          style={{ width: 120 }}
          label={t('Vertical align')}
          name={`${focusIdx}.attributes.${attributeName}`}
          options={options}
        />
      </Stack>
    );
  }, [attributeName, focusIdx]);
}

import React, { useMemo } from 'react';
import { NumberField, TextField } from '../../../components/Form';
import { useFocusIdx, Stack, TextStyle } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Decoration() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle variation='strong' size='large'>
          {t('attributes.decoration')}
        </TextStyle>
        <TextField
          label={t('attributes.borderRadius')}
          name={`${focusIdx}.attributes.borderRadius`}
          inline
        />
        <TextField
          label={t('attributes.border')}
          name={`${focusIdx}.attributes.border`}
          inline
          alignment='center'
        />
        <NumberField
          label={t('attributes.opacity')}
          max={1}
          min={0}
          step={0.1}
          name={`${focusIdx}.attributes.opacity`}
          inline
          alignment='center'
        />
      </Stack>
    );
  }, [focusIdx, t]);
}

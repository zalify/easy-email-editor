import React, { useMemo } from 'react';
import { InputWithUnitField, TextField } from '../../../components/Form';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { Grid, Space } from '@arco-design/web-react';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Border() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField label={t('attributes.border')} name={`${focusIdx}.attributes.border`} />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <InputWithUnitField
            label={t('attributes.borderRadius')}
            name={`${focusIdx}.attributes.border-radius`}
            unitOptions='percent'
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [focusIdx, t]);
}

import React, { useMemo } from 'react';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { IconLink } from '@arco-design/web-react/icon';
import { SelectField, TextField } from '../../../components/Form';
import { Grid } from '@arco-design/web-react';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Link() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Grid.Row>
        <Grid.Col span={11}>
          <TextField
            prefix={<IconLink />}
            label={<span>{t('attributes.href')}&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.attributes.href`}
          />
        </Grid.Col>
        <Grid.Col offset={1} span={11}>
          <SelectField
            label={t('attributes.target')}
            name={`${focusIdx}.attributes.target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
          />
        </Grid.Col>
      </Grid.Row>
    );
  }, [focusIdx, t]);
}

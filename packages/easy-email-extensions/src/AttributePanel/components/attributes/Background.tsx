import React, { useContext, useMemo } from 'react';
import {
  ImageUploaderField,
  InputWithUnitField,
  SelectField,
  TextField,
} from '../../../components/Form';
import { Stack, useFocusIdx, useEditorProps } from 'easy-email-editor';
import { BackgroundColor } from './BackgroundColor';
import { Grid, Space } from '@arco-design/web-react';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Background() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      {
        value: 'no-repeat',
        label: t('attributes.noRepeat')
      },
      {
        value: 'repeat',
        label: t('attributes.repeat')
      },
      {
        value: 'repeat-x',
        label: t('attributes.repeatT')
      },
      {
        value: 'repeat-y',
        label: t('attributes.repeatY')
      },
    ];
  }, [t])

  return useMemo(() => {
    return (
      <Space key={focusIdx} direction='vertical'>
        <ImageUploaderField
          label={t('attributes.backgroundImage')}
          name={`${focusIdx}.attributes.background-url`}
          helpText={t('attributes.backgroundTextHelper')}
          uploadHandler={onUploadImage}
        />

        <Grid.Row>
          <Grid.Col span={11}>
            <BackgroundColor />
          </Grid.Col>
          <Grid.Col offset={1} span={11}>
            <SelectField
              label={t('attributes.backgroundRepeat')}
              name={`${focusIdx}.attributes.background-repeat`}
              options={options}
            />
          </Grid.Col>
        </Grid.Row>
        <TextField
          label={t('attributes.backgroundSize')}
          name={`${focusIdx}.attributes.background-size`}
        />
      </Space>
    );
  }, [focusIdx, onUploadImage, t]);
}

import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack, TextStyle } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Margin() {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle size='large'>{t('attributes.margin')}</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={t('attributes.top')}
              quickchange
              name={`${focusIdx}.attributes.marginTop`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={t('attributes.bottom')}
              quickchange
              name={`${focusIdx}.attributes.marginBottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={t('attributes.left')}
              quickchange
              name={`${focusIdx}.attributes.marginLeft`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={t('attributes.right')}
              quickchange
              name={`${focusIdx}.attributes.marginRight`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx, t]);
}

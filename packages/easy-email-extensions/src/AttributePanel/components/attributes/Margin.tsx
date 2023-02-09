import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack, TextStyle } from 'easy-email-editor';

export function Margin() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle size='large'>{t('Margin')}</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={t('Top')}
              quickchange
              name={`${focusIdx}.attributes.marginTop`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={t('Bottom')}
              quickchange
              name={`${focusIdx}.attributes.marginBottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label={t('Left')}
              quickchange
              name={`${focusIdx}.attributes.marginLeft`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label={t('Right')}
              quickchange
              name={`${focusIdx}.attributes.marginRight`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}

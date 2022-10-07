import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack } from 'easy-email-editor';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Height({ inline }: { inline?: boolean; }) {
  const { focusIdx } = useFocusIdx();
  const { t } = useTranslation();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label={t('attributes.height')}
            name={`${focusIdx}.attributes.height`}
            quickchange
            inline={inline}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline, t]);
}

import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { AutoCompleteField } from '@extensions/shared/form';
import { useFontFamily } from '@extensions/shared/hooks/useFontFamily';

export function FontFamily({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();
  const { fontList } = useFontFamily();

  return useMemo(() => {
    return (
      <AutoCompleteField
        style={{ minWidth: 100, flex: 1 }}
        showSearch
        label={t('Font family')}
        name={name || `${focusIdx}.attributes.font-family`}
        options={fontList}
      />
    );
  }, [focusIdx, fontList, name]);
}

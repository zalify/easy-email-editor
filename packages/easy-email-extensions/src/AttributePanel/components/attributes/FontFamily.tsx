import React, { useMemo } from 'react';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AutoCompleteField } from '../../../components/Form';

export function FontFamily() {
  const { fontList = [] } = useEditorProps();
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <AutoCompleteField
        style={{ minWidth: 100, flex: 1 }}
        showSearch
        label='Font family'
        name={`${focusIdx}.attributes.font-family`}
        options={fontList}
      />
    );
  }, [focusIdx, fontList]);
}

import React, { useContext, useMemo } from 'react';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { SelectField } from '@/components/core/Form';

export function FontFamily() {
  const { fontList = [] } = useContext(EditorPropsContext);
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        showSearch
        label='Font family'
        name={`${focusIdx}.attributes.font-family`}
        inline
        options={fontList}
      />
    );
  }, [focusIdx, fontList]);
}

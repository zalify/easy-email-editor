import React, { useMemo } from 'react';
import { ColorPickerField } from '@extensions/shared/form';
import { useFocusIdx } from 'easy-email-editor';

export function ContainerBackgroundColor({
  title = t('Container background color'),
}: {
  title?: string;
}) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <ColorPickerField
        label={title}
        name={`${focusIdx}.attributes.container-background-color`}
      />
    );
  }, [focusIdx, title]);
}

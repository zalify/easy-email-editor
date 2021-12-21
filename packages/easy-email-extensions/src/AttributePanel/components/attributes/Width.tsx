import React, { useCallback, useMemo } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx, useBlock } from 'easy-email-editor';
import { BasicType, getParentByIdx } from 'easy-email-core';
import { InputWithUnitProps } from '@extensions/components/Form/InputWithUnit';

export function Width({
  inline = false,
  unitOptions,
}: {
  inline?: boolean;
  unitOptions?: InputWithUnitProps['unitOptions'];
}) {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, values } = useBlock();
  const parentType = getParentByIdx(values, focusIdx)?.type;

  const validate = useCallback(
    (val: string): string | undefined => {
      if (
        focusBlock?.type === BasicType.COLUMN &&
        parentType === BasicType.GROUP
      ) {
        return /(\d)*%/.test(val)
          ? undefined
          : 'Column inside a group must have a width in percentage, not in pixel';
      }
      return undefined;
    },
    [focusBlock?.type, parentType]
  );

  return (
    <InputWithUnitField
      validate={validate}
      label='Width'
      inline={inline}
      name={`${focusIdx}.attributes.width`}
      unitOptions={unitOptions}
    />
  );
}

import React, { useCallback, useMemo } from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx, useBlock } from 'easy-email-editor';
import { BasicType, getParentByIdx } from 'easy-email-core';
import { InputWithUnitProps } from '@extensions/components/Form/InputWithUnit';
import { useTranslation } from '@extensions/hooks/useTranslation';

export function Width({
  inline = false,
  unitOptions,
}: {
  inline?: boolean;
  unitOptions?: InputWithUnitProps['unitOptions'];
}) {
  const { t } = useTranslation();
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
          : t('attributes.columnsMustBeInPercentage');
      }
      return undefined;
    },
    [focusBlock?.type, parentType, t]
  );

  return (
    <InputWithUnitField
      validate={validate}
      label={t('attributes.width')}
      inline={inline}
      name={`${focusIdx}.attributes.width`}
      unitOptions={unitOptions}
    />
  );
}

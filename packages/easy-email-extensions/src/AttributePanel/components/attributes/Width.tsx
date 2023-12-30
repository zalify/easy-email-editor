import React, { useCallback } from 'react';
import { InputWithUnitField, NumberField, TextField } from '../../../components/Form';
import { useFocusIdx, useBlock } from 'easy-email-editor';
import { BasicType, getParentByIdx } from 'easy-email-core';
import { InputWithUnitProps } from '@extensions/components/Form/InputWithUnit';
import { UseFieldConfig } from 'react-final-form';
import { pixelAdapter } from '../adapter';
import { percentAdapter } from '../adapter/percent.adapter';

export function Width({
  inline = false,
  unitOptions,
  config,
}: {
  inline?: boolean;
  unitOptions?: InputWithUnitProps['unitOptions'];
  config?: UseFieldConfig<any>;
}) {
  const { focusIdx } = useFocusIdx();
  const { focusBlock, values } = useBlock();
  const parentType = getParentByIdx(values, focusIdx)?.type;

  const validate = useCallback(
    (val: string): string | undefined => {
      if (focusBlock?.type === BasicType.COLUMN && parentType === BasicType.GROUP) {
        return /(\d)*%/.test(val)
          ? undefined
          : t('Column inside a group must have a width in percentage, not in pixel');
      }
      return undefined;
    },
    [focusBlock?.type, parentType],
  );

  return (
    <TextField
      autoComplete='off'
      // validate={validate}
      label='Width'
      suffix='%'
      config={percentAdapter}
      type='number'
      min={1}
      max={100}
      name={`${focusIdx}.attributes.width`}
    />
  );
}

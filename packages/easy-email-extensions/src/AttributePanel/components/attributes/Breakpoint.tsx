import { RangeSliderProps } from '@shopify/polaris';
import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { UseFieldConfig } from 'react-final-form';
import { RangeSliderField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function Breakpoint({
  suffix = 'px',
  min,
  max,
  helpText,
  label,
}: {
  config?: UseFieldConfig<any>;
} & Partial<RangeSliderProps>) {
  const { focusIdx } = useFocusIdx();
  // const { focusBlock, values } = useBlock();
  // const parentType = getParentByIdx(values, focusIdx)?.type;

  // const validate = useCallback(
  //   (val: string): string | undefined => {
  //     if (focusBlock?.type === BasicType.COLUMN && parentType === BasicType.GROUP) {
  //       return /(\d)*%/.test(val)
  //         ? undefined
  //         : t('Column inside a group must have a width in percentage, not in pixel');
  //     }
  //     return undefined;
  //   },
  //   [focusBlock?.type, parentType],
  // );

  // const configMemo = useMemo(() => {
  //   if (suffix === '%') {
  //     return percentAdapter;
  //   }
  //   if (suffix === 'px') {
  //     return pixelAdapter;
  //   }
  //   return undefined;
  // }, [suffix]);

  return (
    <RangeSliderField
      autoComplete='off'
      // validate={validate}
      label={label}
      suffix={suffix}
      config={pixelAdapter}
      // type='number'
      min={min}
      max={max}
      name={`${focusIdx}.data.value.breakpoint`}
      showTextField
      helpText={helpText}
    />
  );
}

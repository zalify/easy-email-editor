import {
  BlockStack,
  InlineStack,
  RadioButtonProps as PolarisRadioButtonProps,
  RadioButton,
} from '@shopify/polaris';
import React, { useCallback, useMemo } from 'react';

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export interface RadioGroupProps extends Omit<PolarisRadioButtonProps, 'onChange'> {
  options: Array<{ value: string; label: React.ReactNode }>;
  onChange: (value: string) => void;
  value?: string;
  type?: 'radio' | 'button';
  vertical?: boolean;
}

export const RadioGroup = (props: any) => {
  const handleChange = useCallback(
    (newChecked: boolean, id: string) => {
      if (newChecked) {
        props.onChange(id);
      }
    },
    [props],
  );

  const optionsMarkup = useMemo(() => {
    return props.options.map((option: { value: string }, index: number) => (
      <RadioButton
        key={index}
        label={capitalizeFirstLetter(option.value)}
        id={option.value}
        checked={option.value === props.value}
        onChange={handleChange}
      />
    ));
  }, [handleChange, props.options, props.value]);

  if (props.vertical) {
    return <BlockStack>{optionsMarkup}</BlockStack>;
  }
  return (
    <InlineStack
      gap='500'
      blockAlign='center'
    >
      {optionsMarkup}
    </InlineStack>
  );
};

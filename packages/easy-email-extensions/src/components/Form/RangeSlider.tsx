import React from 'react';
import {
  BlockStack,
  InlineStack,
  RangeSlider as PolarisRangeSlider,
  RangeSliderProps as PolarisRangeSliderProps,
  TextField,
} from '@shopify/polaris';

export type RangeSliderProps = Omit<PolarisRangeSliderProps, 'onChange'> & {
  showTextField?: boolean;
  name?: string;
  type?: string;
  onChange: (value: string) => void;
};

export const RangeSlider = ({
  name,
  suffix,
  type,
  output,
  showTextField = true,
  ...props
}: RangeSliderProps) => {
  if (showTextField) {
    return (
      <InlineStack
        wrap={false}
        blockAlign='center'
        gap='300'
      >
        <div
          style={{
            width: '70%',
          }}
        >
          <BlockStack align='center'>
            <PolarisRangeSlider
              {...props}
              output
            />
          </BlockStack>
        </div>

        <div
          style={{
            width: '30%',
          }}
        >
          <TextField
            name={name}
            suffix={suffix}
            type={type}
            {...props}
          />
        </div>
      </InlineStack>
    );
  }

  return (
    <PolarisRangeSlider
      {...props}
      output
      suffix={suffix}
    />
  );
};

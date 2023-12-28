import React, { useMemo } from 'react';
import { BlockStack, InlineStack, RadioButton } from '@shopify/polaris';
import { RadioGroupProps } from './RadioGroup';

// export function RadioGroup(props: RadioGroupProps) {
//   const { type, vertical, ...rest } = props;
//   return (
//     <Radio.Group
//       {...rest}
//       style={merge({ width: '100%' }, rest.style)}
//       value={rest.value}
//       onChange={rest.onChange}
//     >
//       <Stack
//         vertical={vertical}
//         spacing='extraTight'
//       >
//         {rest.options.map((item, index) => (
//           <Radio
//             key={index}
//             value={item.value}
//           >
//             {item.label}
//           </Radio>
//         ))}
//       </Stack>
//     </Radio.Group>
//   );
// }
export const RadioGroup = (props: RadioGroupProps) => {
  console.log({ options: props.options });
  const optionsMarkup = useMemo(() => {
    return props.options.map((item, index) => (
      <RadioButton
        key={item.value}
        label={props?.label}
        helpText={props?.helpText}
        checked={props.value === item.value}
        onChange={props.onChange}
      >
        {item.value}
      </RadioButton>
    ));
  }, [props.helpText, props?.label, props.onChange, props.options, props.value]);

  if (props.vertical) {
    return <BlockStack>{optionsMarkup}</BlockStack>;
  }
  return <InlineStack align='space-between'>{optionsMarkup}</InlineStack>;
};

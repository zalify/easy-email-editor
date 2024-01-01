import { Button, ButtonGroup } from '@shopify/polaris';
import {
  TextAlignmentCenterMajor,
  TextAlignmentLeftMajor,
  TextAlignmentRightMajor,
} from '@shopify/polaris-icons';
import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { enhancer } from '../../../components/Form';

// const options = [
//   {
//     value: 'left',
//     get label() {
//       return t('left');
//     },
//   },
//   {
//     value: 'center',
//     get label() {
//       return t('center');
//     },
//   },
//   {
//     value: 'right',
//     get label() {
//       return t('right');
//     },
//   },
// ];

// export function Align({
//   inline,
//   align,
// }: {
//   inline?: boolean;
//   align?: 'space-between' | 'center';
// }) {
//   const { focusIdx } = useFocusIdx();

//   return (
//     <RadioGroupField
//       label={t('Align')}
//       name={`${focusIdx}.attributes.align`}
//       options={options}
//       align={align}
//     />
//   );
// }

type TextAlignProps = {
  onChange: (value: 'left' | 'center' | 'right') => void;
  name: string;
  value: 'left' | 'center' | 'right';
};

const TextAlign = ({ onChange, value }: TextAlignProps) => {
  return (
    <ButtonGroup
      noWrap
      fullWidth
    >
      <Button
        icon={TextAlignmentLeftMajor}
        pressed={value === 'left'}
        onClick={() => onChange('left')}
      />
      <Button
        icon={TextAlignmentCenterMajor}
        pressed={value === 'center'}
        onClick={() => onChange('center')}
      />
      <Button
        icon={TextAlignmentRightMajor}
        pressed={value === 'right'}
        onClick={() => onChange('right')}
      />
    </ButtonGroup>
  );
};

const WrapperTextAlign = enhancer<TextAlignProps>(TextAlign, v => v);

export const Align = () => {
  const { focusIdx } = useFocusIdx();
  return (
    <WrapperTextAlign
      name={`${focusIdx}.attributes.align`}
      label='Alignment'
    />
  );
};

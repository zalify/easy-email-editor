import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';

import { Padding } from '../../attributes/Padding';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { TextAreaField } from '../../../../components/Form';
import { FontSize } from '../../attributes/FontSize';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamliy';
import { LineHeight } from '../../attributes/LineHeight';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';

export function AccordionText() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <Stack vertical>
        <TextAreaField
          label='Content'
          name={`${focusIdx}.data.value.content`}
          inline
        />
        <Color />
        <FontSize />
        <LineHeight />
        <FontWeight />
        <FontFamily />
        <BackgroundColor />
        <Padding title='Padding' attributeName='padding' />
      </Stack>
    </AttributesPanelWrapper>
  );
}

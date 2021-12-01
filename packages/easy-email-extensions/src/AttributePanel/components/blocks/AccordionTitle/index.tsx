import React from 'react';
import { Padding } from '../../attributes/Padding';

import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { TextAreaField } from '../../../../components/Form';
import { FontSize } from '../../attributes/FontSize';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { Stack, useFocusIdx } from 'easy-email-editor';

export function AccordionTitle() {
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
        <BackgroundColor />
        <FontSize />
        <FontWeight />
        <FontFamily />
        <Padding title='Padding' attributeName='padding' />
      </Stack>
    </AttributesPanelWrapper>
  );
}

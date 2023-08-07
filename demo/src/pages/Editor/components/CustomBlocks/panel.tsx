import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, ColorPickerField } from 'easy-email-extensions';
import React from 'react';

export function Panel(props: any) {
  const { focusIdx } = useFocusIdx();

  const attributes = [
    {
      fieldName: 'ColorPickerField',
      label: 'Background color',
      name:'`${focusIdx}.attributes.background-color`',
      css:'inline'
    },
    {
      fieldName: 'TextField',
      label: 'Title',
      name:'`${focusIdx}.data.value.content`',
      css:'inline'
    },
  ];

  return(
    attributes.map((attribute: any, index: number) => {
      if(attribute.fieldName = 'ColorPickerField'){
        return (
          <AttributesPanelWrapper style={{ padding: '20px' }}>
            <Stack vertical>
             <ColorPickerField
             name={attribute.name}
             label={attribute.label}
             key={index}
             ></ColorPickerField>
            </Stack>
          </AttributesPanelWrapper>
        );
      }

    })
  )
}

import React, { useContext } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ColorPickerField,
  ImageUploaderField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from '@arco-design/web-react';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Item name='1' header='Setting'>
          <Stack vertical spacing='tight'>
            <ImageUploaderField
              label='src'
              name={`${focusIdx}.attributes.src`}
              helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
              uploadHandler={onUploadImage}
              inline
            />
            <ColorPickerField
              label='Background color'
              name={`${focusIdx}.attributes.container-background-color`}
              inline
              alignment='center'
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Stack wrap={false}>
              <Stack.Item fill>
                <Width />
              </Stack.Item>
              <Stack.Item fill>
                <Height />
              </Stack.Item>
            </Stack>
            <Padding />
            <Align />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='2' header='Link'>
          <Stack vertical spacing='tight'>
            <Link />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='3' header='Border'>
          <Border />
        </Collapse.Item>

        <Collapse.Item name='4' header='Extra'>
          <TextField
            label='title'
            name={`${focusIdx}.attributes.title`}
            inline
          />
          <TextField label='alt' name={`${focusIdx}.attributes.alt`} inline />
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

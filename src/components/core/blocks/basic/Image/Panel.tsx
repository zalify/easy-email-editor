import React, { useContext } from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import {
  ColorPickerField,
  ImageUploaderField,
  TextField,
} from '@/components/core/Form';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { Link } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Link';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { Border } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Border';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useContext(EditorPropsContext);

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2', '3', '4']}>

        <Collapse.Panel key="1" header="Setting">
          <Stack vertical spacing="tight">
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
        </Collapse.Panel>

        <Collapse.Panel key="0" header="Dimension">
          <Stack vertical spacing="tight">
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

        </Collapse.Panel>

        <Collapse.Panel key="2" header="Link">
          <Stack vertical spacing="tight">
            <Link />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key="3" header="Border">
          <Border />
        </Collapse.Panel>

        <Collapse.Panel key="4" header="Extra">
          <TextField label='title' name={`${focusIdx}.attributes.title`} inline />
          <TextField label='alt' name={`${focusIdx}.attributes.alt`} inline />
        </Collapse.Panel>

      </Collapse>

    </AttributesPanelWrapper>
  );
}

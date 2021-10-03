import React from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import { TextAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { Border } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Border';
import { BackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import { Color } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { Link } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Link';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { FontSize } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontWeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { TextDecoration } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { LineHeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { LetterSpacing } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LetterSpacing';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { TextField } from '@/components/core/Form';

export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Panel key='-1' header='Setting'>
          <Stack vertical>
            <TextField
              label='Content'
              name={`${focusIdx}.data.value.content`}
              inline
            />
            <Link />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Stack vertical>
              <Width />
              <Padding title='Padding' attributeName='padding' />
              <Padding title='Inner padding' attributeName='inner-padding' />
            </Stack>
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='1' header='Color'>
          <Stack vertical spacing='tight'>
            <Color title='Text color' />
            <BackgroundColor title='Button color' />
            <ContainerBackgroundColor title='Background color' />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='2' header='Typography'>
          <Stack vertical spacing='tight'>
            <Stack wrap={false}>
              <FontFamily />
              <Stack.Item fill>
                <FontSize />
              </Stack.Item>
            </Stack>

            <Stack wrap={false}>
              <FontWeight />
              <Stack.Item fill>
                <LineHeight />
              </Stack.Item>
            </Stack>

            <Stack wrap={false}>
              <TextDecoration />
              <Stack.Item fill>
                <LetterSpacing />
              </Stack.Item>
            </Stack>

            <Align />

            <FontStyle />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='3' header='Border'>
          <Border />
        </Collapse.Panel>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

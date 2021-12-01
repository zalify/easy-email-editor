import React from 'react';
import { Padding } from '../../attributes/Padding';
import { Border } from '../../attributes/Border';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { Link } from '../../attributes/Link';
import { Width } from '../../attributes/Width';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { Align } from '../../attributes/Align';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { TextDecoration } from '../../attributes/TextDecoration';
import { LineHeight } from '../../attributes/LineHeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';
import { Collapse } from '@arco-design/web-react';
import { TextField } from '../../../../components/Form';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';

export function Button() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item name='-1' header='Setting'>
          <Stack vertical>
            <TextField
              label='Content'
              name={`${focusIdx}.data.value.content`}
              inline
            />
            <Link />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Stack vertical>
              <Width />
              <Padding title='Padding' attributeName='padding' />
              <Padding title='Inner padding' attributeName='inner-padding' />
            </Stack>
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='1' header='Color'>
          <Stack vertical spacing='tight'>
            <Color title='Text color' />
            <BackgroundColor title='Button color' />
            <ContainerBackgroundColor title='Background color' />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='2' header='Typography'>
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
        </Collapse.Item>

        <Collapse.Item name='3' header='Border'>
          <Border />
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

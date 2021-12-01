import React, { useState } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { LetterSpacing } from '@extensions/AttributePanel/components/attributes/LetterSpacing';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Tooltip } from '@arco-design/web-react';
import { Button } from '@arco-design/web-react';
import { IconFont, Stack } from 'easy-email-editor';
import { HtmlEditor } from '../../UI/HtmlEditor';

export function Text() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={
        <Tooltip content='Html mode'>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName='icon-html' />}
          />
        </Tooltip>
      }
    >
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Height inline />
            <Padding />
          </Stack>
        </Collapse.Item>
        <Collapse.Item name='1' header='Color'>
          <Stack vertical spacing='tight'>
            <Color />
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
      </Collapse>
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}

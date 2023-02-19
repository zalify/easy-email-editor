import { AttributesPanelWrapper } from '@extensions/AttributePanel';
import { Collapse, Tooltip, Button } from '@arco-design/web-react';
import { IconFont, Stack } from 'easy-email-editor';
import React, { useState } from 'react';
import { Border } from '../../attributes/Border';
import { Color } from '../../attributes/Color';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { FontFamily } from '../../attributes/FontFamily';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { Padding } from '../../attributes/Padding';
import { TextAlign } from '../../attributes/TextAlign';
import { Width } from '../../attributes/Width';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';

export function Table() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={(
        <Tooltip content={t('Edit')}>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName='icon-html' />}
          />
        </Tooltip>
      )}
    >
      <CollapseWrapper defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item name='1' header={t('Dimension')}>
          <Stack>
            <Width />
            <Stack.Item />
          </Stack>
          <Stack vertical>
            <Padding />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='2' header={t('Decoration')}>
          <Color />
          <ContainerBackgroundColor />
          <Border />
        </Collapse.Item>

        <Collapse.Item name='2' header={t('Typography')}>
          <Stack>
            <FontFamily />
            <FontSize />
          </Stack>
          <FontStyle />
          <TextAlign />
        </Collapse.Item>
      </CollapseWrapper>
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}

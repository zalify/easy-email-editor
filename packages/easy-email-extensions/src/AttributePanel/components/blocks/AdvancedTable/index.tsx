import { AttributesPanelWrapper } from '@extensions/AttributePanel';
import { Collapse, Tooltip, Button } from '@arco-design/web-react';
import { IconFont, Stack, useFocusIdx } from 'easy-email-editor';
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
import {
  ColorPickerField,
  InputWithUnitField,
  NumberField,
  TextField,
} from '@extensions';
import { pixelAdapter } from '../../adapter';

export function AdvancedTable() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['-1', '0', '1', '2', '3']}>
        <Collapse.Item
          name='1'
          header={t('Dimension')}
        >
          <Stack>
            <Width />
            <Stack.Item />
          </Stack>
          <Stack vertical>
            <Padding />
          </Stack>
          <NumberField
            label='Cell padding (px)'
            name={`${focusIdx}.attributes.cellPadding`}
            config={pixelAdapter}
            max={20}
            min={0}
            step={1}
          />
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header={t('Decoration')}
        >
          <Color />
          <ContainerBackgroundColor />
          <TextField
            label='Table border'
            name={`${focusIdx}.attributes.border`}
          />
          <ColorPickerField
            label='Cell border color'
            name={`${focusIdx}.attributes.cellBorderColor`}
          />
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header={t('Typography')}
        >
          <FontFamily />
          <FontSize />
          <InputWithUnitField
            label={t('Line height')}
            unitOptions='percent'
            name={`${focusIdx}.attributes.line-height`}
          />
          <FontStyle />
          <TextAlign />
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}

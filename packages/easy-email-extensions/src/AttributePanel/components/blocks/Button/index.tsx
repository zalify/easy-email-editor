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
import {
  Collapse,
  Grid,
  Popover,
  Space,
  Button as ArcoButton,
} from '@arco-design/web-react';
import { TextField } from '../../../../components/Form';
import { IconFont, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { MergeTags } from '../../attributes';
import { useField } from 'react-final-form';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import Collapsible from '../../UI/Collapsible';
import { BlockStack, InlineGrid } from '@shopify/polaris';

export function Button() {
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: v => v,
  });

  const { mergeTags } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <Collapsible title='Setting'>
        <Space direction='vertical'>
          <TextField
            label='Content'
            name={`${focusIdx}.data.value.content`}
          />
          <Link />
        </Space>
      </Collapsible>

      <Collapsible title='Dimension'>
        <BlockStack gap='300'>
          <InlineGrid
            columns={2}
            gap='300'
          >
            <Width />
            <FontWeight />
          </InlineGrid>

          <Padding
            title={t('Padding')}
            attributeName='padding'
            showResetAll
          />
          <Padding
            title={t('Inner padding')}
            attributeName='inner-padding'
          />
        </BlockStack>
      </Collapsible>

      <Collapsible title='Color'>
        <BlockStack gap='300'>
          <InlineGrid
            columns={2}
            gap='300'
          >
            <Color title={t('Text color')} />
            <BackgroundColor title={t('Button color')} />
            <ContainerBackgroundColor title={t('Background color')} />
          </InlineGrid>
        </BlockStack>
      </Collapsible>

      <Collapsible title='Typography'>
        <BlockStack gap='300'>
          <InlineGrid
            gap='300'
            columns={2}
          >
            <FontFamily />
            <FontSize />
            <FontWeight />
            <LineHeight />
            <TextDecoration />
            <LetterSpacing />
          </InlineGrid>
          <Align align='space-between' />
          <FontStyle gap='1000' />
        </BlockStack>
      </Collapsible>

      <Collapsible title='Border'>
        <Border />
      </Collapsible>
      {/* <Collapse.Item
        name='4'
        header={t('Extra')}
      >
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </Collapse.Item> */}
    </AttributesPanelWrapper>
  );
}

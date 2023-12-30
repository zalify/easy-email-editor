import { Space } from '@arco-design/web-react';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { useField } from 'react-final-form';
import { TextField } from '../../../../components/Form';
import Collapsible from '../../UI/Collapsible';
import { Align } from '../../attributes/Align';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Border } from '../../attributes/Border';
import { Color } from '../../attributes/Color';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { FontFamily } from '../../attributes/FontFamily';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { FontWeight } from '../../attributes/FontWeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';
import { LineHeight } from '../../attributes/LineHeight';
import { Link } from '../../attributes/Link';
import { Padding } from '../../attributes/Padding';
import { TextDecoration } from '../../attributes/TextDecoration';
import { Width } from '../../attributes/Width';

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
            autoComplete='off'
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

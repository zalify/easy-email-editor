import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { LetterSpacing } from '@extensions/AttributePanel/components/attributes/LetterSpacing';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import React from 'react';
import Collapsible from '../../UI/Collapsible';

export function Text() {
  return (
    <AttributesPanelWrapper hiddenTitle>
      <Collapsible title='Dimension'>
        <BlockStack gap='200'>
          <Height />
          <Padding showResetAll />
        </BlockStack>
      </Collapsible>
      <Collapsible title='Color'>
        <InlineGrid
          gap='300'
          columns={2}
        >
          <Color />
          <ContainerBackgroundColor title={t('Background color')} />
        </InlineGrid>
      </Collapsible>
      <Collapsible title='Typography'>
        <BlockStack gap='300'>
          <LineHeight />
          <LetterSpacing />
          <TextDecoration />
          <FontWeight />
          <Align />
          <FontStyle gap='1000' />
        </BlockStack>
      </Collapsible>
      {/* <Collapse.Item
        name='4'
        header={t('Extra')}
      >
        <Grid.Col span={24}>
          <ClassName />
        </Grid.Col>
      </Collapse.Item>
      <HtmlEditor
        visible={visible}
        setVisible={setVisible}
      /> */}
    </AttributesPanelWrapper>
  );
}

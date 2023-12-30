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
import { Collapse, Grid, Space, Tooltip, Button } from '@arco-design/web-react';
import { IconFont } from 'easy-email-editor';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import Collapsible from '../../UI/Collapsible';

export function Text() {
  const [visible, setVisible] = useState(false);

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
          <InlineGrid
            columns={2}
            gap='300'
          >
            <LineHeight />
            <LetterSpacing />
            <TextDecoration />
            <FontWeight />
          </InlineGrid>
          <Align align='space-between' />
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

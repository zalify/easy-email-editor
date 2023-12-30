import React from 'react';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import {
  ImageUploaderField,
  InputWithUnitField,
  RadioGroupField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import Collapsible from '../../UI/Collapsible';

const options = [
  {
    value: 'fluid-height',
    get label() {
      return t('Fluid height');
    },
  },
  {
    value: 'fixed-height',
    get label() {
      return t('Fixed height');
    },
  },
];

export function Hero() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <Collapsible title='Dimension'>
        <BlockStack gap='300'>
          <RadioGroupField
            label={t('Mode')}
            name={`${focusIdx}.attributes.mode`}
            options={options}
          />
          <InlineGrid
            gap='300'
            columns={2}
          >
            <Width />
            <Height />
          </InlineGrid>

          <Padding />
          {/* <VerticalAlign /> */}
        </BlockStack>
      </Collapsible>
      <Collapsible title='Background'>
        <BlockStack gap='300'>
          <ImageUploaderField
            label='Source'
            name={`${focusIdx}.attributes.background-url`}
            helpText={t(
              'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
            )}
            uploadHandler={onUploadImage}
          />

          <InlineGrid
            columns={2}
            gap='300'
          >
            <InputWithUnitField
              label={t('Background width')}
              name={`${focusIdx}.attributes.background-width`}
            />

            <InputWithUnitField
              label={t('Background height')}
              name={`${focusIdx}.attributes.background-height`}
            />
          </InlineGrid>

          <Grid.Row>
            <InlineGrid
              columns={2}
              gap='300'
            >
              <TextField
                label={t('Background position')}
                name={`${focusIdx}.attributes.background-position`}
                autoComplete='off'
              />

              <InputWithUnitField
                label={t('Border radius')}
                name={`${focusIdx}.attributes.border-radius`}
                unitOptions='percent'
              />
              <BackgroundColor title='Color' />
            </InlineGrid>
          </Grid.Row>
        </BlockStack>
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

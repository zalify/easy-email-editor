import React from 'react';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { ColorPickerField, ImageUploaderField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import Collapsible from '../../UI/Collapsible';
import { imageHeightAdapter, pixelAdapter } from '../../adapter';

const fullWidthOnMobileAdapter = {
  format(obj: any) {
    return Boolean(obj);
  },
  parse(val: string) {
    if (!val) return undefined;

    return 'true';
  },
};

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapsible title='Setting'>
        <BlockStack gap='300'>
          <ImageUploaderField
            label={t('src')}
            labelHidden
            name={`${focusIdx}.attributes.src`}
            helpText={t(
              'The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.',
            )}
            uploadHandler={onUploadImage}
          />
          <ColorPickerField
            label={t('Background color')}
            name={`${focusIdx}.attributes.container-background-color`}
          />
          {/* <SwitchField
              label={t('Full width on mobile')}
              name={`${focusIdx}.attributes.fluid-on-mobile`}
              config={fullWidthOnMobileAdapter}
            /> */}
        </BlockStack>
      </Collapsible>

      <Collapsible title='Dimension'>
        <BlockStack gap='200'>
          <Width
            config={pixelAdapter}
            suffix='px'
          />
          {/* <Height /> */}
          <Padding showResetAll />
          <Align align='space-between' />
        </BlockStack>
      </Collapsible>

      <Collapsible title='Link'>
        <Link />
      </Collapsible>

      {/* <Collapsible title='Border'>
        <Border />
      </Collapsible> */}

      {/* <Collapse.Item
        name='4'
        header={t('Extra')}
      >
        <Grid.Row>
          <Grid.Col span={11}>
            <TextField
              label={t('title')}
              name={`${focusIdx}.attributes.title`}
            />
          </Grid.Col>
          <Grid.Col
            offset={1}
            span={11}
          >
            <TextField
              label={t('alt')}
              name={`${focusIdx}.attributes.alt`}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Col span={24}>
          <TextField
            label={t('class name')}
            name={`${focusIdx}.attributes.css-class`}
          />
        </Grid.Col>
      </Collapse.Item> */}
    </AttributesPanelWrapper>
  );
}

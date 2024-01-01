import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import {
  ColorPickerField,
  TextField
} from '@extensions/components/Form';
import { BlockStack, InlineGrid } from '@shopify/polaris';
import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import Collapsible from '../../UI/Collapsible';
import { FontSize, FontWeight, LineHeight, Width } from '../../attributes';
import { Breakpoint } from '../../attributes/Breakpoint';
import { FontFamily } from '../../attributes/FontFamily';

interface PageProps {
  hideSubTitle?: boolean;
  hideSubject?: boolean;
}
export function Page({ hideSubTitle, hideSubject }: PageProps) {
  const { focusIdx } = useFocusIdx();
  if (!focusIdx) return null;

  return (
    <AttributesPanelWrapper hiddenTitle>
      <BlockStack>
        <Collapsible title='Page setting'>
          <BlockStack gap='100'>
            <TextField
              label='Subject'
              name='subject'
              autoComplete='off'
            />
            <TextField
              label='Subtitle'
              name='subTitle'
              autoComplete='off'
              multiline={5}
              maxHeight={120}
            />
            <Width
              suffix='px'
              min={100}
              max={800}
            />
            <Breakpoint
              label='Breakpoint'
              min={100}
              max={800}
            />
          </BlockStack>
        </Collapsible>

        <Collapsible title='Theme setting'>
          <BlockStack gap='100'>
            <FontFamily name={`${focusIdx}.data.value.font-family`} />
            <FontSize />
            <LineHeight />
            <FontWeight />
            <InlineGrid
              gap='300'
              columns={2}
            >
              <ColorPickerField
                label={t('Text color')}
                name={`${focusIdx}.data.value.text-color`}
              />

              <ColorPickerField
                label={t('Background')}
                name={`${focusIdx}.attributes.background-color`}
              />
              <ColorPickerField
                label={t('Content background')}
                name={`${focusIdx}.data.value.content-background-color`}
              />
            </InlineGrid>
          </BlockStack>
        </Collapsible>
      </BlockStack>
    </AttributesPanelWrapper>
  );
}

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import {
  ColorPickerField,
  InputWithUnitField,
  NumberField,
  TextField,
} from '@extensions/components/Form';
import { BlockStack, Box, InlineGrid } from '@shopify/polaris';
import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { pixelAdapter } from '../../adapter';
import { FontFamily } from '../../attributes/FontFamily';
import Collapsible from '../../UI/Collapsible';

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
            {!hideSubject && (
              <TextField
                label={t('Subject')}
                name={'subject'}
                autoComplete='off'
              />
            )}
            {!hideSubTitle && (
              <TextField
                label={t('SubTitle')}
                name={'subTitle'}
                autoComplete='off'
                multiline={5}
                maxHeight={120}
              />
            )}
            <NumberField
              label={t('Width')}
              name={`${focusIdx}.attributes.width`}
              config={pixelAdapter}
              suffix='px'
            />
            <NumberField
              label={t('Breakpoint')}
              config={pixelAdapter}
              suffix='px'
              helpText={t(
                'Allows you to control on which breakpoint the layout should go desktop/mobile.',
              )}
              name={`${focusIdx}.data.value.breakpoint`}
            />
          </BlockStack>
        </Collapsible>

        <Collapsible title='Theme setting'>
          <BlockStack gap='100'>
            <InlineGrid
              columns={2}
              gap='300'
            >
              <FontFamily name={`${focusIdx}.data.value.font-family`} />

              <NumberField
                label='Font size (px)'
                name={`${focusIdx}.data.value.font-size`}
                config={pixelAdapter}
                autoComplete='off'
              />
            </InlineGrid>

            <InlineGrid
              columns={2}
              gap='300'
            >
              <InputWithUnitField
                label={t('Line height')}
                unitOptions='percent'
                name={`${focusIdx}.data.value.line-height`}
              />

              <InputWithUnitField
                label={t('Font weight')}
                unitOptions='percent'
                name={`${focusIdx}.data.value.font-weight`}
              />
            </InlineGrid>

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
            </InlineGrid>

            <ColorPickerField
              label={t('Content background')}
              name={`${focusIdx}.data.value.content-background-color`}
            />

            {/* <TextAreaField
              multiline={4}
              maxHeight={120}
              label={t('User style')}
              name={`${focusIdx}.data.value.user-style.content`}
            /> */}
            {/* <AddFont /> */}
          </BlockStack>
        </Collapsible>
      </BlockStack>
    </AttributesPanelWrapper>
  );
}

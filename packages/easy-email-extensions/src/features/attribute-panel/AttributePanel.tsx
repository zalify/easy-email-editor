import React from 'react';
import {
  getShadowRoot,
  TextStyle,
  useBlock,
  useEditorContext,
  useFocusIdx,
} from 'easy-email-editor';
import { RichTextField } from '@extensions/shared/form/RichTextField';
import { PresetColorsProvider } from '@extensions/features/attribute-panel/provider/PresetColorsProvider';
import ReactDOM from 'react-dom';
import { BlockAttributeConfigurationManager } from '@extensions/features/attribute-panel/utils/BlockAttributeConfigurationManager';
import { SelectionRangeProvider } from '@extensions/features/attribute-panel/provider/SelectionRangeProvider';
import { TableOperation } from '@extensions/features/attribute-panel/components/advanced-table-operation';

export interface AttributePanelProps {}

export function AttributePanel() {
  const { values, focusBlock } = useBlock();
  const { initialized } = useEditorContext();

  const { focusIdx } = useFocusIdx();

  const Com = focusBlock && BlockAttributeConfigurationManager.get(focusBlock.type);

  const shadowRoot = getShadowRoot();

  if (!initialized) return null;

  return (
    <SelectionRangeProvider>
      <PresetColorsProvider>
        {Com ? (
          <Com key={focusIdx} />
        ) : (
          <div style={{ marginTop: 200, padding: '0 50px' }}>
            <TextStyle size='extraLarge'>{t('No matching components')}</TextStyle>
          </div>
        )}

        <div style={{ position: 'absolute' }}>
          <RichTextField idx={focusIdx} />
        </div>
        <TableOperation />
        <>
          {shadowRoot &&
            ReactDOM.createPortal(
              <style>
                {`
              .email-block [contentEditable="true"],
              .email-block [contentEditable="true"] * {
                outline: none;
                cursor: text;
              }
              `}
              </style>,
              shadowRoot as any,
            )}
        </>
      </PresetColorsProvider>
    </SelectionRangeProvider>
  );
}

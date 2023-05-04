import React from 'react';
import {
  getShadowRoot,
  TextStyle,
  useBlock,
  useEditorContext,
  useFocusIdx,
} from 'easy-email-editor';
import { RichTextField } from '../components/Form/RichTextField';
import { PresetColorsProvider } from './components/provider/PresetColorsProvider';
import ReactDOM from 'react-dom';
import { BlockAttributeConfigurationManager } from './utils/BlockAttributeConfigurationManager';
import { SelectionRangeProvider } from './components/provider/SelectionRangeProvider';

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

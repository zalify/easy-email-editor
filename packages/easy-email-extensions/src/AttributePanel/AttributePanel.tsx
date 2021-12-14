import React from 'react';
import {
  getShadowRoot,
  TextStyle,
  useBlock,
  useEditorContext,
  useFocusIdx,
} from 'easy-email-editor';
import { getValueByIdx } from 'easy-email-core';
import { RichTextField } from '../components/Form/RichTextField';
import { PresetColorsProvider } from './components/provider/PresetColorsProvider';
import ReactDOM from 'react-dom';
import { BlockAttributeConfigurationManager } from './utils/BlockAttributeConfigurationManager';

export interface AttributePanelProps { }

export function AttributePanel() {
  const { values, focusBlock } = useBlock();
  const { initialized } = useEditorContext();

  const { focusIdx } = useFocusIdx();

  const value = getValueByIdx(values, focusIdx);

  const Com =
    focusBlock && BlockAttributeConfigurationManager.get(focusBlock.type);

  const shadowRoot = getShadowRoot();

  if (!value || !initialized) return null;

  return (
    <PresetColorsProvider>
      {Com ? (
        <Com />
      ) : (
        <div style={{ marginTop: 200, padding: '0 50px' }}>
          <TextStyle size='extraLarge'>No matching components</TextStyle>
        </div>
      )}

      <div style={{ position: 'absolute' }}>
        <RichTextField idx={focusIdx} />
      </div>
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
          shadowRoot as any
        )}
    </PresetColorsProvider>
  );
}

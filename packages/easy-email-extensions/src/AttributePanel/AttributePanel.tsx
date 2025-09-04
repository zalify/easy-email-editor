import React, { useEffect } from 'react';
import {
  getShadowRoot,
  TextStyle,
  useBlock,
  useEditorContext,
  useFocusIdx,
} from '@jupitermail/easy-email-editor';
import { RichTextField } from '../components/Form/RichTextField';
import { PresetColorsProvider } from './components/provider/PresetColorsProvider';
import ReactDOM from 'react-dom';
import { BlockAttributeConfigurationManager } from './utils/BlockAttributeConfigurationManager';
import { SelectionRangeProvider } from './components/provider/SelectionRangeProvider';
import { TableOperation } from './components/blocks/AdvancedTable/Operation';

export interface AttributePanelProps { }

export function AttributePanel() {
  const { values, focusBlock } = useBlock();
  const { initialized } = useEditorContext();
  const { focusIdx } = useFocusIdx();

  const Com = focusBlock && BlockAttributeConfigurationManager.get(focusBlock.type);
  const shadowRoot = getShadowRoot();

  if (!initialized) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!shadowRoot) return;

    const editables = shadowRoot.querySelectorAll<HTMLDivElement>(
      '.email-block [contentEditable="true"]'
    );

    editables.forEach((editable) => {
      const text = editable.textContent || '';

      const hasPersian = /[\u0600-\u06FF]/.test(text);

      if (hasPersian) {
        editable.setAttribute('lang', 'fa');
        editable.setAttribute('dir', 'rtl');
        editable.setAttribute('data-rtl', 'true');
      } else {
        editable.setAttribute('lang', 'en');
        editable.setAttribute('dir', 'ltr');
        editable.removeAttribute('data-rtl');
      }
    });
  }, [shadowRoot, focusIdx, values]);

  return (
    <SelectionRangeProvider>
      <PresetColorsProvider>
        {Com ? (
          <Com key={focusIdx} />
        ) : (
          <div style={{ marginTop: 200, padding: '0 50px' }}>
            <TextStyle size="extraLarge">{t('No matching components')}</TextStyle>
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

                /* RTL */
                .email-block [contentEditable="true"][data-rtl="true"],
                .email-block [contentEditable="true"][data-rtl="true"] * {
                  direction: rtl !important;
                  text-align: right !important;
                }

                .email-block [contentEditable="true"][data-rtl="true"] ul,
                .email-block [contentEditable="true"][data-rtl="true"] ol {
                  direction: rtl !important;
                  text-align: right !important;
                  padding-right: 2rem !important;
                  padding-left: 0 !important;
                  list-style-position: inside !important;
                }

                /* LTR (default) */
                .email-block [contentEditable="true"]:not([data-rtl="true"]),
                .email-block [contentEditable="true"]:not([data-rtl="true"]) * {
                  direction: ltr !important;
                  text-align: left !important;
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

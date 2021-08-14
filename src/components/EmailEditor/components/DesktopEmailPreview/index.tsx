import { IframeComponent } from '@/components/UI/IframeComponent';
import { useEditorContext } from '@/hooks/useEditorContext';
import React from 'react';
import { PreviewEmail } from '../PreviewEmail';

export function DesktopEmailPreview() {
  const { pageData } = useEditorContext();
  const pageMaxWidth = pageData.attributes.width || '600px';
  return (
    <div
      style={{
        width: pageMaxWidth,
        padding: '40px 0px',
        margin: 'auto',
        height: '100%',
      }}
    >
      <IframeComponent
        height='100%'
        width='100%'
        style={{ border: 'none', paddingTop: -16 }}
      >
        <PreviewEmail scroll />
      </IframeComponent>
    </div>
  );
}
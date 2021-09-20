import { IframeComponent } from '@/components/UI/IframeComponent';
import { useEditorContext } from '@/hooks/useEditorContext';
import React from 'react';
import { PreviewEmail } from '../PreviewEmail';

export function DesktopEmailPreview() {
  const { pageData } = useEditorContext();
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <IframeComponent
        height='100%'
        width='100%'
        style={{ border: 'none', paddingTop: -16 }}
      >
        <div style={{

          padding: '40px 0px',
          margin: 'auto',
        }}
        >
          <PreviewEmail scroll />
        </div>

      </IframeComponent>
    </div>
  );
}
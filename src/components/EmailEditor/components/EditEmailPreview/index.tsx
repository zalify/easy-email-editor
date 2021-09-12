import { ShadowDom } from '@/components/UI/ShadowDom';
import React from 'react';
import { EmailContent } from '../EmailContent';

export function EditEmailPreview() {

  return (
    <ShadowDom
      id='VisualEditorEditMode'
      style={{
        height: '100%',
        zIndex: 10,
        position: 'relative',
        outline: 'none'
      }}
    >
      <div id="VisualEditorEdit-mask" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <EmailContent />
    </ShadowDom>
  );
}
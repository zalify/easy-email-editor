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

      <EmailContent />
    </ShadowDom>
  );
}
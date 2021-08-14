import { ShadowDom } from '@/components/UI/ShadowDom';
import { useEditorContext } from '@/hooks/useEditorContext';
import React from 'react';
import { EmailContent } from '../EmailContent';

export function EditEmailPreview() {
  const { pageData } = useEditorContext();
  const pageMaxWidth = pageData.attributes.width || '600px';

  return (
    <ShadowDom
      id='VisualEditorEditMode'
      style={{
        width: pageMaxWidth,
        padding: '40px 0px',
        margin: 'auto',
        height: '100%',
      }}
    >
      <EmailContent />
    </ShadowDom>
  );
}
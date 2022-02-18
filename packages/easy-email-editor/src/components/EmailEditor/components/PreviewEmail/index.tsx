import React from 'react';

import { useGetPreviewEmailHtml } from '@/hooks/useGetPreviewEmailHtml';

export function PreviewEmail() {
  const { errMsg, html } = useGetPreviewEmailHtml();

  if (errMsg) {
    return (
      <div style={{ textAlign: 'center', fontSize: 24, color: 'red' }}>
        {errMsg}
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

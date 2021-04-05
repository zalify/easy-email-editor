import React from 'react';

import { transformToMjml } from '@/utils/transformToMjml';
import mjml2Html from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';

export function PreviewEmail() {

  const { pageData } = useEditorContext();

  const html = mjml2Html(transformToMjml(pageData)).html;

  return (
    <div style={{ height: '100%' }} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

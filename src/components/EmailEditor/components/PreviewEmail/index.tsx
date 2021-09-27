import React, { useEffect, useState } from 'react';

import { transformToMjml } from '@/utils/transformToMjml';
import mjml2Html from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';

export function PreviewEmail(props: { scroll?: boolean; }) {
  const { pageData } = useEditorContext();

  const html = mjml2Html(transformToMjml({
    data: pageData,
    mode: 'production',
    context: pageData,
  })).html;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

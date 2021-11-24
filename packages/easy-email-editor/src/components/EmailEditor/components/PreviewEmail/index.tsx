import React, { useEffect, useState } from 'react';

import { JsonToMjml } from 'easy-email-core';
import mjml from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';
import { cloneDeep } from 'lodash';
import { useEditorProps } from '@';

export function PreviewEmail() {
  const { pageData } = useEditorContext();
  const { onBeforePreview, mergeTags } = useEditorProps();
  const [errMsg, setErrMsg] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    let injectData = pageData;

    if (onBeforePreview) {
      try {
        injectData = onBeforePreview(cloneDeep(pageData), mergeTags);
        setErrMsg('');
      } catch (error: any) {
        setErrMsg(error?.message || error);
      }
    }
    const parseHtml = mjml(
      JsonToMjml({
        data: injectData,
        mode: 'production',
        context: injectData,
      })
    ).html;
    setHtml(parseHtml);
  }, [mergeTags, onBeforePreview, pageData]);

  if (errMsg) {
    return (
      <div style={{ textAlign: 'center', fontSize: 24, color: 'red' }}>
        {errMsg}
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

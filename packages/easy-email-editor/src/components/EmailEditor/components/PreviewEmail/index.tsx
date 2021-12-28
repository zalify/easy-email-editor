import React, { useEffect, useState } from 'react';

import { JsonToMjml } from 'easy-email-core';
import mjml from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';
import { cloneDeep } from 'lodash';
import { useEditorProps } from '@';

export function PreviewEmail() {
  const { pageData } = useEditorContext();
  const {
    onBeforePreview,
    mergeTags = {},
    previewInjectData = mergeTags,
  } = useEditorProps();
  const [errMsg, setErrMsg] = useState('');
  const [html, setHtml] = useState('');

  useEffect(() => {
    let parseHtml = mjml(
      JsonToMjml({
        data: pageData,
        mode: 'production',
        context: pageData,
        dataSource: cloneDeep(previewInjectData),
      })
    ).html;

    if (onBeforePreview) {
      try {
        parseHtml = onBeforePreview(parseHtml, previewInjectData);
        setErrMsg('');
      } catch (error: any) {
        setErrMsg(error?.message || error);
      }
    }
    setHtml(parseHtml);
  }, [previewInjectData, onBeforePreview, pageData]);

  if (errMsg) {
    return (
      <div style={{ textAlign: 'center', fontSize: 24, color: 'red' }}>
        {errMsg}
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

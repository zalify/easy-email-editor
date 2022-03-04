
import { useEditorContext } from '@/hooks/useEditorContext';
import { useEditorProps } from '@/hooks/useEditorProps';
import { useLazyState } from '@/hooks/useLazyState';
import { HtmlStringToPreviewReactNodes } from '@/utils/HtmlStringToPreviewReactNodes';
import { JsonToMjml } from 'easy-email-core';
import { cloneDeep, isString } from 'lodash';
import mjml from 'mjml-browser';
import React, { useEffect, useMemo, useState } from 'react';

export const PreviewEmailContext = React.createContext<{
  html: string;
  reactNode: React.ReactNode | null;
  errMsg: React.ReactNode;
}>({
  html: '',
  reactNode: null,
  errMsg: ''
});

export const PreviewEmailProvider: React.FC<{}> = (props) => {

  const { pageData } = useEditorContext();
  const { onBeforePreview, mergeTags, previewInjectData } = useEditorProps();
  const [errMsg, setErrMsg] = useState<React.ReactNode>('');
  const [html, setHtml] = useState('');
  const lazyPageData = useLazyState(pageData, 0);

  const injectData = useMemo(() => {
    if (previewInjectData) {
      return previewInjectData;
    }
    if (mergeTags) return mergeTags;
    return {};
  }, [mergeTags, previewInjectData]);

  useEffect(() => {
    let parseHtml = mjml(
      JsonToMjml({
        data: lazyPageData,
        mode: 'production',
        context: lazyPageData,
        dataSource: cloneDeep(injectData),
        keepClassName: true
      })
    ).html;
    if (onBeforePreview) {
      try {
        const result = onBeforePreview(parseHtml, injectData);
        if (isString(result)) {
          parseHtml = result;
        } else {
          result.then((resHtml) => {
            parseHtml = resHtml;
          });
        }

        setErrMsg('');
      } catch (error: any) {
        setErrMsg(error?.message || error);
      }
    }
    setHtml(parseHtml);
  }, [injectData, onBeforePreview, lazyPageData]);

  const htmlNode = useMemo(() => HtmlStringToPreviewReactNodes(html), [html]);

  const value = useMemo(() => {
    return {
      reactNode: htmlNode,
      html,
      errMsg
    };
  }, [errMsg, html, htmlNode]);

  return (
    <PreviewEmailContext.Provider
      value={value}
    >
      {props.children}
    </PreviewEmailContext.Provider>
  );
};

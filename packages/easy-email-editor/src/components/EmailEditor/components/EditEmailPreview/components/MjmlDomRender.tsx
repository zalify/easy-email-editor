import React, { useEffect, useMemo, useState } from 'react';
import mjml from 'mjml-browser';
import { getPageIdx, IPage, JsonToMjml } from 'easy-email-core';
import { cloneDeep, isEqual, debounce } from 'lodash';
import { useEditorContext } from '@/hooks/useEditorContext';
import { HtmlStringToReactNodes } from '@/utils/HtmlStringToReactNodes';
import { createPortal } from 'react-dom';
import { useEditorProps } from '@/hooks/useEditorProps';
import { useCallback } from 'react';

export function MjmlDomRender() {
  const { pageData: content } = useEditorContext();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { dashed } = useEditorProps();

  const debounceCallback = useCallback(
    debounce(
      (con: IPage) => {
        setPageData(cloneDeep(con));
      },
      100,
      {
        maxWait: 200,
      }
    ),
    []
  );

  useEffect(() => {
    if (!isEqual(content, pageData)) {
      debounceCallback(content);
    }
  }, [content, pageData]);

  const html = useMemo(() => {
    if (!pageData) return '';

    const renderHtml = mjml(
      JsonToMjml({
        data: pageData,
        idx: getPageIdx(),
        context: pageData,
        mode: 'testing',
      })
    ).html;
    return renderHtml;
  }, [pageData]);

  return useMemo(() => {
    return (
      <div
        data-dashed={dashed}
        ref={setRef}
        style={{
          outline: 'none',
          position: 'relative',
        }}
        role='tabpanel'
        tabIndex={0}
      >
        {ref && createPortal(HtmlStringToReactNodes(html), ref)}
      </div>
    );
  }, [dashed, ref, html]);
}

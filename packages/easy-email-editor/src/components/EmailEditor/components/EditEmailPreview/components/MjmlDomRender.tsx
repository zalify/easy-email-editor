import React, { useEffect, useMemo, useState } from 'react';
import mjml from 'mjml-browser';
import { getPageIdx, IPage, JsonToMjml } from 'easy-email-core';
import { cloneDeep, isEqual } from 'lodash';
import { useEditorContext } from '@/hooks/useEditorContext';
import { HtmlStringToReactNodes } from '@/utils/HtmlStringToReactNodes';
import { createPortal } from 'react-dom';
import { useEditorProps } from '@/hooks/useEditorProps';

export function MjmlDomRender() {
  const { pageData: content } = useEditorContext();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { dashed } = useEditorProps();

  useEffect(() => {
    if (!isEqual(content, pageData)) {
      setPageData(cloneDeep(content));
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

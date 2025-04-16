import React, { useEffect, useMemo, useRef, useState } from 'react';
import mjml from 'mjml-browser';
import { getPageIdx, IPage, JsonToMjml } from 'easy-email-core';
import { cloneDeep, isEqual } from 'lodash';
import { useEditorContext } from '@/hooks/useEditorContext';
import { useEditorProps } from '@/hooks/useEditorProps';
import { getIframeDocument } from '@/utils';
import { DATA_RENDER_COUNT, FIXED_CONTAINER_ID } from '@/constants';
import { HtmlStringToReactNodes } from '@/utils/HtmlStringToReactNodes';
import { createPortal } from 'react-dom';

let count = 0;

export function MjmlDomRender() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [isTextFocus, setIsTextFocus] = useState(false);

  const { pageData: content, initialized } = useEditorContext();
  const { dashed, mergeTags, enabledMergeTagsBadge } = useEditorProps();

  const isTextFocusing =
    getIframeDocument()?.activeElement?.getAttribute('contenteditable') === 'true';

  useEffect(() => {
    if (!initialized) return;

    // Set the iframe styles so that we can still use arco-design styling.
    window.parent.document.querySelectorAll('style').forEach((style, _key, _parent) => {
      let newStyleElement = document.createElement('style');
      newStyleElement.textContent = style.textContent;

      getIframeDocument()?.body.appendChild(newStyleElement);
    });
  }, [initialized]);

  useEffect(() => {
    if (!isEqual(content, pageData)) {
      setPageData(cloneDeep(content));
    }
  }, [content, pageData, isTextFocus]);

  useEffect(() => {
    setIsTextFocus(isTextFocusing);
  }, [isTextFocusing]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (getIframeDocument()?.contains(e.target as Node)) {
        return;
      }
      const fixedContainer = getIframeDocument()?.getElementById(FIXED_CONTAINER_ID);
      if (fixedContainer?.contains(e.target as Node)) {
        return;
      }
      setIsTextFocus(false);
    };

    getIframeDocument()?.addEventListener('click', onClick);
    return () => {
      getIframeDocument()?.removeEventListener('click', onClick);
    };
  }, []);

  useEffect(() => {
    const root = getIframeDocument();
    if (!root) return;
    const onClick = (e: Event) => {
      const isFocusing =
        getIframeDocument()?.activeElement?.getAttribute('contenteditable') === 'true';
      if (isFocusing) {
        setIsTextFocus(true);
      }
    };

    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('click', onClick);
    };
  }, []);

  const html = useMemo(() => {
    if (!pageData) return '';

    return mjml(
      JsonToMjml({
        data: pageData,
        idx: getPageIdx(),
        context: pageData,
        mode: 'testing',
        dataSource: cloneDeep(mergeTags),
      }),
    ).html;
  }, [mergeTags, pageData]);

  return useMemo(() => {
    return (
      <div
        {...{
          [DATA_RENDER_COUNT]: count++,
        }}
        data-dashed={dashed}
        ref={ref}
        style={{
          outline: 'none',
          position: 'relative',
        }}
        role="tabpanel"
        tabIndex={0}
      >
        {ref.current &&
          createPortal(
            HtmlStringToReactNodes(html, {
              enabledMergeTagsBadge: Boolean(enabledMergeTagsBadge),
            }),
            ref.current,
          )}
      </div>
    );
  }, [dashed, ref, html, enabledMergeTagsBadge]);
}

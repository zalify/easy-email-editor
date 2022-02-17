import { useMemo } from 'react';
import { useEffect, useRef } from 'react';;
import { useGetPreviewEmailHtml } from './useGetPreviewEmailHtml';

export function useMobileScale() {
  const { html, errMsg } = useGetPreviewEmailHtml();
  const { current: iframe } = useRef(document.createElement('iframe'));
  const contentWindowRef = useRef<Window | null>(null);

  useEffect(() => {
    if (errMsg) return;

    iframe.width = '400px';
    iframe.style.position = 'fixed';
    iframe.style.left = '-9999px';
    iframe.onload = (evt) => {
      contentWindowRef.current = (evt.target as any)?.contentWindow;
    };

    document.body.appendChild(iframe);
  }, [errMsg, html, iframe]);

  const mobileWidth = useMemo(() => {
    if (!contentWindowRef.current) return 0;

    const innerBody = contentWindowRef.current.document.body;
    innerBody.innerHTML = html;
    const a = innerBody.querySelector('.mjml-body') as HTMLElement;
    if (a) {
      a.style.display = 'inline-block';
      return a.clientWidth;
    }
    return 0;
  }, [html]);

  return {
    mobileWidth
  };

}
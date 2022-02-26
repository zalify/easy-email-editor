import { IframeComponent } from '@/components/UI/IframeComponent';
import React, { useCallback, useEffect, useState } from 'react';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { useActiveTab } from '@/hooks/useActiveTab';
import { PreviewEmail } from '../PreviewEmail';
import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { useMobileScale } from '@/hooks/useMobileScale';

export function DesktopEmailPreview() {
  const { scrollHeight, viewElementRef } = useDomScrollHeight();
  const { activeTab } = useActiveTab();
  const { mobileWidth } = useMobileScale();
  const [scrollEle, setScrollEle] = useState<HTMLDivElement | null>(null);
  const [contentWindow, setContentWindow] = useState<Window | null>(null);

  const setFirstVisibleEle = useCallback(() => {
    if (!contentWindow) return;
    const ele = contentWindow.document.elementFromPoint(contentWindow.document.documentElement.clientWidth / 2, 0);

    if (ele) {
      const { top } = ele.getBoundingClientRect();

      viewElementRef.current = {
        selector: ele.getAttribute('data-selector') || '',
        top
      };

    }
  }, [contentWindow, viewElementRef]);

  useEffect(() => {
    if (activeTab !== ActiveTabKeys.PC) return;
    if (!scrollEle) return;

    const viewElement = viewElementRef.current;

    if (viewElement) {
      if (contentWindow) {
        const viewElementNode = contentWindow.document.querySelector(`[data-selector="${viewElement?.selector}"]`);
        if (viewElementNode) {
          viewElementNode.scrollIntoView();

          scrollEle.scrollTo(0, scrollEle.scrollTop - viewElement.top / (mobileWidth / 600));
        }
      }
    } else {
      scrollEle.scrollTo(0, scrollHeight.current);
      setFirstVisibleEle();
    }

  }, [activeTab, contentWindow, mobileWidth, scrollEle, scrollHeight, setFirstVisibleEle, viewElementRef]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
      setFirstVisibleEle();
    },
    [scrollHeight, setFirstVisibleEle]
  );

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <IframeComponent
        windowRef={setContentWindow}
        height='100%'
        width='100%'
        style={{ border: 'none', overflow: 'hidden' }}
      >
        <div
          className='preview-container'
          onScroll={onScroll}
          ref={setScrollEle}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 40,
            paddingBottom: 40,
            boxSizing: 'border-box',
            height: '100vh',
            overflow: 'auto',
            margin: 'auto',
          }}
        >
          <PreviewEmail />
          <style>{`

          .preview-container::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 8px;
          }
          .preview-container::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
            -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
          }
          `}
          </style>
        </div>
      </IframeComponent>
    </div>
  );
}

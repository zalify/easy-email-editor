import { IframeComponent } from '@/components/UI/IframeComponent';
import React, { useCallback, useState } from 'react';
import { PreviewEmail } from '../PreviewEmail';

import iphoneFrame from '@/assets/images/iphone.png';
import { useMobileScale } from '@/hooks/useMobileScale';
import { useEffect } from 'react';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '@';

const MOBILE_WIDTH = 320;
const MOBILE_Height = 640;

export function MobileEmailPreview() {
  const [contentWindow, setContentWindow] = useState<Window | null>(null);
  const { mobileWidth } = useMobileScale();
  const [scrollEle, setScrollEle] = useState<HTMLDivElement | null>(null);
  const { viewElementRef, scrollHeight } = useDomScrollHeight();
  const { activeTab } = useActiveTab();

  useEffect(() => {

    if (scrollEle && contentWindow && activeTab === ActiveTabKeys.MOBILE) {

      const viewElement = viewElementRef.current;
      const viewElementNode = contentWindow.document.querySelector(`[data-selector="${viewElement?.selector}"]`);

      if (viewElementNode && viewElement) {
        viewElementNode.scrollIntoView();
        scrollEle.scrollTo(0, scrollEle.scrollTop - viewElement.top * (mobileWidth / 600));
      }

    }
  }, [activeTab, contentWindow, mobileWidth, scrollEle, viewElementRef]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
      if (!contentWindow) return;

      const ele = contentWindow.document.elementFromPoint(contentWindow.document.documentElement.clientWidth / 2, 0);
      if (ele) {
        const { top } = ele.getBoundingClientRect();

        viewElementRef.current = {
          selector: ele.getAttribute('data-selector') || '',
          top
        };

      }
    },
    [contentWindow, scrollHeight, viewElementRef]
  );

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px 0px',
      }}
    >
      <div
        style={{
          position: 'relative',
          margin: 'auto',
          padding: '6px 6.8px 2px 6.8px',

        }}
      >
        <div style={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: '6px 6.8px 2px 6.8px',
          backgroundImage: `url(${iphoneFrame})`,
          backgroundSize: '100% 100%',
          zIndex: 10,
          pointerEvents: 'none'
        }}
        />
        <div style={{
          width: MOBILE_WIDTH,
          height: MOBILE_Height
        }}
        >
          <IframeComponent

            windowRef={setContentWindow}
            height={MOBILE_Height / (MOBILE_WIDTH / mobileWidth)}
            width='100%'
            style={{

              width: mobileWidth,
              boxSizing: 'content-box',
              borderRadius: 30,
              border: 'none',
              transform: `scale(${MOBILE_WIDTH / mobileWidth})`,
              transformOrigin: 'left top',
            }}
          >
            <style>
              {`
            *::-webkit-scrollbar {
              width: 0px;
              background-color: transparent;
            }
          `}
            </style>
            <div
              className='preview-container'
              ref={setScrollEle}
              onScroll={onScroll}
              style={{
                height: '100vh',
                overflow: 'auto',
                margin: 'auto',
              }}
            >
              <PreviewEmail />

            </div>
          </IframeComponent>
        </div>

      </div>
    </div>
  );
}

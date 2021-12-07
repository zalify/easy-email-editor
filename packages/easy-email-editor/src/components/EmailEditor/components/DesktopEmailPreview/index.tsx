import { IframeComponent } from '@/components/UI/IframeComponent';
import React, { useCallback, useEffect, useState } from 'react';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { useActiveTab } from '@/hooks/useActiveTab';
import { PreviewEmail } from '../PreviewEmail';

export function DesktopEmailPreview() {
  const { scrollHeight } = useDomScrollHeight();
  const { activeTab } = useActiveTab();
  const [scrollEle, setScrollEle] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollEle) return;

    if (scrollEle) {
      scrollEle.scrollTo(0, scrollHeight.current);
    }
  }, [activeTab, scrollEle, scrollHeight]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
    },
    [scrollHeight]
  );

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <IframeComponent
        height='100%'
        width='100%'
        style={{ border: 'none', overflow: 'hidden' }}
      >
        <div
          onScroll={onScroll}
          ref={setScrollEle}
          style={{
            height: '100vh',
            overflow: 'auto',
            margin: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <PreviewEmail />
        </div>
      </IframeComponent>
    </div>
  );
}

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MjmlDomRender } from '../EditEmailPreview/components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { useActiveTab } from '@/hooks/useActiveTab';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { useHotKeys } from '@/hooks/useHotKeys';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { ShadowStyle } from './components/ShadowStyle';
import { useEditorContext } from '@/hooks/useEditorContext';
import { DATA_ATTRIBUTE_DROP_CONTAINER } from '@/constants';

export function EditEmailPreview() {
  useHotKeys();
  const { activeTab } = useActiveTab();
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { setRef } = useDropBlock();
  const { scrollHeight } = useDomScrollHeight();
  const { setInitialized } = useEditorContext();

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  useEffect(() => {
    if (containerRef) {
      setInitialized(true);
    }
  }, [containerRef, setInitialized]);

  useEffect(() => {
    const container = containerRef;
    if (container) {
      container.scrollTo(0, scrollHeight.current);
    }
  }, [activeTab, containerRef, scrollHeight]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
    },
    [scrollHeight]
  );

  return useMemo(
    () => (
      <ShadowDom
        id='VisualEditorEditMode'
        {...{
          [DATA_ATTRIBUTE_DROP_CONTAINER]: 'true',
        }}
        style={{
          height: '100%',
          zIndex: 10,
          position: 'relative',
          outline: 'none',
        }}
      >
        <div
          className='shadow-container'
          style={{ height: '100%', overflowY: 'auto', zIndex: 10 }}
          ref={setContainerRef}
          onScroll={onScroll}
        >
          <MjmlDomRender />
        </div>
        <ShadowStyle />
      </ShadowDom>
    ),
    [onScroll]
  );
}

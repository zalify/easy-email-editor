import React, { useCallback, useEffect, useState } from 'react';

import { transformToMjml } from '@/utils/transformToMjml';
import mjml2Html from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { useActiveTab } from '@/hooks/useActiveTab';

export function PreviewEmail(props: { scroll?: boolean; }) {
  const { pageData } = useEditorContext();
  const { scrollHeight } = useDomScrollHeight();
  const { activeTab } = useActiveTab();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const html = mjml2Html(transformToMjml({
    data: pageData,
    mode: 'production',
    context: pageData,
  })).html;

  useEffect(() => {
    if (!props.scroll) return;
    const container = ref;
    if (container) {
      container.scrollTo(0, scrollHeight.current);
    }
  }, [activeTab, props.scroll, ref, scrollHeight]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      if (!props.scroll) return;
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
    },
    [props.scroll, scrollHeight]
  );

  return (
    <div
      onScroll={onScroll}
      style={{ height: '100vh', overflow: 'overlay' }}
      ref={setRef}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

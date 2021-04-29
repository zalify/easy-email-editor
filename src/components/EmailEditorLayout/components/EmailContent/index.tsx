import React, { useEffect, useState } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { Tooltip } from 'antd';
import { BlockToolbar } from '../BlockToolbar';
import { ShadowStyle } from './components/ShadowStyle';
import { MjmlDomRender } from './components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { HoverTooltip } from './components/HoverTooltip';

export function EmailContent() {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { focusBlock } = useBlock();
  const { setRef } = useDropBlock();

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  return (
    <>
      <ShadowStyle />
      <Tooltip
        placement='topRight'
        title={<BlockToolbar />}
        visible={!!focusBlock}
        overlayStyle={{ maxWidth: 400, zIndex: 100 }}
      >
        <div
          style={{ height: '100%', overflowY: 'scroll' }}
          ref={setContainerRef}
        >
          <MjmlDomRender />
        </div>
      </Tooltip>
      <HoverTooltip container={containerRef} />
    </>
  );
}

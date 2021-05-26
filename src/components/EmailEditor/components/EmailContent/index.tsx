import React, { useEffect, useMemo, useState } from 'react';
import { Tooltip } from 'antd';
import { BlockToolbar } from '../BlockToolbar';
import { ShadowStyle } from './components/ShadowStyle';
import { MjmlDomRender } from './components/MjmlDomRender';
import { useDropBlock } from '@/hooks/useDropBlock';
import { HoverTooltip } from './components/HoverTooltip';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function EmailContent({ isActive }: { isActive: boolean; }) {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const { focusIdx } = useFocusIdx();
  const { setRef } = useDropBlock();

  useEffect(() => {
    setRef(containerRef);
  }, [containerRef, setRef]);

  return useMemo(() => {
    return (
      <>
        <ShadowStyle />
        <Tooltip
          placement='topRight'
          title={<BlockToolbar />}
          visible={!!focusIdx && isActive}
          overlayStyle={{ maxWidth: 600, zIndex: 100 }}
        >
          <div
            style={{ height: '100%', overflowY: 'scroll' }}
            ref={setContainerRef}
          >
            <MjmlDomRender />
          </div>
        </Tooltip>
        {isActive && <HoverTooltip />}
      </>
    );
  }, [focusIdx, isActive]);
}

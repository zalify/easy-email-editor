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
            className="shadow-container"
            style={{ height: '100%', overflowY: 'overlay' as any }}
            ref={setContainerRef}
          >
            <MjmlDomRender />
            <style>
              {`
              .shadow-container {
                overflow-y: overlay;
              }
              .shadow-container::-webkit-scrollbar {
                width: 10px;
                height: 10px;
                background-color: transparent;
              }
              .shadow-container::-webkit-scrollbar-track {
                background-color: transparent;
              }
              .shadow-container::-webkit-scrollbar-thumb {
                background-color: transparent;
              }
              .shadow-container:hover::-webkit-scrollbar {
                background-color: #f5f5f5;
              }
              .shadow-container:hover::-webkit-scrollbar-track {
                box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3);
                background-color: #fff;
              }
              .shadow-container:hover::-webkit-scrollbar-thumb {
                background-color: #aaa;
              }

              `}
            </style>
          </div>
        </Tooltip>
        {isActive && <HoverTooltip />}
      </>
    );
  }, [focusIdx, isActive]);
}

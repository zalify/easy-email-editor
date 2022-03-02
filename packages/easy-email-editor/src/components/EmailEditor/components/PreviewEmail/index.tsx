import React from 'react';

import { usePreviewEmail } from '@/hooks/usePreviewEmail';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { SyncScrollShadowDom } from '@/components/UI/SyncScrollShadowDom';
import { classnames } from '@/utils/classnames';
import { SYNC_SCROLL_ELEMENT_CLASS_NAME } from '@/constants';

export interface PreviewEmailProps {
  style?: React.CSSProperties;
  isActive: boolean;
}
export function PreviewEmail(props: PreviewEmailProps) {

  const { errMsg, reactNode } = usePreviewEmail();

  const { activeTab } = useActiveTab();

  const isMobile = activeTab === ActiveTabKeys.MOBILE;

  if (errMsg) {
    return (
      <div style={{ textAlign: 'center', fontSize: 24, color: 'red' }}>
        {errMsg}
      </div>
    );
  }

  return (
    <SyncScrollShadowDom
      isActive={props.isActive}
      style={{
        border: 'none',
        height: '100%',
        width: '100%',

      }}
    >
      {isMobile ?
        (
          <style>
            {`
          *::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 0px;
          }
        `}
          </style>
        )
        : (
          <style>
            {`
              .preview-container {
                overflow: overlay !important;
              }
              *::-webkit-scrollbar {
                -webkit-appearance: none;
                width: 8px;
              }
              *::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.5);
                box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
                -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
              }
            `}
          </style>
        )}
      <div
        className={classnames('preview-container', SYNC_SCROLL_ELEMENT_CLASS_NAME)}
        style={{
          height: '100%',
          overflow: 'auto',
          margin: 'auto',
          ...props.style
        }}
      >
        {reactNode}
      </div>
    </SyncScrollShadowDom>
  );
}

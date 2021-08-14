import { IframeComponent } from '@/components/UI/IframeComponent';
import { useEditorContext } from '@/hooks/useEditorContext';
import React from 'react';
import { PreviewEmail } from '../PreviewEmail';

const MOBILE_WIDTH = 320;

export function MobileEmailPreview() {
  const { pageData } = useEditorContext();
  const pageMaxWidth = pageData.attributes.width || '600px';
  const isResponsive = pageData.data.value.responsive;
  return (
    <div
      style={{
        width: isResponsive ? MOBILE_WIDTH : pageMaxWidth,
        padding: '40px 0px',
        margin: 'auto',
        height: '100%',
      }}
    >
      <IframeComponent
        height={isResponsive ? '100%' : 667 / (MOBILE_WIDTH / parseFloat(pageMaxWidth))}
        width='100%'
        style={{
          paddingTop: -16,
          border: ' 2px solid #e9e9e9',
          boxSizing: 'content-box',
          boxShadow: '5px 5px 5px rgba(17, 17, 17, 0.699)',
          borderRadius: '25px',
          maxHeight: isResponsive ? 667 : 667 / (MOBILE_WIDTH / parseFloat(pageMaxWidth)),
          transform: isResponsive ? undefined : `scale(${MOBILE_WIDTH / parseFloat(pageMaxWidth)})`,
          transformOrigin: 'center top'
        }}

      >
        <style>
          {`
            body *::-webkit-scrollbar {
              width: 0px;
              background-color: transparent;
            }
          `}
        </style>
        <PreviewEmail />
      </IframeComponent>
    </div>
  );
}
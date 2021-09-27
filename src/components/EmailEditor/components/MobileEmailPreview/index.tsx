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
        height={
          isResponsive
            ? '100%'
            : 667 / (MOBILE_WIDTH / parseFloat(pageMaxWidth))
        }
        width='100%'
        style={{
          padding: 10,
          border: '10px solid rgb(16 4 4)',
          boxSizing: 'content-box',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.699)',
          borderRadius: '25px',
          maxHeight: isResponsive
            ? 667
            : 667 / (MOBILE_WIDTH / parseFloat(pageMaxWidth)),
          transform: isResponsive
            ? undefined
            : `scale(${MOBILE_WIDTH / parseFloat(pageMaxWidth)})`,
          transformOrigin: 'center top',
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
        <PreviewEmail />
      </IframeComponent>
    </div>
  );
}

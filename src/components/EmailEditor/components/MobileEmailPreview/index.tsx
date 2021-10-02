import { IframeComponent } from '@/components/UI/IframeComponent';
import { useEditorContext } from '@/hooks/useEditorContext';
import React from 'react';
import { PreviewEmail } from '../PreviewEmail';

const MOBILE_WIDTH = 375;
const MOBILE_Height = (MOBILE_WIDTH / 375) * 667;

const responsiveScale = 320 / MOBILE_WIDTH;

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
            : MOBILE_Height / (MOBILE_WIDTH / parseFloat(pageMaxWidth))
        }
        width='100%'
        style={{
          padding: 10,
          border: '10px solid rgb(64 61 61)',
          boxSizing: 'content-box',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.699)',
          borderRadius: '25px',
          maxHeight: isResponsive
            ? MOBILE_Height
            : MOBILE_Height / (MOBILE_WIDTH / parseFloat(pageMaxWidth)),
          transform: isResponsive
            ? `scale(${responsiveScale})`
            : `scale(${MOBILE_WIDTH / parseFloat(pageMaxWidth)})`,
          transformOrigin: `center ${isResponsive ? 'center' : 'top'}`,
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

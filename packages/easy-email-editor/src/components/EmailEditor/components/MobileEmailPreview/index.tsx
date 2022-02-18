import { IframeComponent } from '@/components/UI/IframeComponent';
import React from 'react';
import { PreviewEmail } from '../PreviewEmail';

import iphoneFrame from '@/assets/images/iphone.png';
import { useMobileScale } from '@/hooks/useMobileScale';

const MOBILE_WIDTH = 320;
const MOBILE_Height = 640;

export function MobileEmailPreview() {

  const { mobileWidth } = useMobileScale();

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        padding: '10px 0px',
      }}
    >
      <div
        style={{
          position: 'relative',
          margin: 'auto',
          padding: '6px 6.8px 2px 6.8px',

        }}
      >
        <div style={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: '6px 6.8px 2px 6.8px',
          backgroundImage: `url(${iphoneFrame})`,
          backgroundSize: '100% 100%',
          zIndex: 10,
          pointerEvents: 'none'
        }}
        />
        <div style={{
          width: MOBILE_WIDTH,
          height: MOBILE_Height
        }}
        >
          <IframeComponent
            height={MOBILE_Height / (MOBILE_WIDTH / mobileWidth)}
            width='100%'
            style={{

              width: mobileWidth,
              boxSizing: 'content-box',
              borderRadius: 30,
              border: 'none',
              transform: `scale(${MOBILE_WIDTH / mobileWidth})`,
              transformOrigin: 'left top',
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

      </div>
    </div>
  );
}

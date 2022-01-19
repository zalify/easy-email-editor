import { IframeComponent } from '@/components/UI/IframeComponent';
import React from 'react';
import { PreviewEmail } from '../PreviewEmail';

import iphoneFrame from '@/assets/images/iphone.png';

const MOBILE_WIDTH = 320;
const MOBILE_Height = 640;

export function MobileEmailPreview() {
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
          margin: 'auto',
          padding: '6px 6.8px 2px 6.8px',
          backgroundImage: `url(${iphoneFrame})`,
          backgroundSize: '100% 100%',
        }}
      >
        <IframeComponent
          height={MOBILE_Height}
          width='100%'
          style={{
            width: MOBILE_WIDTH,
            boxSizing: 'content-box',
            borderRadius: 30,
            border: 'none',
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
  );
}

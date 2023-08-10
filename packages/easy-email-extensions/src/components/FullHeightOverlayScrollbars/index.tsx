import React from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

interface ComponentInterface {
  children: React.ReactNode | React.ReactElement;
  height: string | number;
}

export const FullHeightOverlayScrollbars = (props: ComponentInterface) => {
  return (
    <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'scroll' } }}>
      <div style={{ height: props.height }}>{props.children}</div>
    </OverlayScrollbarsComponent>
  );
};

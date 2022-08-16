import React from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const FullHeightOverlayScrollbars: React.FC<{
  height: string | number;
}> = (props) => {
  return (
    <OverlayScrollbarsComponent
      options={{ scrollbars: { autoHide: 'scroll' } }}
    >
      <div style={{ height: props.height }}>{props.children}</div>
    </OverlayScrollbarsComponent>
  );
};

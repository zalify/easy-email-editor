import React, { useState } from 'react';
import { useInterval } from 'react-use';
import { createPortal } from 'react-dom';

interface Props
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  children: React.ReactNode;
  title?: string;
  onChangeHeight?: (val: number) => void;
  windowRef?: (e: Window) => void;
}

export const IframeComponent = ({
  children,
  title,
  windowRef,
  style,
  onChangeHeight,
  ...props
}: Props) => {
  const [mountNode, setMountNode] = useState<HTMLBodyElement | null>(null);
  const [height, setHeight] = useState(0);

  const onLoad: React.ReactEventHandler<HTMLIFrameElement> = evt => {
    const contentWindow = (evt.target as any)?.contentWindow;
    if (!contentWindow) return;
    windowRef?.(contentWindow);
    const innerBody = contentWindow.document.body;
    innerBody.style.backgroundColor = 'transparent';
    setMountNode(innerBody);
  };

  useInterval(() => {
    const scrollHeight = mountNode?.scrollHeight || 0;
    if (scrollHeight > 0) {
      setHeight(scrollHeight);
      onChangeHeight && onChangeHeight(scrollHeight);
    }
  }, 1000);

  return (
    <iframe
      title={title}
      srcDoc={
        '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head></head> <body> </body> </html>'
      }
      style={{
        height: `${height}px`,
        width: '100%',
        padding: 0,
        margin: 0,
        display: 'block',
        ...style,
      }}
      frameBorder='none'
      {...(props as any)}
      onLoad={onLoad}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

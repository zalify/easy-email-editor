import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface Props
  extends React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > {
  children: React.ReactNode;
  title?: string;
}

export const IframeComponent = ({ children, title, ...props }: Props) => {
  const [mountNode, setMountNode] = useState(null);

  const onLoad: React.ReactEventHandler<HTMLIFrameElement> = (evt) => {
    const innerBody = (evt.target as any)?.contentWindow?.document.body;
    innerBody.style.backgroundColor = 'transparent';
    setMountNode(innerBody);
  };

  return (
    <iframe
      title={title}
      srcDoc={
        '<!doctype html> <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"> <head></head> <body> </body> </html>'
      }
      {...(props as any)}
      onLoad={onLoad}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

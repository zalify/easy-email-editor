import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export const ShadowDom: React.FC<React.HTMLProps<HTMLElement>> = (props) => {
  const [root, setRoot] = useState<null | ShadowRoot>(null);
  const [ref, setRef] = useState<null | HTMLDivElement>(null);

  useEffect(() => {
    if (ref) {
      const root = ref.attachShadow({ mode: 'open' });
      setRoot(root);
    }
  }, [ref]);

  return (
    <>
      <div {...(props as any)} ref={setRef}>
        {root && ReactDOM.createPortal(props.children, root as any)}
      </div>
    </>
  );
};

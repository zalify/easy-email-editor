import React from 'react';

export function RenderCount() {
  const renders = React.useRef(0);

  return <div>{++renders.current}</div>;
}

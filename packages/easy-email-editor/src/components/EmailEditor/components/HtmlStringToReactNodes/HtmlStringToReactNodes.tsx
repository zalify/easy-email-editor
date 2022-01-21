import { PropsProviderProps } from '@/components/Provider/PropsProvider';
import React from 'react';
import { useMemo } from 'react';
import { RenderReactNode } from './components/RenderReactNode';

const domParser = new DOMParser();

const errLog = console.error;

console.error = (message?: any, ...optionalParams: any[]) => {
  // ignore validateDOMNesting
  if (
    typeof message === 'string' &&
    [
      'Unsupported vendor-prefixed style property',
      'validateDOMNesting',
      'Invalid DOM',
      'You provided a `checked` prop to a form field without an `onChange` handler',
    ].some((item) => message.includes(item))
  ) {
    // no console
  } else {
    errLog(message, ...optionalParams);
  }
};

export interface HtmlStringToReactNodesProps {
  content: string;
  renderEmailBlockNode: PropsProviderProps['renderEmailBlockNode'];
}

function HtmlStringToReactNodes(props: HtmlStringToReactNodesProps) {
  const { content, renderEmailBlockNode } = props;

  const doc = useMemo(
    () => domParser.parseFromString(content, 'text/html'),
    [content]
  ); // The average time is about 1.4 ms

  const reactNode = (
    <RenderReactNode
      node={doc.documentElement}
      renderEmailBlockNode={renderEmailBlockNode}
    />
  );

  return reactNode;
}

export default HtmlStringToReactNodes;

import { camelCase, isEqual } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { getEditNode } from './getEditNode';
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
    ].some((item) => message.includes(item))
  ) {
    // no console
  } else {
    errLog(message, ...optionalParams);
  }
};

export interface HtmlStringToReactNodesOptions {
  focusIdx: string;
}

export function HtmlStringToReactNodes(content: string) {
  let doc = domParser.parseFromString(content, 'text/html'); // The average time is about 1.4 ms
  doc
    .querySelectorAll('.node-type-text, .node-type-button')
    .forEach((child) => {
      const editNode = getEditNode(child as HTMLElement);

      if (editNode) {
        editNode.contentEditable = 'true';
      }
    });

  const reactNode = <RenderReactNode node={doc.documentElement} index={0} />;

  return reactNode;
}

const RenderReactNode = React.memo(function ({
  node,
  index,
}: {
  node: HTMLElement;
  index: number;
}): React.ReactElement {
  const attributes: { [key: string]: string; } = {};
  node.getAttributeNames?.().forEach((att) => {
    if (att) {
      attributes[att] = node.getAttribute(att) || '';
    }
  });

  if (node.nodeType === Node.COMMENT_NODE) return <></>;

  if (node.nodeType === Node.TEXT_NODE) {
    return <>{node.textContent}</>;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const tagName = node.tagName.toLowerCase();
    if (tagName === 'meta') return <></>;

    if (tagName === 'style') {
      return React.createElement(tagName, {
        key: index,
        ...attributes,
        dangerouslySetInnerHTML: { __html: node.textContent },
      });
    }

    if (attributes['contenteditable'] === 'true') {
      return React.createElement(tagName, {
        key: index,
        ...attributes,
        style: getStyle(node.getAttribute('style')),
        dangerouslySetInnerHTML: { __html: node.innerHTML },
      });
    }

    const reactNode = React.createElement(tagName, {
      key: index,
      ...attributes,
      style: getStyle(node.getAttribute('style')),
      children:
        node.childNodes.length === 0
          ? null
          : [...node.childNodes].map((n, i) => (
            <RenderReactNode key={i} node={n as any} index={i} />
          )),
    });

    return <>{reactNode}</>;
  }

  return <></>;
});

function getStyle(styleText: string | null) {
  if (!styleText) return undefined;
  return styleText.split(';').reduceRight((a, b) => {
    const arr = b.split(/\:(?!\/)/);
    if (arr.length < 2) return a;
    a[camelCase(arr[0])] = arr[1];
    return a;
  }, {});
}
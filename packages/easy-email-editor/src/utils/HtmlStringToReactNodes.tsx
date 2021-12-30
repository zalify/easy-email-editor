import { BasicType } from 'easy-email-core';
import { camelCase } from 'lodash';
import React from 'react';
import {
  getChildIdx,
  getNodeTypeFromClassName,
  getPageIdx,
} from 'easy-email-core';
import { getEditNode } from './getEditNode';
import { getImg } from './getImg';
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

export interface HtmlStringToReactNodesOptions {
  focusIdx: string;
}

export function HtmlStringToReactNodes(content: string) {
  let doc = domParser.parseFromString(content, 'text/html'); // The average time is about 1.4 ms
  doc.querySelectorAll('.node-type-text').forEach((child) => {
    const editNode = getEditNode(child as HTMLElement);

    if (editNode) {
      editNode.contentEditable = 'true';
    }
  });

  const reactNode = (
    <RenderReactNode idx={getPageIdx()} node={doc.documentElement} index={0} />
  );

  return reactNode;
}

const RenderReactNode = React.memo(function ({
  node,
  index,
  idx,
}: {
  node: HTMLElement;
  index: number;
  idx: string;
}): React.ReactElement {
  const attributes: { [key: string]: string } = {};
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
      return createElement(tagName, {
        key: index,
        ...attributes,
        dangerouslySetInnerHTML: { __html: node.textContent },
      });
    }

    const blockType = getNodeTypeFromClassName(node.classList);
    const isTextBlockNode = blockType === BasicType.TEXT;
    const isButtonBlockNode = blockType === BasicType.BUTTON;
    const isNavbarBlockNode = blockType === BasicType.NAVBAR;
    if (isTextBlockNode) {
      const editNode = getEditNode(node);

      if (editNode) {
        editNode.id = idx;
        editNode.contentEditable = 'true';
      }
    }

    if (isButtonBlockNode) {
      const editNode = getEditNode(node);
      if (editNode) {
        editNode.setAttribute('tabIndex', '-1');
      }
    }

    if (isNavbarBlockNode) {
      node.querySelectorAll('a').forEach((anchor) => {
        anchor.setAttribute('tabIndex', '-1');
      });
    }

    if (attributes['contenteditable'] === 'true') {
      return createElement(tagName, {
        key: index,
        ...attributes,
        style: getStyle(node.getAttribute('style')),
        dangerouslySetInnerHTML: { __html: node.innerHTML },
      });
    }

    const reactNode = createElement(tagName, {
      key: index,
      ...attributes,
      style: getStyle(node.getAttribute('style')),
      children:
        node.childNodes.length === 0
          ? null
          : [...node.childNodes].map((n, i) => (
              <RenderReactNode
                idx={getChildIdx(idx, i)}
                key={i}
                node={n as any}
                index={i}
              />
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

function createElement(
  type: string,
  props?: React.ClassAttributes<Element> & {
    style?: {} | undefined;
    children?: JSX.Element[] | null;
    key: string | number;
    tabIndex?: string;
    class?: string;
    role?: string;
    src?: string;
    dangerouslySetInnerHTML?: any;
  }
) {
  if (
    type === 'img' &&
    props?.src &&
    (/{{([\s\S]+?)}}/g.test(props.src) || /\*\|([^\|\*]+)\|\*/g.test(props.src))
  ) {
    props.src = getImg('IMAGE_59');
  }
  if (props?.class && props.class.includes('email-block')) {
    const blockType = getNodeTypeFromClassName(props.class);
    if (![BasicType.TEXT].includes(blockType as any)) {
      props.role = 'tab';
      props.tabIndex = '0';
    }
    props.key = props.class;
  }

  return React.createElement(type, props);
}

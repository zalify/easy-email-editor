import { BasicType, getNodeIdxFromClassName } from 'easy-email-core';
import { camelCase } from 'lodash';
import React from 'react';
import {
  getNodeTypeFromClassName,
  MERGE_TAG_CLASS_NAME,
} from 'easy-email-core';
import { getEditNode } from './getEditNode';
import { isTextBlock } from './isTextBlock';
import { MergeTagBadge } from './MergeTagBadge';
const domParser = new DOMParser();

const errLog = console.error;

export function getChildSelector(selector: string, index: number) {
  return `${selector}-${index}`;
}

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
  enabledMergeTagsBadge: boolean;
}

export function HtmlStringToReactNodes(
  content: string,
  option: HtmlStringToReactNodesOptions
) {
  let doc = domParser.parseFromString(content, 'text/html'); // The average time is about 1.4 ms
  [...doc.querySelectorAll(`.${MERGE_TAG_CLASS_NAME}`)].forEach((child) => {
    const editNode = child.querySelector('div');
    if (editNode) {
      if (option.enabledMergeTagsBadge) {
        editNode.innerHTML = MergeTagBadge.transform(editNode.innerHTML);
      }
    }
  });

  const reactNode = (
    <RenderReactNode selector={'0'} node={doc.documentElement} index={0} />
  );

  return reactNode;
}

const RenderReactNode = React.memo(function ({
  node,
  index,
  selector,
}: {
  node: HTMLElement;
  index: number;
  selector: string;
}): React.ReactElement {
  const attributes: { [key: string]: string; } = {
    'data-selector': selector,
  };
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
    const isTextBlockNode = isTextBlock(blockType) && getNodeIdxFromClassName(node.classList);
    const isButtonBlockNode = blockType === BasicType.BUTTON;
    const isNavbarBlockNode = blockType === BasicType.NAVBAR;

    if (isTextBlockNode) {

      const editNode = getEditNode(node);

      if (editNode) {
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
        key: performance.now(),
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
              selector={getChildSelector(selector, i)}
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
  return styleText.split(';').reduceRight((a: any, b: any) => {
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
  if (props?.class && props.class.includes('email-block')) {
    const blockType = getNodeTypeFromClassName(props.class);
    if (![BasicType.TEXT].includes(blockType as any)) {
      props.role = 'tab';
      props.tabIndex = '0';
    }
    props.key = props.key + props.class;
  }

  return React.createElement(type, props);
}

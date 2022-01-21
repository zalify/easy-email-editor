import { PropsProviderProps } from '@/components/Provider/PropsProvider';
import { getEditNode } from '@/utils';
import {
  BasicType,
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
} from 'easy-email-core';
import { camelCase } from 'lodash';
import React, { createElement } from 'react';

export const RenderReactNode = React.memo(function ({
  node,
  renderEmailBlockNode,
}: {
  node: ChildNode;
  renderEmailBlockNode?: PropsProviderProps['renderEmailBlockNode'];
}): React.ReactElement {
  if (node instanceof HTMLElement && renderEmailBlockNode) {
    const isEmailBlock = node.classList.contains('email-block');
    const idx = isEmailBlock && getNodeIdxFromClassName(node.classList);

    if (isEmailBlock && idx) {
      const Com = renderEmailBlockNode;
      return <Com node={node} idx={idx} RenderReactNode={RenderElementNode} />;
    }
    return (
      <RenderElementNode
        node={node}
        renderEmailBlockNode={renderEmailBlockNode}
      />
    );
  }

  return <RenderElementNode node={node} />;
});

const RenderElementNode = React.memo(
  ({
    node,
    renderEmailBlockNode,
  }: {
    node: ChildNode;
    renderEmailBlockNode?: PropsProviderProps['renderEmailBlockNode'];
  }) => {
    if (node.nodeType === Node.COMMENT_NODE) return <></>;

    if (node.nodeType === Node.TEXT_NODE) {
      return <>{node.textContent}</>;
    }

    if (!(node instanceof Element)) return <></>;

    const tagName = node.tagName.toLowerCase();
    const attributes: { [key: string]: string } = {};
    node.getAttributeNames?.().forEach((att) => {
      if (att) {
        attributes[att] = node.getAttribute(att) || '';
      }
    });

    if (node.nodeType === Node.ELEMENT_NODE) {
      const tagName = node.tagName.toLowerCase();
      if (tagName === 'meta') return <></>;

      if (tagName === 'style') {
        return createElement(tagName, {
          ...attributes,
          dangerouslySetInnerHTML: { __html: node.textContent },
        });
      }
    }

    const blockType = getNodeTypeFromClassName(node.classList);
    const isButtonBlockNode = blockType === BasicType.BUTTON;
    const isNavbarBlockNode = blockType === BasicType.NAVBAR;

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
      ...attributes,
      style: getStyle(node.getAttribute('style')),
      children:
        node.childNodes.length === 0
          ? null
          : [...node.childNodes].map((n, i) => (
              <RenderReactNode
                key={i}
                node={n as any}
                renderEmailBlockNode={renderEmailBlockNode}
              />
            )),
    });

    return <>{reactNode}</>;
  }
);

function getStyle(styleText: string | null) {
  if (!styleText) return undefined;
  return styleText.split(';').reduceRight((a: any, b: any) => {
    const arr = b.split(/\:(?!\/)/);
    if (arr.length < 2) return a;
    a[camelCase(arr[0])] = arr[1];
    return a;
  }, {});
}

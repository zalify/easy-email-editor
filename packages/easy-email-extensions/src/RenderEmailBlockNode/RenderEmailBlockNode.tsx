import { BasicType, getNodeTypeFromClassName } from 'easy-email-core';
import {
  EmailEditorProviderProps,
  getEditNode,
  isTextBlock,
  useFocusIdx,
  useHoverIdx,
} from 'easy-email-editor';
import { camelCase } from 'lodash';
import React, { createElement, useMemo } from 'react';
import { FocusBlock } from './components/FocusBlock';
import { HoverBlock } from './components/HoverBlock';

const RenderEmailBlockNode: EmailEditorProviderProps['renderEmailBlockNode'] = (
  props
) => {
  const { node, idx, RenderReactNode } = props;

  const { focusIdx } = useFocusIdx();
  const { hoverIdx } = useHoverIdx();
  const isFocus = focusIdx === idx;
  const isHover = hoverIdx === idx;
  const blockType =
    node instanceof Element ? getNodeTypeFromClassName(node.classList)! : '';

  const attributes = useMemo(() => {
    if (!(node instanceof Element)) return {};
    const temp: { [key: string]: string; } = {};
    node.getAttributeNames?.().forEach((att) => {
      if (att) {
        temp[att] = node.getAttribute(att) || '';
      }
    });
    return temp;
  }, [node]);

  const renderFocusBlock = useMemo(
    () => <FocusBlock key='focusBlock' idx={idx} blockType={blockType} />,
    [blockType, idx]
  );
  const renderHoverBlock = useMemo(
    () => <HoverBlock key='hoverBlock' idx={idx} blockType={blockType} />,
    [blockType, idx]
  );

  const extraChild = useMemo(() => {
    if (isFocus) {
      return renderFocusBlock;
    } else if (isHover) {
      return renderHoverBlock;
    }
    return null;
  }, [isFocus, isHover, renderFocusBlock, renderHoverBlock]);

  const childNodes = useMemo(() => {
    const children = [
      ...[...node.childNodes]
        .filter(Boolean)
        .map((n, i) => (
          <RenderReactNode
            key={i}
            node={n}
            renderEmailBlockNode={RenderEmailBlockNode}
          />
        )),
      extraChild,
    ];
    return children;
  }, [node.childNodes, extraChild, RenderReactNode]);

  return useMemo(() => {
    if (node instanceof Element) {

      if (isTextBlock(blockType)) {
        const editNode = getEditNode(node);
        if (editNode) {
          editNode.contentEditable = 'true';
        }
      }
      const reactNode = createElement(node.tagName.toLowerCase(), {
        ...attributes,
        style: getStyle(node.getAttribute('style')),
        children: childNodes,
      });

      return <>{reactNode}</>;
    }

    return (
      <RenderReactNode renderEmailBlockNode={RenderEmailBlockNode} {...props} />
    );
  }, [RenderReactNode, attributes, blockType, childNodes, node, props]);
};

function getStyle(styleText: string | null) {
  if (!styleText) return undefined;
  return styleText.split(';').reduceRight((a: any, b: any) => {
    const arr = b.split(/\:(?!\/)/);
    if (arr.length < 2) return a;
    a[camelCase(arr[0])] = arr[1];
    return a;
  }, {});
}

export default RenderEmailBlockNode;

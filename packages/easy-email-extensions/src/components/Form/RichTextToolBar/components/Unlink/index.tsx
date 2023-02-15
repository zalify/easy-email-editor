import { Grid, PopoverProps, Space, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { Form } from 'react-final-form';
import { IconFont, Stack, TextStyle } from 'easy-email-editor';
import { SearchField, SwitchField } from '@extensions/components/Form';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'easy-email-core';

export interface LinkParams {
  link: string;
  blank: boolean;
  underline: boolean;
  linkNode: HTMLAnchorElement | null;
}

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getAnchorElement(
  node: Node | null,
): HTMLAnchorElement | null {
  if (!node) return null;
  if (node instanceof HTMLAnchorElement) {
    return node;
  }
  if (node instanceof Element && node.classList.contains(EMAIL_BLOCK_CLASS_NAME)) return null;

  return getAnchorElement(node.parentNode);
}

function getLinkNode(
  currentRange: Range | null | undefined
): HTMLAnchorElement | null {
  let linkNode: HTMLAnchorElement | null = null;
  if (!currentRange) return null;
  linkNode = getAnchorElement(currentRange.commonAncestorContainer);
  return linkNode;
}

export function Unlink(props: LinkProps) {
  const { onChange } = props;
  const linkNode = useMemo(() => {
    return getLinkNode(props.currentRange);

  }, [props.currentRange]);

  const onUnlink = useCallback(() => {
    if (linkNode?.parentNode) {
      linkNode?.replaceWith(...linkNode.childNodes);
      onChange();
    }
  }, [linkNode, onChange]);

  return (
    <Tooltip
      color='#fff'
      position='tl'
      content="Unlink"
    >
      <ToolItem title='Unlink' icon={<IconFont iconName='icon-unlink' />} onClick={onUnlink} />
    </Tooltip>
  );
}

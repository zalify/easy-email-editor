import { PopoverProps } from '@arco-design/web-react';
import React, { useCallback, useMemo } from 'react';
import { IconFont } from 'easy-email-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'easy-email-core';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getItalicNode(
  node: Node | null | undefined,
): Element | null {
  if (!node) return null;
  if ((node as Element).classList?.contains(EMAIL_BLOCK_CLASS_NAME)) return null;
  if ((node as Element).tagName?.toLocaleLowerCase() === 'i') return node as Element;
  return getItalicNode(node.parentNode);
}

export function Italic(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getItalicNode(props.currentRange?.commonAncestorContainer);

  }, [props.currentRange]);

  const onClick = useCallback(() => {
    if (node) {
      setRangeByElement(node);
    }
    onChange();
  }, [node, onChange, setRangeByElement]);

  return (
    <ToolItem title={t('Italic')} isActive={Boolean(node)}
              icon={<IconFont iconName="icon-italic" />} onClick={onClick}
    />
  );
}

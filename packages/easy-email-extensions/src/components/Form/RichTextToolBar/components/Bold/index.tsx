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

function getBoldNode(
  node: Node | null | undefined,
): Element | null {
  if (!node) return null;
  if ((node as Element).classList?.contains(EMAIL_BLOCK_CLASS_NAME)) return null;
  if ((node as Element).tagName?.toLocaleLowerCase() === 'b') return node as Element;
  return getBoldNode(node.parentElement);
}

export function Bold(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getBoldNode(props.currentRange?.commonAncestorContainer);

  }, [props.currentRange]);

  const onClick = useCallback(() => {
    if (node) {
      setRangeByElement(node);
    }
    onChange();
  }, [node, onChange, setRangeByElement]);

  return (
    <ToolItem
      title={t('Bold')}
      isActive={Boolean(node)}
      icon={<IconFont iconName="icon-bold" />}
      onClick={onClick}
    />
  );
}

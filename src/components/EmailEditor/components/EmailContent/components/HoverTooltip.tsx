import React, { useEffect, useMemo } from 'react';

import {
  getNodeTypeFromClassName,
} from '@/utils/block';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { BlocksMap } from '@/components/core/blocks';
import { useFocusIdx } from 'easy-email-editor';

export function HoverTooltip() {
  const { hoverIdx } = useHoverIdx();
  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    const blockNode = findBlockNodeByIdx(hoverIdx, true);
    if (!blockNode) return;
    const block = BlocksMap.findBlockByType(getNodeTypeFromClassName(blockNode.classList)!);
    blockNode.setAttribute('data-title', block.name);
  }, [hoverIdx]);

  useEffect(() => {
    const blockNode = findBlockNodeByIdx(focusIdx, true);
    if (!blockNode) return;
    const block = BlocksMap.findBlockByType(getNodeTypeFromClassName(blockNode.classList)!);
    blockNode.setAttribute('data-title', block.name);
  }, [focusIdx]);

  return null;
}

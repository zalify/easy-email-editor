import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import React from 'react';
import { useMemo } from 'react';

export function AttributesManager() {
  const { values } = useBlock();
  const { focusIdx } = useFocusIdx();

  const value = getValueByIdx(values, focusIdx);

  const block = value && (findBlockByType(value.type) as any);

  const content = useMemo(() => {
    if (!block) return null;
    return (
      <block.Panel />
    );
  }, [block]);

  if (!value) return null;
  return content;
}

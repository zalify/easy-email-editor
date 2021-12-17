import { BlockMaskWrapper } from 'easy-email-extensions';
import React from 'react';
import { BlockManager } from 'easy-email-core';

export function Example({ type }: { type: string }) {
  const block = BlockManager.getBlockByType(type);
  return (
    <BlockMaskWrapper type={type} payload={{}}>
      <div style={{ position: 'relative' }}>{block?.name}</div>
    </BlockMaskWrapper>
  );
}

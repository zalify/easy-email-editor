import { IconFont } from '@/components/IconFont';
import { BasicType } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { IBlockData } from '@/typings';
import React from 'react';
import { useCallback } from 'react';

export function EyeIcon({
  idx,
  blockData,
  hidden,
}: {
  idx: string;
  blockData: IBlockData;
  hidden?: boolean;
}) {
  const { setValueByIdx } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      blockData.data.hidden = !blockData.data.hidden;
      setValueByIdx(idx, blockData);
    },
    [blockData, idx, setValueByIdx]
  );

  if (hidden)
    return (
      <div style={{ visibility: 'hidden' }}>
        <IconFont iconName="icon-eye" />
      </div>
    );
  if (blockData.type === BasicType.PAGE) return null;

  return blockData.data.hidden ? (
    <IconFont onClick={onToggleVisible} iconName="icon-eye-invisible" />
  ) : (
    <IconFont onClick={onToggleVisible} iconName="icon-eye" />
  );
}

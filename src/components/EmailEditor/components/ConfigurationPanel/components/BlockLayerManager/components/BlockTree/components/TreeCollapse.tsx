import { IconFont } from '@/components/IconFont';
import React, { useCallback } from 'react';

export const TreeCollapse: React.FC<{ expand: boolean; setExpand: React.Dispatch<React.SetStateAction<boolean>>; }> = React.memo(({ expand, setExpand }) => {

  const onToggle = useCallback(() => {
    setExpand(v => !v);
  }, [setExpand]);

  if (expand) {
    return (
      <IconFont
        size={14}
        iconName='icon-minus-square'
        onClickCapture={onToggle}
      />
    );
  }
  return (
    <IconFont size={14} iconName='icon-plus-square' onClickCapture={onToggle} />
  );
});
import { IconFont } from 'easy-email-editor';
import React, { useCallback } from 'react';

export const TreeCollapse: React.FC<{
  hasChildren: boolean;
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ expand, setExpand, hasChildren }) => {
  const onToggle = useCallback(() => {
    setExpand((v) => !v);
  }, [setExpand]);

  if (!hasChildren)
    return <IconFont size={12} iconName='icon-dot' onClickCapture={onToggle} />;

  if (expand) {
    return (
      <IconFont
        size={12}
        iconName='icon-minus-square'
        onClickCapture={onToggle}
      />
    );
  }
  return (
    <IconFont size={12} iconName='icon-plus-square' onClickCapture={onToggle} />
  );
});

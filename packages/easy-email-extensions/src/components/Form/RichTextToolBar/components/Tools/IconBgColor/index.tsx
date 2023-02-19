import { ColorPicker } from '@extensions/components/Form/ColorPicker';
import { IconFont } from 'easy-email-editor';
import React, { useMemo } from 'react';
import { ToolItem } from '../../ToolItem';

export function IconBgColor({ selectionRange, execCommand, getPopoverMountNode }: { selectionRange: Range | null; execCommand: (cmd: string, val?: any) => void; getPopoverMountNode: () => HTMLElement; }) {

  const color = useMemo(() => {
    if (!selectionRange) return undefined;
    if (selectionRange.commonAncestorContainer instanceof HTMLElement) {
      return getComputedStyle(selectionRange.commonAncestorContainer).backgroundColor;
    } else if (selectionRange.commonAncestorContainer.parentNode instanceof HTMLElement) {
      return getComputedStyle(selectionRange.commonAncestorContainer.parentNode).backgroundColor;

    }

    return undefined;
  }, [selectionRange]);

  return (
    <ColorPicker
      label=''
      showInput={false}
      position='tl'
      onChange={(color) => execCommand('hiliteColor', color)}
      getPopupContainer={getPopoverMountNode}
    >
      <ToolItem
        icon={(
          <div style={{
            position: 'relative'
          }}
          >
            <IconFont size={12} iconName='icon-bg-color' style={{ position: 'relative', top: '-1px' }} />
            <div style={{ borderBottom: `2px solid ${color}`, position: 'absolute', width: '130%', left: '-15%', top: 16 }} />
          </div>
        )}
        title={t('Background color')}
      />
    </ColorPicker>

  );
}
/* eslint-disable react/jsx-wrap-multilines */

import { AdvancedType, IButton, IImage } from 'easy-email-core';
import { IconFont, Stack } from 'easy-email-editor';
import React, { useRef } from 'react';
import { BlocksPanel } from './components/BlocksPanel';
import { DragIcon } from './components/DragIcon';

export function ShortcutToolbar() {
  const blocksPanelRef = useRef<HTMLDivElement>(null);

  return (
    <Stack vertical alignment='center' distribution='center'>
      <BlocksPanel>
        <div ref={blocksPanelRef} />
      </BlocksPanel>
      <DragIcon type={AdvancedType.TEXT} color='rgb(110, 215, 135)' payload={{ attributes: { padding: '0px 25px 0px 25px', 'align': 'center' } }} />
      <DragIcon<IImage> payload={{ attributes: { padding: '0px 0px 0px 0px' } }} type={AdvancedType.IMAGE} color='rgb(250, 208, 97)' />
      <DragIcon<IButton> type={AdvancedType.BUTTON} color='rgb(238,144,172)' />
      <DragIcon type={AdvancedType.SOCIAL} color='rgb(111,206,236) ' />
      <DragIcon type={AdvancedType.NAVBAR} color='rgb(191,24,84)' />
      <DragIcon type={AdvancedType.DIVIDER} color='rgb(71,67,239)' />
      <DragIcon type={AdvancedType.SPACER} color='#ccc' />
      <DragIcon
        color='rgb(24,201,137)'
        payload={{
          children: [
            {
              type: AdvancedType.COLUMN,
              data: {
                value: {},
              },
              attributes: {
                padding: '0px 0px 0px 0px',
                border: 'none',
                'vertical-align': 'top',
              },
              children: [],
            },
            {
              type: AdvancedType.COLUMN,
              data: {
                value: {},
              },
              attributes: {
                padding: '0px 0px 0px 0px',
                border: 'none',
                'vertical-align': 'top',
              },
              children: [],
            },
          ],
        }}
        type={AdvancedType.SECTION}
      />

      <IconFont
        onClick={() => blocksPanelRef.current?.click()}
        iconName='icon-more'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: '50%',
          color: 'var(--color-text-2)',
          boxShadow: '0 0 12px -3px var(--color-text-2)',
          fontSize: 18,
        }}
      />
    </Stack>
  );
}

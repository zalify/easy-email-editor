import { BasicType } from 'easy-email-core';
import { IconFont, Stack, BlockAvatarWrapper } from 'easy-email-editor';
import React, { useRef } from 'react';
import { BlocksPanel } from './components/BlocksPanel';

export function ShortcutToolbar() {
  const blocksPanelRef = useRef<HTMLDivElement>(null);
  return (
    <Stack vertical alignment='center' distribution='center'>
      <BlocksPanel>
        <div ref={blocksPanelRef}></div>
      </BlocksPanel>

      <BlockAvatarWrapper type={BasicType.TEXT}>
        <IconFont
          title='Text'
          iconName='icon-text-rounded'
          style={{
            fontSize: 18,
            textAlign: 'center',
            cursor: 'move',
            color: '#6ED787',
          }}
        />
      </BlockAvatarWrapper>
      <BlockAvatarWrapper type={BasicType.IMAGE}>
        <IconFont
          title='Image'
          iconName='icon-img'
          style={{
            fontSize: 20,
            textAlign: 'center',
            cursor: 'move',
            color: '#FAD061',
          }}
        />
      </BlockAvatarWrapper>
      <BlockAvatarWrapper type={BasicType.BUTTON}>
        <IconFont
          title='Button'
          iconName='icon-button'
          style={{
            fontSize: 22,
            textAlign: 'center',
            cursor: 'move',
            color: '#59BEF8',
          }}
        />
      </BlockAvatarWrapper>
      <BlockAvatarWrapper
        payload={{
          children: [
            {
              type: 'column',
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
              type: 'column',
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
        type={BasicType.SECTION}
      >
        <IconFont
          title='Section'
          iconName='icon-section'
          style={{
            fontSize: 22,
            textAlign: 'center',
            cursor: 'move',
            color: '#e5afe5',
          }}
        />
      </BlockAvatarWrapper>

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

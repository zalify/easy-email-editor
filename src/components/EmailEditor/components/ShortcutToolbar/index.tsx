import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { IconFont } from '@/components/IconFont';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';
import { BlocksPanel } from '../BlocksPanel';

export function ShortcutToolbar({ height }: { height: string | number; }) {
  return (
    <Stack vertical alignment='center' distribution='center'>
      <Stack.Item />

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
      <BlockAvatarWrapper type={BasicType.SECTION}>
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

      <BlocksPanel height={height}>
        <IconFont
          iconName='icon-more'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            width: 30,
            height: 30,
            borderRadius: '50%',
            boxShadow:
              '0 0 12px -3px rgb(0 0 0 / 20%), 0 2px 7px -1px rgb(0 0 0 / 14%), 0 2px 4px -1px rgb(0 0 0 / 20%)',
            fontSize: 18,
          }}
        />
      </BlocksPanel>
    </Stack>
  );
}

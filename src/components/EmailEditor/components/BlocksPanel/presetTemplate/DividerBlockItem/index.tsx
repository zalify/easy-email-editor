import { IDivider } from '@/components/core/blocks/basic/Divider';
import { ISpacer } from '@/components/core/blocks/basic/Spacer';
import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType } from '@/constants';
import { RecursivePartial } from 'easy-email-editor';
import React from 'react';

const dividerList = [
  {
    'border-width': '2px',
    'border-style': 'solid',
    'border-color': 'lightgrey',
  },
  {
    'border-width': '2px',
    'border-style': 'dashed',
    'border-color': 'lightgrey',
  },
  {
    'border-width': '2px',
    'border-style': 'dotted',
    'border-color': 'lightgrey',
  },
];

export function DividerBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        <Stack.Item />
        <Stack.Item />
        {dividerList.map((item, index) => {
          return (
            <Stack key={index} alignment='center'>
              <Stack.Item fill>
                <BlockAvatarWrapper
                  type={BasicType.DIVIDER}
                  payload={
                    {
                      attributes: { ...item, padding: '10px 0px' },
                    } as RecursivePartial<IDivider>
                  }
                >
                  <div
                    style={{
                      backgroundColor: '#fff',
                      padding: '10px 0px 10px 0px',
                    }}
                  >
                    <div
                      style={{
                        borderTopWidth: item['border-width'],
                        borderTopStyle: item['border-style'] as any,
                        borderTopColor: item['border-color'],

                        boxSizing: 'content-box',
                      }}
                    />
                  </div>
                </BlockAvatarWrapper>
              </Stack.Item>
              <TextStyle>{item['border-style']}</TextStyle>
            </Stack>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

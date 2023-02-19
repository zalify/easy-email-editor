import React from 'react';
import { Stack, TextStyle } from 'easy-email-editor';
import { AdvancedType, IDivider, RecursivePartial } from 'easy-email-core';
import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';

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
            <BlockMaskWrapper
              key={index}
              type={AdvancedType.DIVIDER}
              payload={
                {
                  attributes: { ...item, padding: '10px 0px' },
                } as RecursivePartial<IDivider>
              }
            >
              <Stack alignment='center'>
                <Stack.Item fill>

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

                </Stack.Item>
                <TextStyle>{item['border-style']}</TextStyle>
              </Stack>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

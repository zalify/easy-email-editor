import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const list = [
  {
    payload: {
      type: BasicType.RAW,
      data: {
        value: {
          content: '<% if (user) { %>'
        },
      },
    },
  },
  {
    payload: {
      type: BasicType.RAW,
      data: {
        value: {
          content: '<% } %>'
        },
      },
    },
  },
];

export function RawBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.RAW}
              payload={item.payload}
            >
              <ShadowDom>
                <div style={{ width: '100%', paddingLeft: 20 }}>
                  {item.payload.data.value.content}
                </div>
              </ShadowDom>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

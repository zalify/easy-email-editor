import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const fontList = [48, 32, 27, 24, 18, 16, 14];

export function TextBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {fontList.map((item, index) => {
          return (
            <BlockAvatarWrapper
              key={index}
              type={BasicType.TEXT}
              payload={{
                attributes: {
                  'font-size': item + 'px',
                },
                data: {
                  value: {
                    content: item + 'px',
                  }
                }
              }}
            >
              <ShadowDom>
                <div style={{ fontSize: item, width: '100%', paddingLeft: 20 }}>{item}px</div>
              </ShadowDom>
            </BlockAvatarWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

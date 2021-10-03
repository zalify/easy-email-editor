import { ISpacer } from '@/components/core/blocks/basic/Spacer';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';

const spacerList = [10, 15, 20, 30, 50, 60, 100];

export function SpacerBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {spacerList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.SPACER}
              payload={
                {
                  attributes: {
                    height: item + 'px',
                  },
                } as RecursivePartial<ISpacer>
              }
            >
              <Stack alignment='center'>
                <Stack.Item fill>

                  <div
                    style={{
                      marginBottom: 20,
                      backgroundColor: '#efeeea',
                      position: 'relative',
                      height: item,
                      boxShadow: ' 3px 3px 3px rgb(0 0 0 / 0.2)',
                    }}
                  />

                </Stack.Item>
                <TextStyle>{item} px</TextStyle>
              </Stack>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

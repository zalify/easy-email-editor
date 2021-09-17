import { ISpacer } from '@/components/core/blocks/basic/Spacer';
import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType } from '@/constants';
import { RecursivePartial } from 'easy-email-editor';
import React from 'react';

const spacerList = [10, 15, 20, 30, 50, 60, 100];

export function SpacerBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {spacerList.map((item, index) => {
          return (
            <Stack key={index} alignment='center'>
              <Stack.Item fill>
                <BlockAvatarWrapper
                  type={BasicType.SPACER}
                  payload={
                    {
                      attributes: {
                        height: item + 'px',
                      },
                    } as RecursivePartial<ISpacer>
                  }
                >
                  <div
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: '#efeeea',
                      position: 'relative',
                      height: item,
                      boxShadow: ' 3px 3px 3px rgb(0 0 0 / 0.2)',
                    }}
                  />
                </BlockAvatarWrapper>
              </Stack.Item>
              <TextStyle>{item} px</TextStyle>
            </Stack>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

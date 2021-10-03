import { IImage } from '@/components/core/blocks/basic/Image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';

const imageList = ['https://assets.maocanhua.cn/7520b048-b7bc-4727-8190-3c3b20247b59-image.png', 'https://assets.maocanhua.cn/a4836c37-478c-47ba-ab7f-1b0fcf678839-image.png', 'https://assets.maocanhua.cn/e382fda7-5daf-4dfa-b18b-474004d42766-image.png', 'https://assets.maocanhua.cn/bb3f878d-a525-4352-a2c4-eecdc743759e-image.png', 'https://assets.maocanhua.cn/8a554709-0895-4e7f-880a-5973aeec687d-image.png', 'https://assets.maocanhua.cn/e7b105a5-bc0c-406f-bb7c-d62377260440-image.png', 'https://assets.maocanhua.cn/a2387e6f-5f0b-4e5a-92f3-1970888af769-image.png'];

export function ImageBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {imageList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.IMAGE}
              payload={{
                attributes: {
                  src: item,
                  padding: '0px 0px 0px 0px'
                },

              } as RecursivePartial<IImage>}
            >
              <ShadowDom>
                <div style={{ position: 'relative' }}>
                  <Picture src={item} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} />
                </div>
              </ShadowDom>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const list = [
  {
    thumbnail:
      'https://assets.maocanhua.cn/2ad78cfb-dbe4-445b-9c8f-8044a945af48-image.png',
    payload: {
      type: 'carousel',
      data: {
        value: {
          images: [
            {
              src: 'https://assets.maocanhua.cn/916206e2-3e7e-4596-b0a7-118eeae11bb2-image.png',
              target: '_blank',
            },
            {
              src: 'https://assets.maocanhua.cn/0de2b135-4f21-4315-9eb9-bfff009bc79c-image.png',
              target: '_blank',
            },
            {
              src: 'https://assets.maocanhua.cn/4b66001a-77f2-42b2-8dca-d1c02eba1153-image.png',
              target: '_blank',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        'left-icon':
          'https://assets.maocanhua.cn/45d7301a-db10-48e8-a679-4ba6f9c1dd85-image.png',
        'right-icon':
          'https://assets.maocanhua.cn/38e38923-490f-476d-be70-ff85d345f82e-image.png',
        'icon-width': '44px',
        thumbnails: 'visible',
      },
      children: [],
    },
  },
];

export function CarouselBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.CAROUSEL}
              payload={item.payload}
            >
              <ShadowDom>
                <div style={{ position: 'relative' }}>
                  <Picture src={item.thumbnail} />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 2,
                    }}
                  />
                </div>
              </ShadowDom>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

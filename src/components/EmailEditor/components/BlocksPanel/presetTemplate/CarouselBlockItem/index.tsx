import { IMAGE_LIST } from '@/assets/image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const list = [
  {
    thumbnail: IMAGE_LIST.IMAGE_14,
    payload: {
      type: 'carousel',
      data: {
        value: {
          images: [
            {
              src: IMAGE_LIST.IMAGE_15,
              target: '_blank',
            },
            {
              src: IMAGE_LIST.IMAGE_16,
              target: '_blank',
            },
            {
              src: IMAGE_LIST.IMAGE_17,
              target: '_blank',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        'left-icon': IMAGE_LIST.IMAGE_18,
        'right-icon': IMAGE_LIST.IMAGE_19,
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

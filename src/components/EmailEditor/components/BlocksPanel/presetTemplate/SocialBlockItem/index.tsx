import { IMAGE_LIST } from '@/assets/image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const list = [
  {
    thumbnail: IMAGE_LIST.IMAGE_52,
    payload: {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_53,
              content: 'Facebook',
            },
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_54,
              content: 'Google',
            },
            {
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_55,
              content: 'Twitter',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        color: '#333333',
        mode: 'horizontal',
        'font-size': '13px',
        'font-weight': 'normal',
        'border-radius': '3px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '4px 4px 4px 4px',
        'line-height': '22px',
        'text-padding': '4px 4px 4px 0px',
        'icon-padding': '0px',
        'icon-size': '20px',
      },
      children: [],
    },
  },
];

export function SocialBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.SOCIAL}
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

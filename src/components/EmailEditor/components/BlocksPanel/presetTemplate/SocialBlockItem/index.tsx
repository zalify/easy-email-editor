import { Column } from '@/components/core/blocks/basic/Column';
import { IImage } from '@/components/core/blocks/basic/Image';
import { Section } from '@/components/core/blocks/basic/Section';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const list = [
  {
    thumbnail:
      'https://assets.maocanhua.cn/efefa70c-06a4-4146-afef-3da74e656e0d-image.png',
    payload: {
      type: BasicType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: 'https://assets.maocanhua.cn/93013b18-062d-48d7-ae00-4a5f0a9ac988.png',
              content: 'Facebook',
            },
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: 'https://assets.maocanhua.cn/a81ddd4b-3a12-47be-91f3-28d71eced397.png',
              content: 'Google',
            },
            {
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: 'https://assets.maocanhua.cn/0a411326-17c5-4814-ad3a-6927266f097e.png',
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

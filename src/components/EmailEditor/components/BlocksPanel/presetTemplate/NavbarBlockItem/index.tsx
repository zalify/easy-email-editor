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
      'https://assets.maocanhua.cn/ddd29b0a-adca-4f37-82b8-dd1ea43bc541-image.png',
    payload: {
      type: BasicType.NAVBAR,
      data: {
        value: {
          links: [
            {
              href: '/gettings-started-onboard',
              content: 'HOME',
              color: '#000000',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px 15px 10px',
            },
            {
              href: '/try-it-live',
              content: 'NEW',
              color: '#000000',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px 15px 10px',
            },
            {
              href: '/templates',
              content: 'WOMEN',
              color: '#000000',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px 15px 10px',
            },
            {
              href: '/components',
              content: 'KIDS',
              color: '#000000',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px 15px 10px',
            },
            {
              href: '/components',
              content: 'BLOG',
              color: '#000000',
              'font-size': '13px',
              target: '_blank',
              padding: '15px 10px 15px 10px',
            },
          ],
        },
      },
      attributes: {
        align: 'center',
        'base-url': 'https://mjml.io',
      },
      children: [],
    },
  },
];

export function NavbarBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.NAVBAR}
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

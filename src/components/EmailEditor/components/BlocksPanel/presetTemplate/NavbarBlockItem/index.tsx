import { Column } from '@/components/core/blocks/basic/Column';
import { IImage } from '@/components/core/blocks/basic/Image';
import { Section } from '@/components/core/blocks/basic/Section';
import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import { RecursivePartial } from 'easy-email-editor';
import React from 'react';

const list = [
  {
    thumbnail: 'https://assets.maocanhua.cn/563cb5b8-1a9f-4c2b-b27f-7c2a310fc986-image.png',
    payload: Section.create({
      attributes: {
        'background-color': '#ef6451'
      },
      children: [
        Column.create({
          children: [
            {
              'type': BasicType.NAVBAR,
              'data': {
                'value': {
                  'links': [
                    {
                      'href': '/gettings-started-onboard',
                      'content': 'Getting started',
                      'color': '#ffffff',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/try-it-live',
                      'content': 'Try it live',
                      'color': '#ffffff',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/templates',
                      'content': 'Templates',
                      'color': '#ffffff',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/components',
                      'content': 'Components',
                      'color': '#ffffff',
                      'font-size': '13px',
                      'target': '_blank'
                    }
                  ]
                }
              },
              'attributes': {
                'hamburger': 'hamburger',
                'align': 'center',
                'ico-align': 'center',
                'ico-color': '#ffffff',
                'ico-font-size': '30px',
                'ico-line-height': '30px',
                'ico-padding': '10px 10px 10px 10px',
                'base-url': 'https://mjml.io'
              },
              'children': []
            }

          ]
        })
      ]
    }),
  },
  {
    thumbnail: 'https://assets.maocanhua.cn/ddd29b0a-adca-4f37-82b8-dd1ea43bc541-image.png',
    payload: Section.create({
      attributes: {
        'background-color': '#ffffff'
      },
      children: [
        Column.create({
          children: [
            {
              'type': BasicType.NAVBAR,
              'data': {
                'value': {
                  'links': [
                    {
                      'href': '/gettings-started-onboard',
                      'content': 'HOME',
                      'color': '#000000',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/try-it-live',
                      'content': 'NEW',
                      'color': '#000000',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/templates',
                      'content': 'WOMEN',
                      'color': '#000000',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/components',
                      'content': 'KIDS',
                      'color': '#000000',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                    {
                      'href': '/components',
                      'content': 'BLOG',
                      'color': '#000000',
                      'font-size': '13px',
                      'target': '_blank'
                    },
                  ]
                }
              },
              'attributes': {
                'hamburger': 'hamburger',
                'align': 'center',
                'ico-align': 'center',
                'ico-color': '#ffffff',
                'ico-font-size': '30px',
                'ico-line-height': '30px',
                'ico-padding': '10px 10px 10px 10px',
                'base-url': 'https://mjml.io'
              },
              'children': []
            }
          ]
        })
      ]
    }),

  },
];

export function NavbarBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockAvatarWrapper
              key={index}
              type={BasicType.SECTION}
              payload={item.payload}
            >
              <ShadowDom>
                <div style={{ position: 'relative' }}>
                  <Picture src={item.thumbnail} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} />
                </div>
              </ShadowDom>
            </BlockAvatarWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

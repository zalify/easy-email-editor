import { IMAGE_LIST } from '@/assets/image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

const list = [
  {
    thumbnail: IMAGE_LIST.IMAGE_08,
    payload: {
      type: 'accordion',
      data: {
        value: {},
      },
      attributes: {
        'icon-height': '32px',
        'icon-width': '32px',
        'icon-align': 'middle',
        'icon-position': 'right',
        'icon-unwrapped-url': IMAGE_LIST.IMAGE_09,
        'icon-wrapped-url': IMAGE_LIST.IMAGE_10,
        padding: '10px 25px 10px 25px',
        border: '1px solid #d9d9d9',
      },
      children: [
        {
          type: 'accordion-element',
          data: {
            value: {},
          },
          attributes: {
            'icon-align': 'middle',
            'icon-height': '32px',
            'icon-width': '32px',
            'icon-position': 'right',
            padding: '10px 25px 10px 25px',
          },
          children: [
            {
              type: 'accordion-title',
              data: {
                value: {
                  content: 'Why use an accordion?',
                },
              },
              attributes: {
                'font-size': '13px',
                padding: '16px 16px 16px 16px',
              },
              children: [],
            },
            {
              type: 'accordion-text',
              data: {
                value: {
                  content:
                    '<span style="line-height:20px">\n                Because emails with a lot of content are most of the time a very bad experience on mobile, mj-accordion comes handy when you want to deliver a lot of information in a concise way.\n              </span>',
                },
              },
              attributes: {
                'font-size': '13px',
                padding: '16px 16px 16px 16px',
                'line-height': '1',
              },
              children: [],
            },
          ],
        },
        {
          type: 'accordion-element',
          data: {
            value: {},
          },
          attributes: {
            'icon-align': 'middle',
            'icon-height': '32px',
            'icon-width': '32px',
            'icon-position': 'right',
            padding: '10px 25px 10px 25px',
          },
          children: [
            {
              type: 'accordion-title',
              data: {
                value: {
                  content: 'How it works',
                },
              },
              attributes: {
                'font-size': '13px',
                padding: '16px 16px 16px 16px',
              },
              children: [],
            },
            {
              type: 'accordion-text',
              data: {
                value: {
                  content:
                    '<span style="line-height:20px">\n                Content is stacked into tabs and users can expand them at will. If responsive styles are not supported (mostly on desktop clients), tabs are then expanded and your content is readable at once.\n              </span>',
                },
              },
              attributes: {
                'font-size': '13px',
                padding: '16px 16px 16px 16px',
                'line-height': '1',
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
];

export function AccordionBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.ACCORDION}
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

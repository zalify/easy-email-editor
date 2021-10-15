import { IMAGE_LIST } from '@/assets/image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

export function GroupBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.GROUP}
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

const list = [
  {
    thumbnail: IMAGE_LIST.IMAGE_22,
    payload: {},
  },
  {
    thumbnail: IMAGE_LIST.IMAGE_23,
    payload: {
      type: 'group',
      data: {
        value: {},
      },
      attributes: {
        'vertical-align': 'top',
        direction: 'ltr',
      },
      children: [
        {
          type: 'column',
          data: {
            value: {},
          },
          attributes: {
            padding: '0px 0px 0px 0px',
            border: 'none',
            'vertical-align': 'top',
          },
          children: [
            {
              type: 'image',
              data: {
                value: {},
              },
              attributes: {
                align: 'center',
                height: 'auto',
                padding: '0px 5px 0px 10px',
                src: IMAGE_LIST.IMAGE_24,
                width: '',
              },
              children: [],
            },
          ],
        },
        {
          type: 'column',
          data: {
            value: {},
          },
          attributes: {
            padding: '0px 0px 0px 0px',
            border: 'none',
            'vertical-align': 'top',
          },
          children: [
            {
              type: 'image',
              data: {
                value: {},
              },
              attributes: {
                align: 'center',
                height: 'auto',
                padding: '0px 10px 0px 5px',
                src: IMAGE_LIST.IMAGE_25,
                width: '',
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
  {
    thumbnail: IMAGE_LIST.IMAGE_26,
    payload: {
      type: 'group',
      data: {
        value: {},
      },
      attributes: {
        'vertical-align': 'top',
        direction: 'ltr',
        'background-color': '#ffffff',
      },
      children: [
        {
          type: 'column',
          data: {
            value: {},
          },
          attributes: {
            padding: '0px 5px 0px 5px',
            border: 'none',
            'vertical-align': 'top',
          },
          children: [
            {
              type: 'image',
              data: {
                value: {},
              },
              attributes: {
                align: 'center',
                height: 'auto',
                padding: '0px 0px 0px 0px',
                src: IMAGE_LIST.IMAGE_29,
                width: '',
              },
              children: [],
            },
            {
              type: 'text',
              data: {
                value: {
                  content: 'Office Room\nPrinting',
                },
              },
              attributes: {
                'font-size': '18px',
                padding: '10px 5px 10px 5px',
                'line-height': 1,
                align: 'center',
              },
              children: [],
            },
          ],
        },
        {
          type: 'column',
          data: {
            value: {},
          },
          attributes: {
            padding: '0px 5px 0px 5px',
            border: 'none',
            'vertical-align': 'top',
          },
          children: [
            {
              type: 'image',
              data: {
                value: {},
              },
              attributes: {
                align: 'center',
                height: 'auto',
                padding: '0px 0px 0px 0px',
                src: IMAGE_LIST.IMAGE_27,
                width: '',
              },
              children: [],
            },
            {
              type: 'text',
              data: {
                value: {
                  content: 'Workplace\nDesign<div><br></div>',
                },
              },
              attributes: {
                'font-size': '18px',
                padding: '10px 5px 10px 5px',
                'line-height': 1,
                align: 'center',
              },
              children: [],
            },
          ],
        },
        {
          type: 'column',
          data: {
            value: {},
          },
          attributes: {
            padding: '0px 5px 0px 5px',
            border: 'none',
            'vertical-align': 'top',
          },
          children: [
            {
              type: 'image',
              data: {
                value: {},
              },
              attributes: {
                align: 'center',
                height: 'auto',
                padding: '0px 0px 0px 0px',
                src: IMAGE_LIST.IMAGE_28,
                width: '',
              },
              children: [],
            },
            {
              type: 'text',
              data: {
                value: {
                  content: 'Modern Design\nBranding',
                },
              },
              attributes: {
                'font-size': '18px',
                padding: '10px 5px 10px 5px',
                'line-height': 1,
                align: 'center',
              },
              children: [],
            },
          ],
        },
      ],
    },
  },
];

import React from 'react';
import { AdvancedType } from 'easy-email-core';
import { Stack } from 'easy-email-editor';

import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';
import { getImg } from '@extensions/ShortcutToolbar/utils/getImg';
import { Picture } from '@extensions/ShortcutToolbar/components/Picture';

export function GroupBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {list.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={AdvancedType.GROUP}
              payload={item.payload}
            >
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
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

const list = [
  {
    thumbnail: getImg('IMAGE_22'),
    payload: {},
  },
  {
    thumbnail: getImg('IMAGE_23'),
    payload: {
      type: 'advanced_group',
      data: {
        value: {},
      },
      attributes: {
        'vertical-align': 'top',
        direction: 'ltr',
      },
      children: [
        {
          type: 'advanced_column',
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
                src: getImg('IMAGE_24'),
                width: '',
              },
              children: [],
            },
          ],
        },
        {
          type: 'advanced_column',
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
                src: getImg('IMAGE_25'),
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
    thumbnail: getImg('IMAGE_26'),
    payload: {
      type: 'advanced_group',
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
          type: 'advanced_column',
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
                src: getImg('IMAGE_29'),
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
          type: 'advanced_column',
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
                src: getImg('IMAGE_27'),
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
          type: 'advanced_column',
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
                src: getImg('IMAGE_28'),
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

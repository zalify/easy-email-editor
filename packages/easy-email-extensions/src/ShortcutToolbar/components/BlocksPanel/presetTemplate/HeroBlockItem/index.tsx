import React from 'react';
import { AdvancedType } from 'easy-email-core';
import { Stack } from 'easy-email-editor';

import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';
import { getImg } from '@extensions/ShortcutToolbar/utils/getImg';
import { Picture } from '@extensions/ShortcutToolbar/components/Picture';

export function HeroBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {heroList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={AdvancedType.HERO}
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

const heroList = [
  {
    thumbnail: getImg('IMAGE_30'),
    payload: {
      type: 'hero',
      data: {
        value: {},
      },
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        padding: '100px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': getImg('IMAGE_31'),
      },
      children: [
        {
          type: 'text',
          data: {
            value: {
              content: 'We Serve Healthy &amp; Delicious Foods',
            },
          },
          attributes: {
            'font-size': '45px',
            padding: '10px 25px 10px 25px',
            'line-height': '45px',
            align: 'center',
            color: '#ffffff',
          },
          children: [],
        },
        {
          type: 'text',
          data: {
            value: {
              content:
                'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.<br>',
            },
          },
          attributes: {
            'font-size': '14px',
            padding: '10px 25px 10px 25px',
            'line-height': '1.5',
            align: 'center',
            color: '#ffffff',
          },
          children: [],
        },
        {
          type: 'button',
          data: {
            value: {
              content: 'Get Your Order Here!',
            },
          },
          attributes: {
            align: 'center',
            'background-color': '#f3a333',
            color: '#ffffff',
            'font-size': '13px',
            'font-weight': 'normal',
            'border-radius': '30px',
            padding: '10px 25px 10px 25px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '120%',
            target: '_blank',
            'vertical-align': 'middle',
            border: 'none',
            'text-align': 'center',
            href: '#',
          },
          children: [],
        },
      ],
    },
  },
  {
    thumbnail: getImg('IMAGE_32'),
    payload: {
      type: 'hero',
      data: {
        value: {
          content:
            'WINTER\n      \n      \n        WINTER IS COMING\n      \n\n\n      \n        A small river named Duden flows by their place and supplies it with the necessary regelialia.\n      \n\n      \n        Read more',
        },
      },
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        padding: '0px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': getImg('IMAGE_33'),
        'padding-bottom': '100px',
      },
      children: [
        {
          type: 'button',
          data: {
            value: {
              content: 'WINTER',
            },
          },
          attributes: {
            'font-size': '24px',
            padding: '10px 25px 10px 25px',
            'line-height': '45px',
            align: 'center',
            color: '#ffffff',
            border: '2px solid #ffffff',
            'font-weight': '500',
            'background-color': 'transparent',
            'inner-padding': '10px 15px 4px 15px',
            'font-family': '\'Josefin Sans\', sans-serif',
            'border-radius': '0px',
          },
          children: [],
        },
        {
          type: 'text',
          data: {
            value: {
              content: '\n        WINTER IS COMING\n      ',
            },
          },
          attributes: {
            align: 'center',
            'background-color': '#414141',
            color: '#ffffff',
            'font-size': '30px',
            'font-weight': 'normal',
            'border-radius': '3px',
            padding: '10px 25px 10px 25px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '54px',
            target: '_blank',
            'vertical-align': 'middle',
            border: 'none',
            'text-align': 'center',
            href: '#',
          },
          children: [],
        },
        {
          type: 'text',
          attributes: {
            'font-size': '16px',
            padding: '10px 25px 10px 25px',
            'line-height': '1.5',
            align: 'center',
            color: '#ffffff',
          },
          data: {
            value: {
              content:
                '\n        A small river named Duden flows by their place and supplies it with the necessary regelialia.\n      ',
            },
          },
          children: [],
        },
        {
          type: 'button',
          attributes: {
            'border-radius': '30px',
            'font-weight': '500',
            'background-color': '#448ef6',
            padding: '30px 25px 10px 25px',
          },
          data: {
            value: {
              content: 'Read more',
            },
          },
          children: [],
        },
      ],
    },
  },
  {
    thumbnail: getImg('IMAGE_34'),
    payload: {
      type: 'hero',
      data: {
        value: {
          content:
            'WINTER\n      \n      \n        WINTER IS COMING\n      \n\n\n      \n        A small river named Duden flows by their place and supplies it with the necessary regelialia.\n      \n\n      \n        Read more',
        },
      },
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        padding: '0px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': getImg('IMAGE_35'),
        'padding-bottom': '100px',
      },
      children: [
        {
          type: 'text',
          data: {
            value: {
              content: 'Up to 50% off Selected<div>&nbsp;Womens Items</div>',
            },
          },
          attributes: {
            align: 'center',
            'background-color': '#414141',
            color: '#ffffff',
            'font-size': '30px',
            'font-weight': 'normal',
            'border-radius': '3px',
            padding: '80px 25px 10px 25px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '1.4',
            target: '_blank',
            'vertical-align': 'middle',
            border: 'none',
            'text-align': 'center',
            href: '#',
            'font-family': '"Playfair Display", sans-serif',
          },
          children: [],
        },
        {
          type: 'text',
          attributes: {
            'font-size': '16px',
            padding: '10px 25px 10px 25px',
            'line-height': '1.5',
            align: 'center',
            color: '#ffffff',
          },
          data: {
            value: {
              content:
                'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
            },
          },
          children: [],
        },
        {
          type: 'button',
          attributes: {
            'border-radius': '5px',
            'font-weight': '500',
            'background-color': '#ffc0d0',
            padding: '30px 25px 10px 25px',
          },
          data: {
            value: {
              content: 'Start Shoping',
            },
          },
          children: [],
        },
      ],
    },
  },
  {
    thumbnail: getImg('IMAGE_36'),
    payload: {
      type: 'hero',
      attributes: {
        'background-color': '#ffffff',
        'background-position': 'center center',
        mode: 'fluid-height',
        padding: '100px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': getImg('IMAGE_38'),
      },
      data: {
        value: {
          content:
            'We We Create Modern Website\n          \n        \n\n          \n           A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
        },
      },
      children: [
        {
          type: 'text',
          attributes: {
            'font-size': '30px',
            padding: '10px 25px 10px 25px',
            'line-height': '54px',
            align: 'center',
            color: '#ffffff',
          },
          data: {
            value: {
              content: 'We We Create Modern Website',
            },
          },
          children: [],
        },
        {
          type: 'text',
          attributes: {
            'font-size': '16px',
            padding: '10px 25px 10px 25px',
            'line-height': '1.5',
            align: 'center',
            color: '#ffffff',
          },
          data: {
            value: {
              content:
                'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
            },
          },
          children: [],
        },
        {
          type: 'image',
          attributes: {
            width: '60px',
            'padding-top': '30px',
            src: getImg('IMAGE_37'),
            target: '_blank',
            href: 'https://easy-email-m-ryan.vercel.app/',
          },
          data: {
            value: {
              content: '',
            },
          },
          children: [],
        },
      ],
    },
  },
];

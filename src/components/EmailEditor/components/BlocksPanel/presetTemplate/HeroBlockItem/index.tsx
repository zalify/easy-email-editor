import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import React from 'react';

export function HeroBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {heroList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.HERO}
              payload={item.payload}
            >
              <ShadowDom>
                <div style={{ position: 'relative' }}>
                  <Picture src={item.thumbnail} />
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }} />
                </div>
              </ShadowDom>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

const heroList = [
  {
    thumbnail: 'https://assets.maocanhua.cn/71ea2b2b-fdc8-4bc9-aef0-bcd70bda2423-image.png',
    payload: {
      'type': 'hero',
      'data': {
        'value': {

        }
      },
      'attributes': {
        'background-color': '#ffffff',
        'background-position': 'center center',
        'mode': 'fluid-height',
        'padding': '100px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': 'https://assets.maocanhua.cn/900de857-867b-4739-9ab9-1e211f7a70aa-image.png'
      },
      'children': [
        {
          'type': 'text',
          'data': {
            'value': {
              'content': 'We Serve Healthy &amp; Delicious Foods'
            }
          },
          'attributes': {
            'font-size': '45px',
            'padding': '10px 25px 10px 25px',
            'line-height': '45px',
            'align': 'center',
            'color': '#ffffff'
          },
          'children': []
        },
        {
          'type': 'text',
          'data': {
            'value': {
              'content': 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.<br>'
            }
          },
          'attributes': {
            'font-size': '14px',
            'padding': '10px 25px 10px 25px',
            'line-height': '1.5',
            'align': 'center',
            'color': '#ffffff'
          },
          'children': []
        },
        {
          'type': 'button',
          'data': {
            'value': {
              'content': 'Get Your Order Here!'
            }
          },
          'attributes': {
            'align': 'center',
            'background-color': '#f3a333',
            'color': '#ffffff',
            'font-size': '13px',
            'font-weight': 'normal',
            'border-radius': '30px',
            'padding': '10px 25px 10px 25px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '120%',
            'target': '_blank',
            'vertical-align': 'middle',
            'border': 'none',
            'text-align': 'center',
            'href': '#'
          },
          'children': []
        }
      ]
    }
  },
  {
    thumbnail: 'https://assets.maocanhua.cn/b312fe99-250c-4f50-a6dd-47487df81f31-image.png',
    payload: {
      'type': 'hero',
      'data': {
        'value': {
          'content': 'WINTER\n      \n      \n        WINTER IS COMING\n      \n\n\n      \n        A small river named Duden flows by their place and supplies it with the necessary regelialia.\n      \n\n      \n        Read more'
        }
      },
      'attributes': {
        'background-color': '#ffffff',
        'background-position': 'center center',
        'mode': 'fluid-height',
        'padding': '0px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': 'https://assets.maocanhua.cn/513ec2aa-ed17-4eed-bd0d-2dac5db67b8b-image.png',
        'padding-bottom': '100px'
      },
      'children': [
        {
          'type': 'button',
          'data': {
            'value': {
              'content': 'WINTER'
            }
          },
          'attributes': {
            'font-size': '24px',
            'padding': '10px 25px 10px 25px',
            'line-height': '45px',
            'align': 'center',
            'color': '#ffffff',
            'border': '2px solid #ffffff',
            'font-weight': '500',
            'background-color': 'transparent',
            'inner-padding': '10px 15px 4px 15px',
            'font-family': '\'Josefin Sans\', sans-serif',
            'border-radius': '0px'
          },
          'children': []
        },
        {
          'type': 'text',
          'data': {
            'value': {
              'content': '\n        WINTER IS COMING\n      '
            }
          },
          'attributes': {
            'align': 'center',
            'background-color': '#414141',
            'color': '#ffffff',
            'font-size': '30px',
            'font-weight': 'normal',
            'border-radius': '3px',
            'padding': '10px 25px 10px 25px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '54px',
            'target': '_blank',
            'vertical-align': 'middle',
            'border': 'none',
            'text-align': 'center',
            'href': '#'
          },
          'children': []
        },
        {
          'type': 'text',
          'attributes': {
            'font-size': '16px',
            'padding': '10px 25px 10px 25px',
            'line-height': '1.5',
            'align': 'center',
            'color': '#ffffff'
          },
          'data': {
            'value': {
              'content': '\n        A small river named Duden flows by their place and supplies it with the necessary regelialia.\n      '
            }
          },
          'children': []
        },
        {
          'type': 'button',
          'attributes': {
            'border-radius': '30px',
            'font-weight': '500',
            'background-color': '#448ef6',
            'padding': '30px 25px 10px 25px'
          },
          'data': {
            'value': {
              'content': 'Read more'
            }
          },
          'children': []
        }
      ]
    }
  },
  {
    thumbnail: 'https://assets.maocanhua.cn/097ed26c-b2a0-44e8-a57a-a4ab419b96e9-image.png',
    payload: {
      'type': 'hero',
      'data': {
        'value': {
          'content': 'WINTER\n      \n      \n        WINTER IS COMING\n      \n\n\n      \n        A small river named Duden flows by their place and supplies it with the necessary regelialia.\n      \n\n      \n        Read more'
        }
      },
      'attributes': {
        'background-color': '#ffffff',
        'background-position': 'center center',
        'mode': 'fluid-height',
        'padding': '0px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': 'https://assets.maocanhua.cn/b15c7543-237d-4f29-bd1f-05f440ad9286-image.png',
        'padding-bottom': '100px'
      },
      'children': [
        {
          'type': 'text',
          'data': {
            'value': {
              'content': 'Up to 50% off Selected<div>&nbsp;Womens Items</div>'
            }
          },
          'attributes': {
            'align': 'center',
            'background-color': '#414141',
            'color': '#ffffff',
            'font-size': '30px',
            'font-weight': 'normal',
            'border-radius': '3px',
            'padding': '80px 25px 10px 25px',
            'inner-padding': '10px 25px 10px 25px',
            'line-height': '1.4',
            'target': '_blank',
            'vertical-align': 'middle',
            'border': 'none',
            'text-align': 'center',
            'href': '#',
            'font-family': '"Playfair Display", sans-serif'
          },
          'children': []
        },
        {
          'type': 'text',
          'attributes': {
            'font-size': '16px',
            'padding': '10px 25px 10px 25px',
            'line-height': '1.5',
            'align': 'center',
            'color': '#ffffff'
          },
          'data': {
            'value': {
              'content': 'A small river named Duden flows by their place and supplies it with the necessary regelialia.'
            }
          },
          'children': []
        },
        {
          'type': 'button',
          'attributes': {
            'border-radius': '5px',
            'font-weight': '500',
            'background-color': '#ffc0d0',
            'padding': '30px 25px 10px 25px'
          },
          'data': {
            'value': {
              'content': 'Start Shoping'
            }
          },
          'children': []
        }
      ]
    }
  },
  {
    thumbnail: 'https://assets.maocanhua.cn/8f116322-0f33-45cf-9fce-dd32b1a8d0c6-image.png',
    payload: {
      'type': 'hero',
      'attributes': {
        'background-color': '#ffffff',
        'background-position': 'center center',
        'mode': 'fluid-height',
        'padding': '100px 0px 100px 0px',
        'vertical-align': 'top',
        'background-url': 'https://assets.maocanhua.cn/4f5b8349-04d7-47f6-a3df-7f4bc2ce8331-image.png'
      },
      'data': {
        'value': {
          'content': 'We We Create Modern Website\n          \n        \n\n          \n           A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
        }
      },
      'children': [
        {
          'type': 'text',
          'attributes': {
            'font-size': '30px',
            'padding': '10px 25px 10px 25px',
            'line-height': '54px',
            'align': 'center',
            'color': '#ffffff'
          },
          'data': {
            'value': {
              'content': 'We We Create Modern Website'
            }
          },
          'children': []
        },
        {
          'type': 'text',
          'attributes': {
            'font-size': '16px',
            'padding': '10px 25px 10px 25px',
            'line-height': '1.5',
            'align': 'center',
            'color': '#ffffff'
          },
          'data': {
            'value': {
              'content': 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'
            }
          },
          'children': []
        },
        {
          'type': 'image',
          'attributes': {
            'width': '60px',
            'padding-top': '30px',
            'src': 'https://assets.maocanhua.cn/1b7c3c23-4d28-4ca3-84bb-885a582d026c-image.png',
            'target': '_blank',
            'href': 'https://easy-email-m-ryan.vercel.app/'
          },
          'data': {
            'value': {
              'content': ''
            }
          },
          'children': []
        }
      ]
    }
  },
];

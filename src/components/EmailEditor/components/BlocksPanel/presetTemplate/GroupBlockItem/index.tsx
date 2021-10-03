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

const list = [
  {
    thumbnail: 'https://assets.maocanhua.cn/284f98e2-9fda-41f3-ac34-33a62da79a98-image.png',
    payload: {}
  },
  {
    thumbnail: 'https://assets.maocanhua.cn/5de555fe-7fb3-4dff-9fbc-7a68352d0546-image.png',
    payload: {
      'type': 'group',
      'data': {
        'value': {

        }
      },
      'attributes': {
        'vertical-align': 'top',
        'direction': 'ltr'
      },
      'children': [
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attributes': {
            'padding': '0px 0px 0px 0px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': [
            {
              'type': 'image',
              'data': {
                'value': {

                }
              },
              'attributes': {
                'align': 'center',
                'height': 'auto',
                'padding': '0px 5px 0px 10px',
                'src': 'https://assets.maocanhua.cn/2a1dc6bb-d277-48fa-a337-9ccb97d9ea0e-image.png',
                'width': ''
              },
              'children': []
            }
          ]
        },
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attributes': {
            'padding': '0px 0px 0px 0px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': [
            {
              'type': 'image',
              'data': {
                'value': {

                }
              },
              'attributes': {
                'align': 'center',
                'height': 'auto',
                'padding': '0px 10px 0px 5px',
                'src': 'https://assets.maocanhua.cn/45e55c10-2e30-47d8-ad72-5492c42ced71-image.png',
                'width': ''
              },
              'children': []
            }
          ]
        }
      ]
    }
  },
  {
    thumbnail: 'https://assets.maocanhua.cn/b6e29bf0-8b56-4515-ae74-f19dc33d615c-image.png',
    payload: {
      'type': 'group',
      'data': {
        'value': {

        }
      },
      'attributes': {
        'vertical-align': 'top',
        'direction': 'ltr',
        'background-color': '#ffffff'
      },
      'children': [
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attributes': {
            'padding': '0px 5px 0px 5px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': [
            {
              'type': 'image',
              'data': {
                'value': {

                }
              },
              'attributes': {
                'align': 'center',
                'height': 'auto',
                'padding': '0px 0px 0px 0px',
                'src': 'https://assets.maocanhua.cn/2a1dc6bb-d277-48fa-a337-9ccb97d9ea0e-image.png',
                'width': ''
              },
              'children': []
            },
            {
              'type': 'text',
              'data': {
                'value': {
                  'content': 'Office Room\nPrinting'
                }
              },
              'attributes': {
                'font-size': '18px',
                'padding': '10px 5px 10px 5px',
                'line-height': 1,
                'align': 'center'
              },
              'children': []
            }
          ]
        },
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attributes': {
            'padding': '0px 5px 0px 5px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': [
            {
              'type': 'image',
              'data': {
                'value': {

                }
              },
              'attributes': {
                'align': 'center',
                'height': 'auto',
                'padding': '0px 0px 0px 0px',
                'src': 'https://assets.maocanhua.cn/4b1595cd-a1f1-48a5-ad8c-5e6198d48c92-image.png',
                'width': ''
              },
              'children': []
            },
            {
              'type': 'text',
              'data': {
                'value': {
                  'content': 'Workplace\nDesign<div><br></div>'
                }
              },
              'attributes': {
                'font-size': '18px',
                'padding': '10px 5px 10px 5px',
                'line-height': 1,
                'align': 'center'
              },
              'children': []
            }
          ]
        },
        {
          'type': 'column',
          'data': {
            'value': {

            }
          },
          'attributes': {
            'padding': '0px 5px 0px 5px',
            'border': 'none',
            'vertical-align': 'top'
          },
          'children': [
            {
              'type': 'image',
              'data': {
                'value': {

                }
              },
              'attributes': {
                'align': 'center',
                'height': 'auto',
                'padding': '0px 0px 0px 0px',
                'src': 'https://assets.maocanhua.cn/45e55c10-2e30-47d8-ad72-5492c42ced71-image.png',
                'width': ''
              },
              'children': []
            },
            {
              'type': 'text',
              'data': {
                'value': {
                  'content': 'Modern Design\nBranding'
                }
              },
              'attributes': {
                'font-size': '18px',
                'padding': '10px 5px 10px 5px',
                'line-height': 1,
                'align': 'center'
              },
              'children': []
            }
          ]
        }
      ]
    }
  },

];

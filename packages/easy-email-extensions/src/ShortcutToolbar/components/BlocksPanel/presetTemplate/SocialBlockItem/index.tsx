import React from 'react';
import { AdvancedType } from 'easy-email-core';
import { Stack } from 'easy-email-editor';

import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';
import { getImg } from '@extensions/ShortcutToolbar/utils/getImg';
import { Picture } from '@extensions/ShortcutToolbar/components/Picture';

const list = [
  {
    thumbnail: getImg('IMAGE_52'),
    payload: {
      type: AdvancedType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('IMAGE_53'),
              content: 'Facebook',
            },
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('IMAGE_54'),
              content: 'Google',
            },
            {
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('IMAGE_55'),
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
  {
    thumbnail: getImg('IMAGE_71'),
    payload: {
      type: AdvancedType.SOCIAL,
      data: {
        value: {
          elements: [
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('IMAGE_53'),
              content: '',
            },
            {
              href: '#',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('IMAGE_54'),
              content: '',
            },
            {
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('IMAGE_55'),
              content: '',
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
              type={AdvancedType.SOCIAL}
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

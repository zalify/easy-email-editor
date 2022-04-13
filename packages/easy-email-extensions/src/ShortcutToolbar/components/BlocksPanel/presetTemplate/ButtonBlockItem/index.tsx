import React from 'react';
import { Stack } from 'easy-email-editor';
import { AdvancedType, IButton, RecursivePartial } from 'easy-email-core';
import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';
import { getImg } from '@extensions/ShortcutToolbar/utils/getImg';
import { Picture } from '@extensions/ShortcutToolbar/components/Picture';

const buttonList = [
  {
    thumbnail: getImg('IMAGE_11'),
    payload: {
      attributes: {
        align: 'center',
        'background-color': '#8ccaca',
        color: '#ffffff',
        'font-size': '12px',
        'font-weight': 'normal',
        'border-radius': '0px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '10px 25px 10px 25px',
        'line-height': '120%',
        target: '_blank',
        'vertical-align': 'middle',
        border: 'none',
        'text-align': 'center',
        href: '#',
      },
      data: {
        value: {
          content: 'READ MORE',
        },
      },
    },
  },
  {
    thumbnail: getImg('IMAGE_12'),
    payload: {
      type: 'button',
      attributes: {
        align: 'center',
        'background-color': 'transparent',
        color: '#000000',
        'font-size': '12px',
        'font-weight': 'normal',
        'border-radius': '0px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '10px 25px 10px 25px',
        'line-height': '120%',
        target: '_blank',
        'vertical-align': 'middle',
        border: '2px solid #000',
        'text-align': 'center',
        href: '#',
      },
      data: {
        value: {
          content: 'READ MORE',
        },
      },
      children: [],
    },
  },
  {
    thumbnail: getImg('IMAGE_13'),
    payload: {
      type: 'button',
      attributes: {
        align: 'center',
        'background-color': 'transparent',
        color: '#ffffff',
        'font-size': '12px',
        'font-weight': 'normal',
        'border-radius': '0px',
        padding: '10px 25px 10px 25px',
        'inner-padding': '10px 25px 10px 25px',
        'line-height': '120%',
        target: '_blank',
        'vertical-align': 'middle',
        border: '2px dashed #ffffff',
        'text-align': 'center',
        href: '#',
        'container-background-color': '#97c0f0',
      },
      data: {
        value: {
          // eslint-disable-next-line quotes
          content: "Let's Go",
        },
      },
      children: [],
    },
  },
];

export function ButtonBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {buttonList.map((item, index) => {
          return (
            <Stack key={index} alignment='center'>
              <Stack.Item fill>
                <BlockMaskWrapper
                  type={AdvancedType.BUTTON}
                  payload={
                    {
                      ...item.payload,
                    } as RecursivePartial<IButton>
                  }
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
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
              </Stack.Item>
            </Stack>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

import React from 'react';
import { AdvancedType, IImage, RecursivePartial } from 'easy-email-core';
import { Stack } from 'easy-email-editor';

import { BlockMaskWrapper } from '@extensions/ShortcutToolbar/components/BlockMaskWrapper';
import { getImg } from '@extensions/ShortcutToolbar/utils/getImg';
import { Picture } from '@extensions/ShortcutToolbar/components/Picture';

const imageList = [
  getImg('IMAGE_39'),
  getImg('IMAGE_40'),
  getImg('IMAGE_41'),
  getImg('IMAGE_42'),
  getImg('IMAGE_43'),
  getImg('IMAGE_44'),
  getImg('IMAGE_45'),
];

export function ImageBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {imageList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={AdvancedType.IMAGE}
              payload={
                {
                  attributes: {
                    src: item,
                    padding: '0px 0px 0px 0px',
                  },
                } as RecursivePartial<IImage>
              }
            >
              <div style={{ position: 'relative' }}>
                <Picture src={item} />
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

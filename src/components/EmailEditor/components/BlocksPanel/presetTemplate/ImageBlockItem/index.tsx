import { IMAGE_LIST } from '@/assets/image';
import { IImage } from '@/components/core/blocks/basic/Image';
import { BlockMaskWrapper } from '@/components/core/wrapper/BlockMaskWrapper';
import { Picture } from '@/components/UI/Picture';
import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';

const imageList = [
  IMAGE_LIST.IMAGE_39,
  IMAGE_LIST.IMAGE_40,
  IMAGE_LIST.IMAGE_41,
  IMAGE_LIST.IMAGE_42,
  IMAGE_LIST.IMAGE_43,
  IMAGE_LIST.IMAGE_44,
  IMAGE_LIST.IMAGE_45,
];

export function ImageBlockItem() {
  return (
    <Stack.Item fill>
      <Stack vertical>
        {imageList.map((item, index) => {
          return (
            <BlockMaskWrapper
              key={index}
              type={BasicType.IMAGE}
              payload={
                {
                  attributes: {
                    src: item,
                    padding: '0px 0px 0px 0px',
                  },
                } as RecursivePartial<IImage>
              }
            >
              <ShadowDom>
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
              </ShadowDom>
            </BlockMaskWrapper>
          );
        })}
      </Stack>
    </Stack.Item>
  );
}

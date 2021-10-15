import { IMAGE_LIST } from '@/assets/image';
import { BlocksMap } from '@/components/core/blocks';
import {
  BlockAvatarWrapper,
  BlockAvatarWrapperProps,
} from '@/components/core/wrapper/BlockAvatarWrapper';
import { Picture } from '@/components/UI/Picture';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { BasicType } from '@/constants';
import { Button } from 'antd';

import React, { useState } from 'react';

const Section = BlocksMap.findBlockByType(BasicType.SECTION);
const Column = BlocksMap.findBlockByType(BasicType.COLUMN);

export function ColumnBlockIconPanel() {
  return (
    <Stack vertical spacing='tight'>
      <OneColumn />
      <TwoColumns />
      <ThreeColumns />
      <FourColumn />
      <Stack.Item />
      <Stack.Item />
    </Stack>
  );
}

function OneColumn() {
  const payload = {
    children: [Column.create()],
  };

  return (
    <Stack vertical spacing='tight'>
      <Stack distribution='equalSpacing'>
        <TextStyle>1 column</TextStyle>
      </Stack>
      <ColumnBlockIcon payload={payload} avatar={IMAGE_LIST.IMAGE_60} />
    </Stack>
  );
}

function TwoColumns() {
  const [visible, setVisible] = useState(false);

  const scales = [
    {
      avatar: IMAGE_LIST.IMAGE_61,
      scale: [undefined, undefined],
    },
    {
      avatar: IMAGE_LIST.IMAGE_62,
      scale: [25, 75],
    },
    {
      avatar: IMAGE_LIST.IMAGE_63,
      scale: [33.3, 66.7],
    },
    {
      avatar: IMAGE_LIST.IMAGE_64,
      scale: [66.7, 33.3],
    },
    {
      avatar: IMAGE_LIST.IMAGE_65,
      scale: [75, 25],
    },
  ];

  const options = scales.map((scale) => ({
    payload: {
      children: [
        Column.create({
          attributes: {
            width: scale.scale[0] ? +scale.scale[0] + '%' : undefined,
          },
        }),
        Column.create({
          attributes: {
            width: scale.scale[1] ? +scale.scale[1] + '%' : undefined,
          },
        }),
      ],
    },
    avatar: scale.avatar,
  }));

  return (
    <Stack vertical spacing='tight'>
      <Stack distribution='equalSpacing'>
        <TextStyle>2 column</TextStyle>
        <Button type='link' onClick={() => setVisible((v) => !v)}>
          {visible ? 'Show less options' : 'Show more options'}
        </Button>
      </Stack>
      <ColumnBlockIcon
        payload={options[0].payload}
        avatar={options[0].avatar}
      />
      {
        <div
          style={{
            maxHeight: visible ? 300 : 0,
            overflow: 'hidden',
            transition: 'all .4s',
          }}
        >
          <Stack vertical spacing='tight'>
            {options.slice(1).map((option, index) => (
              <ColumnBlockIcon
                key={index}
                payload={option.payload}
                avatar={option.avatar}
              />
            ))}
          </Stack>
        </div>
      }
    </Stack>
  );
}

function ThreeColumns() {
  const [visible, setVisible] = useState(false);

  const scales = [
    {
      avatar: IMAGE_LIST.IMAGE_66,
      scale: [undefined, undefined, undefined],
    },
    {
      avatar: IMAGE_LIST.IMAGE_67,
      scale: [25, 25, 50],
    },
    {
      avatar: IMAGE_LIST.IMAGE_68,
      scale: [25, 50, 25],
    },
    {
      avatar: IMAGE_LIST.IMAGE_69,
      scale: [50, 25, 25],
    },
  ];

  const options = scales.map((scale) => ({
    avatar: scale.avatar,
    payload: {
      children: [
        Column.create({
          attributes: {
            width: scale.scale[0] ? +scale.scale[0] + '%' : undefined,
          },
        }),
        Column.create({
          attributes: {
            width: scale.scale[1] ? +scale.scale[1] + '%' : undefined,
          },
        }),
        Column.create({
          attributes: {
            width: scale.scale[2] ? +scale.scale[2] + '%' : undefined,
          },
        }),
      ],
    },
  }));

  return (
    <Stack vertical spacing='tight'>
      <Stack distribution='equalSpacing'>
        <TextStyle>3 column</TextStyle>
        <Button type='link' onClick={() => setVisible((v) => !v)}>
          {visible ? 'Show less options' : 'Show more options'}
        </Button>
      </Stack>
      <ColumnBlockIcon
        payload={options[0].payload}
        avatar={options[0].avatar}
      />

      <div
        style={{
          maxHeight: visible ? 300 : 0,
          overflow: 'hidden',
          transition: 'all .4s',
        }}
      >
        <Stack vertical spacing='tight'>
          {options.slice(1).map((option, index) => (
            <ColumnBlockIcon
              key={index}
              payload={option.payload}
              avatar={option.avatar}
            />
          ))}
        </Stack>
      </div>
    </Stack>
  );
}

function FourColumn() {
  const payload = {
    children: [
      Column.create(),
      Column.create(),
      Column.create(),
      Column.create(),
    ],
  };
  return (
    <Stack vertical spacing='tight'>
      <Stack distribution='equalSpacing'>
        <TextStyle>4 column</TextStyle>
      </Stack>
      <ColumnBlockIcon payload={payload} avatar={IMAGE_LIST.IMAGE_70} />
    </Stack>
  );
}

export function ColumnBlockIcon(
  props: Omit<BlockAvatarWrapperProps, 'type'> & { avatar: string }
) {
  return (
    <BlockAvatarWrapper type={BasicType.SECTION} {...props}>
      <Picture style={{ height: 40, width: '100%' }} src={props.avatar} />
    </BlockAvatarWrapper>
  );
}

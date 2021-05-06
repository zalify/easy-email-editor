import { BlocksMap } from '@/components/core/blocks';
import { ILayout } from '@/components/core/blocks/custom/Layout';
import {
  BlockAvatarWrapper,
  BlockAvatarWrapperProps,
} from '@/components/core/wrapper/BlockAvatarWrapper';
import { Picture } from '@/components/Picture';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
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
  const payload: Partial<ILayout> = {
    children: [
      Section.createInstance({
        children: [Column.createInstance()],
      }),
    ],
  };

  return (
    <Stack vertical spacing='tight'>
      <Stack distribution='equalSpacing'>
        <TextStyle>1 column</TextStyle>
      </Stack>
      <ColumnBlockIcon
        payload={payload}
        avatar={'https://assets.maocanhua.cn/Flkau7Ob6TlzE9AxAkTLQ4aC6l5_'}
      />
    </Stack>
  );
}

function TwoColumns() {
  const [visible, setVisible] = useState(false);

  const scales = [
    {
      avatar: 'https://assets.maocanhua.cn/Fhs9SLF6TcjwGZ3JZMVL6iuzhvuw',
      scale: [undefined, undefined],
    },
    {
      avatar: 'https://assets.maocanhua.cn/FiwjNQm0nuKeybGAEwfUEQK616-z',
      scale: [25, 75],
    },
    {
      avatar: 'https://assets.maocanhua.cn/Fjey4SZkZNj6_9xN5xEIxkXqq2q1',
      scale: [33.3, 66.7],
    },
    {
      avatar: 'https://assets.maocanhua.cn/Fki_hVmq51kjjt8ydA8gQw4AuL6Q',
      scale: [66.7, 33.3],
    },
    {
      avatar: 'https://assets.maocanhua.cn/FlnB5Xq-3Cw_scqWv7NTe7VSaSl7',
      scale: [75, 25],
    },
  ];

  const options = scales.map((scale) => ({
    payload: {
      children: [
        Section.createInstance({
          children: [
            Column.createInstance({
              attributes: {
                width: scale.scale[0] ? +scale.scale[0] + '%' : undefined,
              },
            }),
            Column.createInstance({
              attributes: {
                width: scale.scale[1] ? +scale.scale[1] + '%' : undefined,
              },
            }),
          ],
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
      avatar: 'https://assets.maocanhua.cn/Fruky5Aii829hZuLeg5VtR9IwTMP',
      scale: [undefined, undefined, undefined],
    },
    {
      avatar: 'https://assets.maocanhua.cn/FloLcOZ_7YJ1S3kranpA7tOnSVhB',
      scale: [25, 25, 50],
    },
    {
      avatar: 'https://assets.maocanhua.cn/Fm68ZvFvWSfAQXG2CatVDGykHUhv',
      scale: [25, 50, 25],
    },
    {
      avatar: 'https://assets.maocanhua.cn/FmfbOoulGj13LGxYKPVm0noVLodV',
      scale: [50, 25, 25],
    },
  ];

  const options = scales.map((scale) => ({
    avatar: scale.avatar,
    payload: {
      children: [
        Section.createInstance({
          children: [
            Column.createInstance({
              attributes: {
                width: scale.scale[0] ? +scale.scale[0] + '%' : undefined,
              },
            }),
            Column.createInstance({
              attributes: {
                width: scale.scale[1] ? +scale.scale[1] + '%' : undefined,
              },
            }),
            Column.createInstance({
              attributes: {
                width: scale.scale[2] ? +scale.scale[2] + '%' : undefined,
              },
            }),
          ],
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
  const payload: Partial<ILayout> = {
    children: [
      Section.createInstance({
        children: [
          Column.createInstance(),
          Column.createInstance(),
          Column.createInstance(),
          Column.createInstance(),
        ],
      }),
    ],
  };
  return (
    <Stack vertical spacing='tight'>
      <Stack distribution='equalSpacing'>
        <TextStyle>4 column</TextStyle>
      </Stack>
      <ColumnBlockIcon
        payload={payload}
        avatar={'https://assets.maocanhua.cn/Foz01zhkb0U_LVKi8c4NhBFPqLDe'}
      />
    </Stack>
  );
}

export function ColumnBlockIcon(
  props: Omit<BlockAvatarWrapperProps, 'type'> & { avatar: string }
) {
  return (
    <BlockAvatarWrapper type={BasicType.WRAPPER} {...props}>
      <Picture style={{ height: 40 }} src={props.avatar} />
    </BlockAvatarWrapper>
  );
}

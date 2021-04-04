import { BlocksMap } from '@/components/core/blocks';
import { ILayout } from '@/components/core/blocks/custom/Layout';
import { BlockAvatorWrapper, BlockAvatorWrapperProps } from '@/components/core/wrapper/BlockAvatorWrapper';
import { Picture } from '@/components/Picture';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { CustomType } from '@/constants';
import { Button } from 'antd';

import React, { useState } from 'react';

export function ColumnBlockIconPanel() {

  return (
    <Stack vertical spacing="tight">
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
      BlocksMap.Section.createInstance({
        children: [
          BlocksMap.Column.createInstance()
        ]
      })
    ]
  };

  return (
    <Stack vertical spacing="tight">
      <Stack distribution="equalSpacing">
        <TextStyle>
          1 column
        </TextStyle>
      </Stack>
      <ColumnBlockIcon payload={payload} avatar={'https://assets.maocanhua.cn/Flkau7Ob6TlzE9AxAkTLQ4aC6l5_'} />

    </Stack>
  );
}

function TwoColumns() {
  const [visible, setVisible] = useState(false);

  const options: Array<Partial<ILayout>> = [

    {
      children: [
        BlocksMap.Section.createInstance({
          children: [
            BlocksMap.Column.createInstance(),
            BlocksMap.Column.createInstance(),
          ]
        })
      ]
    }

  ];

  return (
    <Stack vertical spacing="tight">
      <Stack distribution="equalSpacing">
        <TextStyle>
          2 column
        </TextStyle>
        <Button type="link" onClick={() => setVisible(v => !v)}>Show more options</Button>
      </Stack>
      <ColumnBlockIcon payload={options[0]} avatar={'https://assets.maocanhua.cn/Fhs9SLF6TcjwGZ3JZMVL6iuzhvuw'} />
      {
        <div style={{ maxHeight: visible ? 300 : 0, overflow: 'hidden', transition: 'all .4s' }}>
          <Stack vertical spacing="tight">
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/FiwjNQm0nuKeybGAEwfUEQK616-z'} />
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/Fjey4SZkZNj6_9xN5xEIxkXqq2q1'} />
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/Fki_hVmq51kjjt8ydA8gQw4AuL6Q'} />
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/FlnB5Xq-3Cw_scqWv7NTe7VSaSl7'} />
          </Stack>
        </div>
      }
    </Stack>
  );
}

function ThreeColumns() {
  const [visible, setVisible] = useState(false);
  return (
    <Stack vertical spacing="tight">
      <Stack distribution="equalSpacing">
        <TextStyle>
          3 column
        </TextStyle>
        <Button type="link" onClick={() => setVisible(v => !v)}>Show more options</Button>
      </Stack>
      <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/Fruky5Aii829hZuLeg5VtR9IwTMP'} />
      {
        <div style={{ maxHeight: visible ? 300 : 0, overflow: 'hidden', transition: 'all .4s' }}>
          <Stack vertical spacing="tight">
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/FloLcOZ_7YJ1S3kranpA7tOnSVhB'} />
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/Fm68ZvFvWSfAQXG2CatVDGykHUhv'} />
            <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/FmfbOoulGj13LGxYKPVm0noVLodV'} />
          </Stack>
        </div>
      }
    </Stack>
  );
}

function FourColumn() {
  return (
    <Stack vertical spacing="tight">
      <Stack distribution="equalSpacing">
        <TextStyle>
          4 column
        </TextStyle>
      </Stack>
      <ColumnBlockIcon avatar={'https://assets.maocanhua.cn/Foz01zhkb0U_LVKi8c4NhBFPqLDe'} />

    </Stack>
  );
}

export function ColumnBlockIcon(props: Omit<BlockAvatorWrapperProps, 'type'> & { avatar: string; }) {
  return (
    <BlockAvatorWrapper type={CustomType.LAYOUT} {...props}>
      <Picture style={{ height: 40 }} src={props.avatar} />
    </BlockAvatorWrapper>

  );
}


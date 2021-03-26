import React from 'react';
import { IBlockData } from '@/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { RenderItem } from '@/Renderer/components/RenderItem';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<IBlockData<IPage>>(props.idx);
  const { children } = field.value;

  return (
    <RenderBlockWrapper idx={props.idx}>
      <main>
        {children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <RenderItem key={childIndex} idx={childIndex} />;
        })}
      </main>
    </RenderBlockWrapper>
  );
}

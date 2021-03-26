import React from 'react';
import { IBlockData } from '@/typings';
import { IBox } from '..';
import { useField } from 'formik';
import { RenderItem } from '@/Renderer/components/RenderItem';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<IBlockData<IBox>>(props.idx);
  return (
    <RenderBlockWrapper idx={props.idx}>
      <div>
        {field.value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <RenderItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </RenderBlockWrapper>
  );
}

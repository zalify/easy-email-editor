import React from 'react';
import { IBlockData } from '@/typings';
import { ISection } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<IBlockData<ISection>>(props.idx);
  return (
    <EditBlockWrapper idx={props.idx}>
      <div>
        {field.value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </EditBlockWrapper>
  );
}

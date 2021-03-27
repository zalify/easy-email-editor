import React from 'react';
import { IBlockData } from '@/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<IBlockData<IPage>>(props.idx);
  const { children } = field.value;

  return (
    <EditBlockWrapper idx={props.idx}>
      <div style={{ minHeight: '100%' }}>
        <style>
          {
            `
         [data-node-type="page"] table,
         [data-node-type="page"] td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
          }

          [data-node-type="page"] img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
          }

          [data-node-type="page"] p {
            display: block;
            margin: 13px 0;
          }

          `
          }
        </style>
        {children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </EditBlockWrapper>
  );
}

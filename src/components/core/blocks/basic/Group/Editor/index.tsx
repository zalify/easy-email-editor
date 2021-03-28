import React from 'react';
import { IGroup } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute } }] = useField<IGroup>(props.idx);
  return (
    <EditBlockWrapper idx={props.idx}>
      <div className="mj-column-per-100 mj-outlook-group-fix mj-group" style={{ 'fontSize': '0', 'lineHeight': '0', 'textAlign': 'left', 'display': 'inline-block', 'direction': attribute.direction, minHeight: 30, backgroundColor: attribute['background-color'], width: attribute.width || '100%' }}>

        {value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return (
            <div key={childIndex} className="mj-column-per-50 mj-outlook-group-fix" style={{ 'fontSize': '0px', 'textAlign': 'left', 'direction': 'ltr', 'display': 'inline-block', 'verticalAlign': attribute['vertical-align'], 'width': (100 / value.children.length).toFixed(0) + '%', }}>
              <EditorItem idx={childIndex} />;
            </div>
          );

        })}
      </div>
    </EditBlockWrapper>
  );
}

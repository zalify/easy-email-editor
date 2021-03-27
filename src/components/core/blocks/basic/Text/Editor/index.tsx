import React from 'react';
import { IText } from '..';
import { useField } from 'formik';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute } }] = useField<IText>(props.idx);

  return (
    <EditBlockWrapper idx={props.idx}>
      <div style={{
        color: attribute.color,
        fontFamily: attribute['font-family'],
        fontSize: attribute['font-size'],
        fontStyle: attribute['font-style'],
        fontWeight: attribute['font-weight'],
        letterSpacing: attribute['letter-spacing'],
        height: attribute['height'],
        textDecoration: attribute['text-decoration'],
        textTransform: attribute['text-transform'],
        textAlign: attribute['align'],
        backgroundColor: attribute['container-background-color'],
        width: attribute['width'],
        paddingTop: attribute['padding-top'],
        paddingBottom: attribute['padding-bottom'],
        paddingLeft: attribute['padding-left'],
        paddingRight: attribute['padding-right'],
      }}
      >
        {value.data.value}
      </div>
    </EditBlockWrapper>
  );
}

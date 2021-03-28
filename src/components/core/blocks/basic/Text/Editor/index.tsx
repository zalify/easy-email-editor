import React, { useMemo } from 'react';
import { IText } from '..';
import { useField } from 'formik';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute, data } }] = useField<IText>(props.idx);

  const content = useMemo(() => {
    if (data.value.title) {
      return React.createElement(data.value.title, { children: data.value.content });
    }
    return data.value.content;
  }, [data.value.content, data.value.title]);

  return (
    <EditBlockWrapper idx={props.idx}>

      <tr>
        <td align={attribute['align']} class="mj-text" style={{ 'fontSize': '0px', 'padding': '0', 'wordBreak': 'break-word' }}>
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

            {content}
          </div>
        </td>
      </tr>

    </EditBlockWrapper>
  );
}

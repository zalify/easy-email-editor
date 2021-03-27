import React from 'react';
import { IBlockData } from '@/typings';
import { ISection } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';
import mjml2html from 'mjml-browser/lib/index';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute } }] = useField<ISection>(props.idx);
  return (
    <EditBlockWrapper idx={props.idx}>
      <div style={{
        backgroundColor: attribute['background-color'],
        backgroundRepeat: attribute['background-repeat'],
        backgroundPosition: attribute['background-position'],
        backgroundSize: attribute['background-size'],
        backgroundImage: attribute['background-url'] ? `url(${attribute['background-url']})` : undefined,
        maxWidth: attribute['max-width'],
      }}
      >
        <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td style={{
                direction: attribute.direction,
                fontSize: '0px',
                paddingTop: attribute['padding-top'],
                paddingBottom: attribute['padding-bottom'],
                paddingLeft: attribute['padding-left'],
                paddingRight: attribute['padding-right'],
                textAlign: attribute['text-align'],
                border: attribute.border,
                borderRadius: attribute['border-radius']
              }}
              >
                {value.children.map((item, index) => {
                  const childIndex = `${props.idx}.children.[${index}]`;
                  return <EditorItem key={childIndex} idx={childIndex} />;
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </EditBlockWrapper>
  );
}

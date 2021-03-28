import React from 'react';
import { IColumn } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';
import { BasicType } from '@/constants';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute } }] = useField<IColumn>(props.idx);
  return (
    <EditBlockWrapper idx={props.idx}>
      <div className="mj-column-per-100 mj-outlook-group-fix" style={
        {
          'fontSize': '0px', 'textAlign': 'left', 'direction': 'ltr', 'display': 'inline-block', 'verticalAlign': 'top', 'width': attribute.width || '100%',
          minHeight: value.children.length > 0 ? undefined : 30,
        }
      }
      >
        <table border="0" cellPadding="0"
          cellSpacing="0" role="presentation"
          style={{
            'verticalAlign': 'top',
            border: attribute.border,
          }}
          width="100%"
        >

          <tbody>
            <tr>
              <td style={
                {
                  backgroundColor: attribute['background-color'],
                  border: attribute.border,
                  borderRadius: attribute['border-radius'],
                  verticalAlign: attribute['vertical-align'],
                  paddingTop: attribute['padding-top'],
                  paddingBottom: attribute['padding-bottom'],
                  paddingLeft: attribute['padding-left'],
                  paddingRight: attribute['padding-right'],
                }
              }
              >
                {value.children.map((item, index) => {
                  const childIndex = `${props.idx}.children.[${index}]`;
                  if (item.type === BasicType.TEXT) {
                    console.log('item.attribute.align', item.attribute.align);
                  }
                  return (
                    <table key={childIndex} border="0"
                      cellPadding="0" cellSpacing="0"
                      role="presentation"
                      style={{ border: attribute['inner-border'], borderRadius: attribute['inner-border-radius'] }}
                    >
                      <tbody>
                        <tr>
                          <td align={item.attribute.align} style={{ 'fontSize': '0px', 'padding': '0', 'wordBreak': 'break-word' }}>
                            <EditorItem idx={childIndex} />
                          </td>
                        </tr>
                      </tbody>

                    </table>
                  );
                })}

              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </EditBlockWrapper>
  );
}


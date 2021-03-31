import React from 'react';
import { IImage } from '..';
import { useField } from 'formik';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value, value: { attribute } }] = useField<IImage>(props.idx);

  return (
    <EditBlockWrapper idx={props.idx}>

      <table border="0" cellPadding="0" cellSpacing="0" role="presentation" style={{ 'borderCollapse': 'collapse', 'borderSpacing': '0px' }} className="mj-full-width-mobile">
        <tbody>
          <tr>
            <td style={{
              height: attribute.height,
            }} className="mj-full-width-mobile"
            >
              {
                attribute.src ? (
                  <a href={attribute.href} onClick={(e) => e.preventDefault()}>
                    <img height={attribute.height} src={attribute.src} style={{ 'border': '0', 'display': 'block', 'outline': 'none', 'textDecoration': 'none', 'height': attribute.height, 'width': attribute.width, }} width={attribute.width} />
                  </a>
                ) : <img height={attribute.height} src={attribute.src} style={{ 'border': '0', 'display': 'block', 'outline': 'none', 'textDecoration': 'none', 'height': attribute.height, 'width': attribute.width, }} width={attribute.width} alt={attribute.alt} title={attribute.title} />

              }

            </td>
          </tr>
        </tbody>
      </table>
    </EditBlockWrapper>
  );
}

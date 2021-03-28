import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';
import { getChildIdx, getNodeIdxClassName, getNodeTypeClassName } from './block';

export function transformToMjml(data: IBlockData, idx: string): string {
  const att = {
    ...data.attribute,
    'css-class': getNodeIdxClassName(idx) + ' ' + getNodeTypeClassName(data.type)
  };
  const attributeStr = Object.keys(att).map(key => `${key}="${att[key]}"`).join(' ');
  const children = data.children.map((child, index) => transformToMjml(child, getChildIdx(idx, index)));
  switch (data.type) {
    case BasicType.PAGE:
      return (
        `
        <mjml>
          <mj-head>
            <mj-breakpoint width="0px" />
          </mj-head>
          <mj-body ${attributeStr}>
            ${children}
          </mj-body>
        </mjml>
        `
      );
    case BasicType.SECTION:
      return (
        `
          <mj-section ${attributeStr}>
           ${children}
          </mj-section>
        `
      );
    case BasicType.COLUMN:
      return (
        `
          <mj-column ${attributeStr}>
           ${children}
          </mj-column>
        `
      );
    case BasicType.GROUP:
      return (
        `
          <mj-group ${attributeStr}>
           ${children}
          </mj-group>
        `
      );
    case BasicType.IMAGE:
      return (
        `
          <mj-image ${attributeStr}>
           ${children}
          </mj-image>
        `
      );
    case BasicType.TEXT:
      return (
        `
          <mj-text ${attributeStr}>
          ${data.data.value?.content}
          </mj-text>
        `
      );
  }

  return '';

}
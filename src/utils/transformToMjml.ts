import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';
import { getChildIdx, getNodeIdxClassName, getNodeTypeClassName } from './block';
import { classnames } from './classnames';

export function transformToMjml(data: IBlockData, idx?: string): string {
  const att = {
    ...data.attribute,
  };
  if (idx) {
    att['css-class'] = classnames('email-block', getNodeIdxClassName(idx), getNodeTypeClassName(data.type));
  }
  const attributeStr = Object.keys(att).map(key => `${key}="${att[key]}"`).join(' ');
  const children = data.children.map((child, index) => transformToMjml(child, idx ? getChildIdx(idx, index) : undefined));
  switch (data.type) {
    case BasicType.PAGE:
      return (
        `
        <mjml>
          <mj-head>
            <mj-breakpoint width="${data.data.value.breakpoint}" />
          </mj-head>
          <mj-body ${attributeStr}>
            ${children}
          </mj-body>
        </mjml>
        `
      );
    case BasicType.WRAPPER:
      return (
        `
          <mj-wrapper ${attributeStr}>
           ${children}
          </mj-wrapper>
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
    case BasicType.BUTTON:
      return (
        `
          <mj-button ${attributeStr}>
          ${data.data.value?.content}
          </mj-button>
        `
      );
    case BasicType.DIVIDER:
      return (
        `
          <mj-divider ${attributeStr} />
        `
      );
  }

  return '';

}
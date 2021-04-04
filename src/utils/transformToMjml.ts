import { BasicType, CustomType } from '@/constants';
import { IBlockData } from '@/typings';
import { getChildIdx, getNodeIdxClassName, getNodeTypeClassName } from './block';
import { classnames } from './classnames';

export function transformToMjml(data: IBlockData, idx?: string): string {
  const att = {
    ...data.attribute
  };
  const isTest = !!idx;
  if (isTest) {
    att['css-class'] = classnames('email-block', getNodeIdxClassName(idx), getNodeTypeClassName(data.type));
  }
  const attributeStr = Object.keys(att).map(key => `${key}="${att[key]}"`).join(' ');
  const children = data.children.map((child, index) => transformToMjml(child, idx ? getChildIdx(idx, index) : undefined)).join('\n');

  const placeholder = isTest ? `
                    <mj-image width="150px" height="150px" src="https://assets.maocanhua.cn/FgsKCRd2a-9R3RD6UEtYgvlskg6L" />
                    <mj-text color="rgb(85, 85, 85)" font-size="16px" align="center">Drop a content block here</mj-text>
                      ` : '';

  switch (data.type) {
    case BasicType.PAGE:
      const breakpoint = data.data.value.breakpoint ? `<mj-breakpoint width="${data.data.value.breakpoint}" />` : '';
      return (
        `
        <mjml>
          <mj-head>
          ${breakpoint}
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
        `<mj-section ${attributeStr}> ${children} </mj-section>`
      );
    case BasicType.COLUMN:
      return (
        `
          <mj-column ${attributeStr}>
           ${children || placeholder}
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
        `<mj-button ${attributeStr}> ${data.data.value?.content}</mj-button>`
      );
    case BasicType.DIVIDER:
      return (
        `
          <mj-divider ${attributeStr} />
        `
      );
    case BasicType.SPACER:
      return (
        `
          <mj-spacer ${attributeStr} />
        `
      );
    case BasicType.RAW:
      return (
        `
          <mj-raw ${attributeStr}>${data.data.value?.content}</mj-raw>
        `
      );
    case CustomType.LAYOUT:
      return (
        `
          <mj-wrapper  ${attributeStr}>${children}</mj-wrapper >
        `
      );

  }

  throw new Error(`No match block ${JSON.stringify(data)}`);

}
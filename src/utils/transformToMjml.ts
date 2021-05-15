import { BlocksMap } from '@/components/core/blocks';
import { ICarousel } from '@/components/core/blocks/basic/Carousel';
import { INavbar } from '@/components/core/blocks/basic/Navbar';
import { IPage } from '@/components/core/blocks/basic/Page';
import { ISocial } from '@/components/core/blocks/basic/Social';
import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';
import {
  getChildIdx,
  getNodeIdxClassName,
  getNodeTypeClassName,
} from './block';
import { classnames } from './classnames';

export function transformToMjml(data: IBlockData, idx?: string): string {
  if (data?.data?.hidden) return '';

  const att = {
    ...data.attributes,
  };

  const isTest = !!idx;
  if (isTest) {
    att['css-class'] = classnames(
      att['css-class'],
      'email-block',
      getNodeIdxClassName(idx!),
      getNodeTypeClassName(data.type)
    );
  }
  const attributeStr = Object.keys(att)
    .map((key) => `${key}="${att[key]}"`)
    .join(' ');

  const block = BlocksMap.findBlockByType(data.type);

  if (block.transform) {
    const transformData = block.transform(data, idx);
    att['css-class'] = classnames(
      att['css-class'],
      transformData['css-class'],
    );
    return transformToMjml({
      ...transformData,
      attributes: {
        ...transformData.attributes,
        'css-class': att['css-class']
      }
    });
  }

  const children = data.children
    .map((child, index) =>
      transformToMjml(child, idx ? getChildIdx(idx, index) : undefined)
    )
    .join('\n');

  const placeholder = isTest
    ? `
        <mj-image width="150px" src="https://assets.maocanhua.cn/Fn56mk7TdHP6qJOf1xTLzDx_Y3iW" />
      `
    : '';

  switch (data.type) {
    case BasicType.PAGE:
      const value: IPage['data']['value'] = data.data.value;
      const breakpoint = value.breakpoint
        ? `<mj-breakpoint width="${data.data.value.breakpoint}" />`
        : '';

      return `
        <mjml>
          <mj-head>
              ${breakpoint}
            <mj-attributes>
              ${value.headAttributes}
              ${value['font-family'] ? `<mj-all font-family="${value['font-family']}" />` : ''}
              ${value['text-color'] ? `<mj-text color="${value['text-color']}" />` : ''}
              ${value.fonts?.filter(Boolean).map(item => `<mj-font name="${item.name}" href="${item.href}" />`)}
            </mj-attributes>
          </mj-head>
          <mj-body ${attributeStr}>
            ${children}
          </mj-body>
        </mjml>
        `;
    case BasicType.COLUMN:
      return `
              <mj-column ${attributeStr}>
               ${children || placeholder}
              </mj-column>
            `;
    case BasicType.CAROUSEL:
      const carouselImages = (data as ICarousel).data.value.images
        .map((image, index) => {
          const imageAttributeStr = Object.keys(image)
            .map((key) => `${key}="${image[key]}"`)
            .join(' ');
          return `
          <mj-carousel-image ${imageAttributeStr} />
          `;
        })
        .join('\n');

      return `
        <mj-carousel ${attributeStr}>
         ${carouselImages}
        </mj-carousel>
      `;
    case BasicType.NAVBAR:
      const links = (data as INavbar).data.value.links
        .map((link, index) => {
          const linkAttributeStr = Object.keys(link)
            .map((key) => `${key}="${link[key]}"`)
            .join(' ');
          return `
          <mj-navbar-link ${linkAttributeStr}>${link.content}</mj-navbar-link>
          `;
        })
        .join('\n');
      return `
              <mj-navbar ${attributeStr}>
               ${links}
              </mj-navbar>
            `;
    case BasicType.SOCIAL:
      const elements = (data as ISocial).data.value.elements
        .map((element, index) => {
          const elementAttributeStr = Object.keys(element)
            .map((key) => `${key}="${element[key]}"`)
            .join(' ');
          return `
          <mj-social-element ${elementAttributeStr}>${element.content}</mj-social-element>
          `;
        })
        .join('\n');
      return `
              <mj-social ${attributeStr}>
               ${elements}
              </mj-social>
            `;

    default:
      return `
          <mj-${data.type} ${attributeStr}>
           ${children || data.data.value?.content || ''}
          </mj-${data.type}>
        `;
  }
}

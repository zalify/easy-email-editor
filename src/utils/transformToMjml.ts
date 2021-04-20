import { ICarousel } from '@/components/core/blocks/basic/Carousel';
import { INavbar } from '@/components/core/blocks/basic/Navbar';
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
      'email-block',
      getNodeIdxClassName(idx!),
      getNodeTypeClassName(data.type)
    );
  }
  const attributeStr = Object.keys(att)
    .map((key) => `${key}="${att[key]}"`)
    .join(' ');
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
      const breakpoint = data.data.value.breakpoint
        ? `<mj-breakpoint width="${data.data.value.breakpoint}" />`
        : '';
      return `
        <mjml>
          <mj-head>
          ${breakpoint}
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

    default:
      return `
          <mj-${data.type} ${attributeStr}>
           ${children || data.data.value?.content || ''}
          </mj-${data.type}>
        `;
  }
}

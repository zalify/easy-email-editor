import { BlocksMap } from '@/components/core/blocks';
import { ICarousel } from '@/components/core/blocks/basic/Carousel';
import { INavbar } from '@/components/core/blocks/basic/Navbar';
import { IPage } from '@/components/core/blocks/basic/Page';
import { ISocial } from '@/components/core/blocks/basic/Social';
import { BasicType, BlockType } from '@/constants';
import { IBlockData } from '@/typings';
import { pickBy, identity } from 'lodash';
import {
  getChildIdx,
  getNodeIdxClassName,
  getNodeTypeClassName,
} from './block';
import { classnames } from './classnames';

export function transformToMjml(
  data: IBlockData,
  idx: string | null = 'content', // default Page block idx
  context?: IBlockData
): string {
  if (data?.data?.hidden) return '';
  if (idx === undefined) idx = 'content';
  if (context === undefined) context = data; // context is Page block

  const att = pickBy(
    {
      ...data.attributes,
    },
    identity
  );

  const isTest = !!idx;
  const placeholder = isTest ? renderPlaceholder(data.type) : '';
  if (isTest) {
    att['css-class'] = classnames(
      att['css-class'],
      'email-block',
      getNodeIdxClassName(idx!),
      getNodeTypeClassName(data.type)
    );
  }
  const attributeStr = Object.keys(att)
    .filter((key) => att[key] !== '') // filter att=""
    .map((key) => `${key}="${att[key]}"`)
    .join(' ');

  const block = BlocksMap.findBlockByType(data.type);

  if (!block) {
    throw new Error(
      `Can not find ${data.type} block!!! Have you registered this block ?`
    );
  }

  if (block.transform) {
    const transformData = block.transform(data, idx!, context);
    att['css-class'] = classnames(att['css-class'], transformData['css-class']);
    return transformToMjml(
      {
        ...transformData,
        attributes: {
          ...transformData.attributes,
          'css-class': att['css-class'],
        },
      },
      data.children.length > 0 ? idx : null,
      context
    );
  }

  const children = data.children
    .map((child, index) =>
      transformToMjml(child, idx ? getChildIdx(idx, index) : null, context)
    )
    .join('\n');

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
              ${
                value['font-family']
                  ? `<mj-all font-family="${value['font-family']}" />`
                  : ''
              }
              ${
                value['text-color']
                  ? `<mj-text color="${value['text-color']}" />`
                  : ''
              }
              ${value.fonts
                ?.filter(Boolean)
                .map(
                  (item) =>
                    `<mj-font name="${item.name}" href="${item.href}" />`
                )}
            </mj-attributes>
            <mj-style>
                ${value.headStyle || ''}
            </mj-style>
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
    case BasicType.SECTION:
      return `
              <mj-section ${attributeStr}>
               ${children || `<mj-column>${placeholder}</mj-column>`}
              </mj-section>
            `;
    case BasicType.WRAPPER:
      return `
              <mj-wrapper ${attributeStr}>
               ${
                 children ||
                 `<mj-section><mj-column>${placeholder}</mj-column></mj-section>`
               }
              </mj-wrapper>
            `;
    case BasicType.CAROUSEL:
      const carouselImages = (data as ICarousel).data.value.images
        .map((image, index) => {
          const imageAttributeStr = Object.keys(image)
            .filter((key) => key !== 'content' && att[key] !== '') // filter att=""
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
            .filter((key) => key !== 'content' && att[key] !== '') // filter att=""
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
            .filter((key) => key !== 'content' && att[key] !== '') // filter att=""
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

export function renderPlaceholder(type: BlockType) {
  let text = '';
  if (type === BasicType.PAGE) {
    text = 'Drop a Wrapper block here';
  } else if (type === BasicType.WRAPPER) {
    text = 'Drop a Section block here';
  } else if (type === BasicType.SECTION) {
    text = 'Drop a Column block here';
  } else if (type === BasicType.COLUMN) {
    text = 'Drop a content block here';
  }

  return `
   <mj-text color="#666">
    <div style="text-align: center">
      <div>
        <svg width="150" style="max-width: 100%" fill="currentColor" viewBox="0 0 40 40">
          <g>
            <path d="M23.713 23.475h5.907c.21 0 .38.17.38.38v.073c0 .21-.17.38-.38.38h-5.907a.38.38 0 0 1-.38-.38v-.073c0-.21.17-.38.38-.38zm.037-2.917h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm0-2.5h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm-.037-3.333h5.907c.21 0 .38.17.38.38v.073c0 .21-.17.38-.38.38h-5.907a.38.38 0 0 1-.38-.38v-.073c0-.21.17-.38.38-.38zm.037-2.917h9.167a.417.417 0 0 1 0 .834H23.75a.417.417 0 0 1 0-.834zm0-2.916h9.167a.417.417 0 0 1 0 .833H23.75a.417.417 0 0 1 0-.833zm-3.592 8.75a.675.675 0 0 1 .675.691v6.142c0 .374-.3.679-.675.683h-6.15a.683.683 0 0 1-.675-.683v-6.142a.675.675 0 0 1 .675-.691h6.15zM20 24.308v-5.833h-5.833v5.833H20zm.158-15.833a.675.675 0 0 1 .675.692v6.141c0 .374-.3.68-.675.684h-6.15a.683.683 0 0 1-.675-.684V9.167a.675.675 0 0 1 .675-.692h6.15zM20 15.142V9.308h-5.833v5.834H20zM37.167 0A2.809 2.809 0 0 1 40 2.833V30.5a2.809 2.809 0 0 1-2.833 2.833h-3.834v3H32.5v-3h-23A2.808 2.808 0 0 1 6.667 30.5v-23H3.583v-.833h3.084V2.833A2.808 2.808 0 0 1 9.5 0h27.667zm2 30.5V2.833a2.025 2.025 0 0 0-2-2H9.5a2.025 2.025 0 0 0-2 2V30.5a2.025 2.025 0 0 0 2 2h27.667a2.025 2.025 0 0 0 2-2zM0 27.75h.833V31H0v-3.25zm0-13h.833V18H0v-3.25zm0 22.833V34.25h.833v3.25L0 37.583zM0 21.25h.833v3.25H0v-3.25zM2.583 40l.084-.833h3.166V40h-3.25zm27.917-.833c.376.006.748-.08 1.083-.25l.417.666a2.875 2.875 0 0 1-1.5.417h-1.833v-.833H30.5zm-8.333 0h3.25V40h-3.25v-.833zm-6.584 0h3.25V40h-3.25v-.833zm-6.5 0h3.25V40h-3.25v-.833zM0 9.5c.01-.5.154-.99.417-1.417l.666.417c-.17.305-.256.65-.25 1v2H0v-2z"></path>
          </g>
        </svg>
      </div>
      <div style="padding-top: 20px; font-size: 16px;font-weight: bold;">
        ${text}
      </div>
    </div>
   </mj-text>
  `;
}

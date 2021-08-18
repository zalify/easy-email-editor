import { IPage, Page } from '@/components/core/blocks/basic/Page';
import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';
import { identity, isString, pickBy } from 'lodash';
import { findBlockByType } from './block';
import { parseXMLtoBlock } from './parseXMLtoBlock';

export function MjmlToJson(data: MjmlBlockItem | string): IPage {
  if (isString(data)) return parseXMLtoBlock(data);

  const transform = (item: IChildrenItem): IBlockData => {
    const attributes = item.attributes as any;

    switch (item.tagName) {
      case 'mjml':
        const body = item.children?.find((item) => item.tagName === 'mj-body')!;
        const head = item.children?.find((item) => item.tagName === 'mj-head');
        const metaData = getMetaDataFromMjml(head);

        const fonts =
          head?.children
            ?.filter((child) => child.tagName === 'mj-font')
            .map((child) => ({
              name: child.attributes.name,
              href: child.attributes.href,
            })) || [];

        const mjAttributes =
          head?.children?.find((item) => item.tagName === 'mj-attributes')
            ?.children || [];

        const headStyles = head?.children
          ?.filter((item) => item.tagName === 'mj-style')
          .map((item) => ({ content: item.content, inline: item.inline }));

        const headAttributes = [
          ...new Set(
            mjAttributes
              .filter((item) => {
                const isFontFamily =
                  item.tagName === 'mj-all' &&
                  item.attributes['font-family'] === metaData['font-family'];
                const isTextColor =
                  item.tagName === 'mj-text' &&
                  item.attributes['color'] === metaData['text-color'];
                const isContentColor =
                  ['mj-wrapper', 'mj-section'].includes(item.tagName) &&
                  item.attributes['background-color'] ===
                    metaData['content-background-color'];
                return !isFontFamily && !isTextColor && !isContentColor;
              })
              .map(
                (item) =>
                  `<${item.tagName} ${Object.keys(item.attributes)
                    .map((key) => `${key}="${item.attributes[key]}"`)
                    .join(' ')} />`
              )
          ),
        ].join('\n');

        const breakpoint = head?.children?.find(
          (item) => item.tagName === 'mj-breakpoint'
        );

        return Page.createInstance({
          attributes: body.attributes,
          children: body.children?.map(transform),
          data: {
            value: {
              headAttributes: headAttributes,
              headStyles: headStyles,
              fonts,
              breakpoint: breakpoint?.attributes.breakpoint,
              ...metaData,
            },
          },
        });

      default:
        const tag = item.tagName.replace('mj-', '').toLowerCase();

        const block = findBlockByType(tag as any);
        if (!block) {
          throw new Error(`${tag} block no found `);
        }
        const payload: IBlockData<any> = {
          type: block.type,
          attributes: attributes,
          data: {
            value: {},
          },
          children: [],
        };

        if (item.content) {
          payload.data.value.content = item.content;
        }

        if (block.type === BasicType.CAROUSEL) {
          payload.data.value.images =
            item.children?.map((child) => {
              return child.attributes;
            }) || [];
          payload.children = [];
        } else if (block.type === BasicType.NAVBAR) {
          payload.data.value.links =
            item.children?.map((child) => {
              return {
                ...child.attributes,
                content: child.content,
              };
            }) || [];
          payload.children = [];
        } else if (block.type === BasicType.SOCIAL) {
          payload.data.value.elements =
            item.children?.map((child) => {
              return {
                ...child.attributes,
                content: child.content,
              };
            }) || [];
          payload.children = [];
        } else if (item.children) {
          payload.children = item.children.map(transform);
        }

        return block.createInstance(payload);
    }
  };

  return transform(data);
}

export function getMetaDataFromMjml(data?: IChildrenItem): {
  [key: string]: any;
} {
  const mjmlHtmlAttributes = data?.children
    ?.filter((item) => item.tagName === 'mj-html-attributes')
    .map((item) => item.children)
    .flat()
    .filter((item) => item && item.attributes.class === 'easy-email')
    .reduce((obj: { [key: string]: any }, item) => {
      if (!item) return obj;
      const name = item.attributes['attribute-name'];
      const isMultipleAttributes = Boolean(
        item.attributes['multiple-attributes']
      );
      obj[name] = isMultipleAttributes
        ? pickBy(
            {
              ...item.attributes,
              'attribute-name': undefined,
              'multiple-attributes': undefined,
              class: undefined,
            },
            identity
          )
        : item.attributes[name];
      return obj;
    }, {});

  return pickBy(mjmlHtmlAttributes, identity);
}

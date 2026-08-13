import { BlockManager,IPage, BasicType, IBlockData } from 'easy-email-core';
import { identity, isString, pickBy } from 'lodash';
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

        return BlockManager.getBlockByType<IPage>(BasicType.PAGE)!.create({
          attributes: body.attributes,
          children: body.children?.map(transform),
          data: {
            value: {
              headAttributes: headAttributes,
              headStyles: headStyles,
              fonts,
              breakpoint: breakpoint?.attributes.width,
              ...metaData,
            },
          },
        });

      default:
        const tag = item.tagName.replace('mj-', '').toLowerCase();

        const block = BlockManager.getBlockByType(tag as any);
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
              const navbarLinkData = {
                // default config
                color: '#1890ff',
                'font-size': '13px',
                target: '_blank',
                padding: '15px 10px',

                ...child.attributes,
                content: child.content,
              };
              formatPadding(navbarLinkData, 'padding');
              return navbarLinkData;
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

        const blockData = block.create(payload);

        // format padding
        formatPadding(blockData.attributes, 'padding');
        formatPadding(blockData.attributes, 'inner-padding');
        return blockData;
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
    .reduce((obj: { [key: string]: any; }, item) => {
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

function formatPadding(
  attributes: IBlockData['attributes'],
  attributeName: 'padding' | 'inner-padding'
) {
  const ele = document.createElement('div');
  Object.keys(attributes).forEach((key: string) => {
    if (new RegExp(`^${attributeName}`).test(key)) {
      const formatKey = new RegExp(`^${attributeName}(.*)`).exec(key)?.[0];

      if (formatKey) {
        ele.style[formatKey as any] = attributes[key];
        delete attributes[key];
      }
    }
  });
  const newPadding = [
    ele.style.paddingTop,
    ele.style.paddingRight,
    ele.style.paddingBottom,
    ele.style.paddingLeft,
  ]
    .filter(Boolean)
    .join(' ');

  if (newPadding) {
    attributes[attributeName] = newPadding;
  }
}

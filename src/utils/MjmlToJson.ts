import { IPage, Page } from '@/components/core/blocks/basic/Page';
import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';
import { findBlockByType } from './block';

export function MjmlToJson(data: MjmlBlockItem): IPage {
  const transform = (item: IChildrenItem): IBlockData => {
    const attributes = item.attributes as any;

    switch (item.tagName) {
      case 'mjml':
        const body = item.children?.find((item) => item.tagName === 'mj-body')!;
        const head = item.children?.find((item) => item.tagName === 'mj-head');

        const fonts = head?.children?.filter(child => child.tagName === 'mj-font').map(child => ({ name: child.attributes.name, href: child.attributes.href })) || [];
        let allFontFamily = '';
        let allTextColor = '';
        const mjAllAttributes = head?.children?.find(item => item.tagName === 'mj-attributes')?.children?.filter(item => {
          if (item.tagName === 'mj-all') {
            if (item.attributes['font-family']) {
              allFontFamily = item.attributes['font-family'];
              if (Object.keys(item.attributes).length === 1) return false; // Avoid redundancy
            }
          }
          if (item.tagName === 'mj-text') {
            if (item.attributes['color']) {
              allTextColor = item.attributes['color'];
              if (Object.keys(item.attributes).length === 1) return false;  // Avoid redundancy
            }
          }
          return true;
        }) || [];

        const headAttributes = mjAllAttributes.map(item => `<${item.tagName} ${Object.keys(item.attributes).map((key) => `${key}="${item.attributes[key]}"`).join(' ')} />`).join('\n');

        return Page.createInstance({
          attributes: body.attributes,
          children: body.children?.map(transform),
          data: {
            value: {
              headAttributes: headAttributes,
              'font-family': allFontFamily,
              'text-color': allTextColor,
              fonts
            }
          }
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

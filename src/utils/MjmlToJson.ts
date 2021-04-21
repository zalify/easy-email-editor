import { BlocksMap } from '@/components/core/blocks';
import { IPage, Page } from '@/components/core/blocks/basic/Page';
import { BasicType } from '@/constants';
import { IBlockData } from '@/typings';

export function MjmlToJson(data: MjmlBlockItem): IPage {
  const transform = (item: IChildrenItem): IBlockData => {
    const attributes = item.attributes as any;

    switch (item.tagName) {
      case 'mjml':
        const body = item.children?.find((item) => item.tagName === 'mj-body')!;
        return Page.createInstance({
          attributes: body.attributes,
          children: body.children?.map(transform),
        });

      default:
        const tag = item.tagName.replace('mj-', '').toLowerCase();

        const block = Object.values(BlocksMap).find(
          (item) => item.type === tag
        );
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

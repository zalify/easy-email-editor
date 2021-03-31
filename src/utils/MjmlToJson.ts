import { BlocksMap } from '@/components/core/blocks';
import { IPage, Page } from '@/components/core/blocks/basic/Page';
import { IBlockData } from '@/typings';

export function MjmlToJson(data: MjmlBlockItem): IPage {

  const transform = (item: IChildrenItem): IBlockData => {
    const attributes = item.attributes as any;

    switch (item.tagName) {
      case 'mjml':
        const body = item.children?.find(item => item.tagName === 'mj-body')!;
        return Page.createInstance({
          attribute: body.attributes,
          children: body.children?.map(transform)
        });

      default:
        const tag = item.tagName.replace('mj-', '').toLowerCase();
        const block = Object.values(BlocksMap).find(item => item.type === tag);
        if (!block) {
          console.log(item);
          return;
        }
        const payload: IBlockData<any> = {
          type: block.type,
          attribute: attributes,
          data: {
            value: {

            }
          },
          children: []
        };

        if (item.content) {
          payload.data.value.content = item.content;
        }

        if (item.children) {
          payload.children = item.children.map(transform);
        }

        return block.createInstance(payload);
    }
  };

  return transform(data);
}
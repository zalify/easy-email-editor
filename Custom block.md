## Custom block

What is a custom block？Custom block is composed of one or more basic blocks.

This is a Section block with its children

```tsx
<Section>
  <Column>
    <Text>hello</Text>
  </Column>
</Section>
```

But we can also encapsulate it and call it Custom Section block.

```tsx
(<CustomSection></CustomSection>).isEqual(
  <Section>
    <Column>
      <Text>hello</Text>
    </Column>
  </Section>,
);
```

There is such a conversion rule

`IBlockData<T>` => `transformToMjml`=> `mjml-component<T>`

- transformToMjml(`IText`) === `<mj-text>xxx</mj-text>`
- transformToMjml(`ISection`) === `<mj-section>xxx</mj-section>`

And it can be reversed

- `<mj-text>xxx</mj-text>` => `MjmlToJson` => `IText`

### Write a custom block

A custom block should have the following structure

```ts
{
  name: string; // block name
  type: BlockType; // Custom type
  validParentType: BlockType[]; // Only drag to the above blocks. For example, `Text` only drag to `Colum` block and `Hero` block.
  create: (payload?: RecursivePartial<T extends IBlockData>) => T;
  render?: (
      data: IBlockData<T>, // current block data
      idx: string | null,  // current idx
      mode: 'testing' | 'production', // you can return different
      context?: IPage,
      dataSource?: { [key: string]: any } // data source from JsonToMjml

  ) => IBlockData;
}

```

`create` is a method of instance generation, Let’s say `Text`, when dragging and dropped into the edit panel and , we will call `addBlock`. In fact, it just calls the corresponding `create` and generate blockData.

```ts
const create: CreateInstance<IText> = payload => {
  const defaultData: IText = {
    type: BasicType.TEXT,
    data: {
      value: {
        content: 'Make it easy for everyone to compose emails!',
      },
    },
    attributes: {
      'font-size': '13px',
      padding: '10px 25px 10px 25px',
      'line-height': 1,
      align: 'left',
    },
    children: [],
  };
  return merge(defaultData, payload);
};
```

`render` mainly to render your custom block into one or more basic block. When `JsonToMjml` is called, if it is found to be an custom block, we will call its `render` method to convert it into basic blocks.

You can construct your custom block through basic blocks. For example,
a custom button, only the background color and text can be modified

```tsx
import { Button } from 'easy-email-editor';

const render = (data: ICustomButton, idx: string, context: IPage): IBlockData => {
  const attributes = data.attributes;
  const { buttonText } = data.data.value;

  const instance = (
    <Button
      background-color={attributes['background-color']}
      css-class={mode === 'testing' ? getPreviewClassName(idx, data.type) : ''} // Add this class to enable an interactive prompt during editing.
    >
      {buttonText}
    </Button>
  );

  return instance;
};
```

Another way is that you can write [MJML](https://documentation.mjml.io/).

```ts
import {
  IBlockData,
  BasicType,
  components,
  createCustomBlock,
  getPreviewClassName,
  AdvancedType,
} from 'easy-email-core';
import { MjmlToJson } from 'easy-email-extensions';

const { BlockRenderer } = components;

const render = (
  data: ICustomButton,
  idx: string,
  mode: 'testing' | 'production',
  context?: IPage,
  dataSource?: { [key: string]: any },
) => {
  const attributes = data.attributes;
  const { buttonText } = data.data.value;

  const instance = MjmlToJson(
    `<mj-button background-color==${attributes['background-color']}  css-class="${
      mode === 'testing' ? getPreviewClassName(idx, data.type) : ''
    }">${buttonText}</mj-button>`,
  ) as IBlockData;

  return <BlockRenderer data={instance} />;
};
```

### Register this block

Only after registering this block, mjml-parser can convert it into basic blocks

```ts
import { BlocksMap } from 'easy-email-editor';

BlocksMap.registerBlocks({ 'block-name': YourCustomBlock });
```

### View demo

[https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks](https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks)

<br/>
<br/>

## Dynamic rendering

```tsx
import { IBlockData, BasicType, components, createCustomBlock } from 'easy-email-core';

import { CustomBlocksType } from '../constants';
import React from 'react';
import { merge } from 'lodash';

const { Column, Section, Wrapper, Text, Button, Image, Group } = components;

export type IProductRecommendation = IBlockData<
  {
    'background-color': string;
    'button-color': string;
    'button-text-color': string;
    'product-name-color': string;
    'product-price-color': string;
    'title-color': string;
  },
  {
    title: string;
    buttonText: string;
    quantity: number;
  }
>;

const productPlaceholder = {
  image:
    'http://res.cloudinary.com/dwkp0e1yo/image/upload/v1665756285/rayk1n0lxm6vk1aqkgah.png',
  title: 'Red Flock Buckle Winter Boots',
  price: '$59.99 HKD',
  url: 'https://easy-email-m-ryan.vercel.app',
};

export const ProductRecommendation = createCustomBlock<IProductRecommendation>({
  name: 'Product recommendation',
  type: CustomBlocksType.PRODUCT_RECOMMENDATION,
  validParentType: [BasicType.PAGE],
  create: payload => {
    const defaultData: IProductRecommendation = {
      type: CustomBlocksType.PRODUCT_RECOMMENDATION,
      data: {
        value: {
          title: 'You might also like',
          buttonText: 'Buy now',
          quantity: 3,
        },
      },
      attributes: {
        'background-color': '#ffffff',
        'button-text-color': '#ffffff',
        'button-color': '#414141',
        'product-name-color': '#414141',
        'product-price-color': '#414141',
        'title-color': '#222222',
      },
      children: [
        {
          type: BasicType.TEXT,
          children: [],
          data: {
            value: {
              content: 'custom block title',
            },
          },
          attributes: {},
        },
      ],
    };
    return merge(defaultData, payload);
  },
  render: (data, idx, mode, context, dataSource) => {
    const { title, buttonText, quantity } = data.data.value;
    const attributes = data.attributes;

    const productList =
      mode === 'testing'
        ? new Array(quantity).fill(productPlaceholder)
        : (dataSource?.product_list || []).slice(0, quantity);

    const perWidth = quantity <= 3 ? '' : '33.33%';

    return (
      <Wrapper
        padding='20px 0px 20px 0px'
        border='none'
        direction='ltr'
        text-align='center'
        background-color={attributes['background-color']}
      >
        <Section padding='0px'>
          <Column
            padding='0px'
            border='none'
            vertical-align='top'
          >
            <Text
              font-size='20px'
              padding='10px 25px 10px 25px'
              line-height='1'
              align='center'
              font-weight='bold'
              color={attributes['title-color']}
            >
              {title}
            </Text>
          </Column>
        </Section>

        <Section padding='0px'>
          <Group
            vertical-align='top'
            direction='ltr'
          >
            {productList.map((item, index) => (
              <Column
                key={index}
                width={perWidth}
                padding='0px'
                border='none'
                vertical-align='top'
              >
                <Image
                  align='center'
                  height='auto'
                  padding='10px'
                  width='150px'
                  src={item.image}
                />
                <Text
                  font-size='12px'
                  padding='10px 0px 10px 0px '
                  line-height='1'
                  align='center'
                  color={attributes['product-name-color']}
                >
                  {item.title}
                </Text>
                <Text
                  font-size='12px'
                  padding='0px'
                  line-height='1'
                  align='center'
                  color={attributes['product-price-color']}
                >
                  {item.price}
                </Text>
                <Button
                  align='center'
                  padding='15px 0px'
                  background-color={attributes['button-color']}
                  color={attributes['button-text-color']}
                  target='_blank'
                  vertical-align='middle'
                  border='none'
                  text-align='center'
                  href={item.url}
                >
                  {buttonText}
                </Button>
              </Column>
            ))}
          </Group>
        </Section>
      </Wrapper>
    );
  },
});

export { Panel } from './Panel';
```

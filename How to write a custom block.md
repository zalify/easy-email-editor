# How to write a custom block

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
  </Section>
);
```

There is such a conversion rule

`IBlockData<T>` => `transformToMjml`=> `mjml-component<T>`

- transformToMjml(IBlockData\<IText\>) = `<mj-text>xxx</mj-text>`
- transformToMjml(IBlockData\<ISection\>) = `<mj-section>xxx</mj-section>`

And it can be reversed

- `<mj-text>xxx</mj-text>` => `MjmlToJson` => IBlockData\<IText\>

## To use a custom block, there should be the following steps

- Write a custom block
- Register this block
- If you want to show it to the left column, add it to `extraBlocks`

</br>

## Write a custom block

A custom block should have the following structure

```ts
{
  name: string; // block name, show in tooltip
  type: BlockType; // Custom type
  Panel: () => React.ReactNode; // Configuration panel, update your block data
  validParentType: BlockType[]; // Only drag to the above blocks. For example, `Text` only drag to `Colum` block and `Hero` block.
  create: (payload?: RecursivePartial<T extends IBlockData>) => T;
  render?: (
    data: IBlockData<T>, // current block data
    idx: string, // current idx
    context: IPage //
  ) => IBlockData;
}

```

`create` is a method of instance generation, Let’s say `Text`, it has the following createInstance。When dragging and dropped into the edit panel and , we will call `addBlock`. In fact, it just calls the corresponding `create`.

```ts
const create: CreateInstance<IText> = (payload) => {
  const defaultData: IText = {
    type: BasicType.TEXT,
    data: {
      value: {
        content: "Make it easy for everyone to compose emails!",
      },
    },
    attributes: {
      "font-size": "13px",
      padding: "10px 25px 10px 25px",
      "line-height": 1,
      align: "left",
    },
    children: [],
  };
  return merge(defaultData, payload);
};
```

`render` mainly to render your custom block into a or more basic block. When transformToMjml is called, if it is found to be a custom block, we will call its render method to convert it into basic blocks. At the same time, the following parameters will be injected `currentBlockData, current idx, page context`.

You can construct your custom block through basic blocks. For example,
a custom button, only the background color and text can be modified

```tsx
import { Button } from "easy-email-editor";

const render = (
  data: ICustomButton,
  idx: string,
  context: IPage
): IBlockData => {
  const attributes = data.attributes;
  const { buttonText } = data.data.value;

  const instance = (
    <Button background-color={attributes["background-color"]}>
      {buttonText}
    </Button>
  );

  return instance;
};
```

Another way is that you can write [MJML](https://documentation.mjml.io/).

```ts
import { MjmlToJson } from 'easy-email-editor';

const render = (data: ICustomButton, idx:string; context: IPage): IBlockData => {
  const attributes = data.attributes;
  const { buttonText } = data.data.value;

  const instance = MjmlToJson(`<mj-button background-color=${attributes['background-color']}>${buttonText}</mj-button>`)

  return instance;
};

```

</br>

## Register this block

```ts
import { BlocksMap } from "easy-email-editor";

BlocksMap.registerBlocks({ "block-name": YourCustomBlock });
```

### Show it to the left side

```ts
import { BlocksMap } from "easy-email-editor";
import { ProductRecommendation } from "./ProductRecommendation";
import { Example as YourCustomBlockExamples } from "./ProductRecommendation/Example";

BlocksMap.registerBlocks({ ProductRecommendation: ProductRecommendation });

export const customBlocks = {
  title: "category title",
  name: " category name",
  blocks: [
    {
      title: YourCustomBlock.name,
      description: YourCustomBlock.description,
      ExampleComponent: YourCustomBlockExamples, // your can define multiple instances
    },
  ],
};
```

## For more details, please see <a href="https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks/MyFirstBlock" target="_blank" alt="https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks/MyFirstBlock">https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks/MyFirstBlock</a>

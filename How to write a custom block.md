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
    (

    <CustomSection></CustomSection>
    ).isEqual(
        <Section>
            <Column>
                <Text>hello</Text>
            </Column>
        </Section>
    )

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
  createInstance: (payload?: RecursivePartial<T extends IBlockData>) => T;
  transform?: (
    data: IBlockData<T>, // current block data
    idx: string, // current idx
    context: IPage //
  ) => IBlockData;
}

```

`createInstance` is a method of instance generation, Let’s say `Text`, it has the following createInstance。When dragging and dropped into the edit panel and , we will call `addBlock`. In fact, it just calls the corresponding `createInstance`.

```ts
const createInstance: CreateInstance<IText> = (payload) => {
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

`transform`  mainly to transform your custom block into a or more basic block. When transformToMjml is called, if it is found to be a custom block, we will call its transform method to convert it into basic blocks. At the same time, the following parameters will be injected `currentBlockData, current idx, page context`.

You can construct your custom block through basic blocks. For example,
a custom button, only the background color and text can be modified

```tsx
import {
  Button,
} from 'easy-email-editor';

const transform = (data: ICustomButton, idx: string, context: IPage): IBlockData => {
  const attributes = data.attributes;
  const { buttonText } = data.data.value;

  const instance = (
    <Button background-color={attributes['background-color']}>
      {buttonText}
    </Button>
  )

  return instance;
};

```
Another way is that you can write [MJML](https://documentation.mjml.io/).

```ts
import { MjmlToJson } from 'easy-email-editor';

const transform = (data: ICustomButton, idx:string; context: IPage): IBlockData => {
  const attributes = data.attributes;
  const { buttonText } = data.data.value;

  const instance = MjmlToJson(`<mj-button background-color=${attributes['background-color']}>${buttonText}</mj-button>`)

  return instance;
};

```


</br>

## Register this block

```ts
import {  BlocksMap } from 'easy-email-editor';

BlocksMap.registerBlocks({ 'block-name': YourCustomBlock });

```

### Show it to the left column

```ts

import { BlockGroup } from 'easy-email-editor';

export const customBlocks: BlockGroup = {
  title: 'Custom blocks',
  blocks: [
    {
      label: YourCustomBlock.name,
      data: YourCustomBlock.createInstance(),
      thumbnail:
        'https://assets.maocanhua.cn/c160738b-db01-4081-89e5-e35bd3a34470-image.png',
    },
  ],
};


```

## If you have understood the above rules, we will now start to write a custom block. We named it `MyFirstBlock`
![图片1](https://assets.maocanhua.cn/85464535-d70d-4eb2-85b7-93b46b372173-image.png)


src/CustomBlocks/MyFirstBlock

```tsx
import { IBlock, IBlockData, BasicType, BlocksMap, MjmlToJson, CreateInstance} from 'easy-email-editor';

enum CustomBlocksType {
  MY_FIRST_BLOCK = 'MY_FIRST_BLOCK',
}

export const MyFirstBlock: IBlock = {
  name: 'My first block',
  type: CustomBlocksType.MY_FIRST_BLOCK as any,
  Panel,
  createInstance,
  validParentType: [BasicType.PAGE, BasicType.WRAPPER],
  transform,
};

const createInstance: CreateInstance<ICustomHeader> = (
  payload
) => {
  const defaultData: ICustomHeader = {
    type: CustomBlocksType.MY_FIRST_BLOCK as any,
    data: {
      value: {
        buttonText: 'Got it',
        imageUrl: 'https://assets.maocanhua.cn/10dada65-c4fb-4b1f-837e-59a1005bbea6-image.png'
      },
    },
    attributes: {
      'background-color': '#4A90E2',
      'text-color': '#ffffff',
    },
    children: [],
  };
  return merge(defaultData, payload);
};


const transform = (data: ICustomHeader) => {
  const { imageUrl, buttonText } = data.data.value;
  const attributes = data.attributes;

  const instance = (
    <Section padding="20px">
      <Column>
        <Image padding="0px 0px 0px 0px" width="100px" src={imageUrl} />
        <Button background-color={attributes['background-color']} color={attributes['text-color']} href="#">
          {buttonText}
        </Button>
      </Column>
    </Section>
  )

  return instance;
};


```

src/CustomBlocks/MyFirstBlock/Panel/tsx
```ts
import React from 'react';
import { ColorPickerField, TextField, useFocusIdx, Stack, ImageUploaderField } from 'easy-email-editor';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <Stack vertical>
      <TextField
        label='Button text'
        name={`${focusIdx}.data.value.buttonText`}
        inline
        alignment='center'
      />

      // If you want to upload image, you should provide `onUploadImage` to `EmailEditorProvider`
      <ImageUploaderField
        label='Logo'
        name={`${focusIdx}.data.value.imageUrl`}
        inline
        alignment='center'
      />

      <ColorPickerField
        label='text color'
        name={`${focusIdx}.attributes.text-color`}
        inline
        alignment='center'
      />

      <ColorPickerField
        label='Background color'
        name={`${focusIdx}.attributes.background-color`}
        inline
        alignment='center'
      />
    </Stack>
  );
}


```

And then, Register this block

```ts
import { BlockGroup, BlocksMap, EmailEditorProvider } from 'easy-email-editor';
import { MyFirstBlock } from './MyFirstBlock';

BlocksMap.registerBlocks({ MyFirstBlock });
```

And then, Show it to the left column

![image](https://assets.maocanhua.cn/eed9da6e-72b7-4ab0-b857-b6ae08345955-image.png)

```ts
export const customBlocks: BlockGroup = {
  title: 'Custom blocks',
  blocks: [
    {
      label: MyFirstBlock.name,
      data: MyFirstBlock.createInstance(),
      thumbnail:
        'https://assets.maocanhua.cn/6b783170-dd20-48e9-8d82-67069178bdb7-image.png',
    },
  ],
};

<EmailEditorProvider
  data={initialValues}
  extraBlocks={[customBlocks]}
  interactiveStyle={{
    hoverColor: '#3b97e3',
    selectedColor: '#69c0ff',
    dragoverColor: '#13c2c2',
    tangentColor: '#E058AF',
  }}
  onSubmit={onSubmit}
>
...
</EmailEditorProvider>


```

## For more details, please see <a href="https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks/MyFirstBlock" target="_blank" alt="https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks/MyFirstBlock">https://github.com/m-Ryan/easy-email-demo/tree/main/src/CustomBlocks/MyFirstBlock</a>

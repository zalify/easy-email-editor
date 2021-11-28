# Easy-email-extensions

## Introduction

Provide default UI components, when they don’t meet your needs, you can refer to it and write your own

## usage

```sh
$ npm install --save easy-email-extensions
```

or

```sh
$ yarn add easy-email-extensions
```

```js
import React from 'react';
import { BlockManager, BasicType } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { SimpleLayout } from 'easy-email-extensions';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
};

export function App() {
  return (
    <EmailEditorProvider
      data={initialValues}
      height={'calc(100vh - 72px)'}
      autoComplete
      dashed={false}
    >
      {({ values }) => {
        return (
          <SimpleLayout>
            <EmailEditor />
          </SimpleLayout>
        );
      }}
    </EmailEditorProvider>
  );
}
```

## Extensions

- `AttributePanel`

  - Basic block configuration panel

  - <img src="https://assets.maocanhua.cn/3e74a61d-ab22-4cf3-afc9-d511b82e08cd-image.png" alt="AttributePanel">

  - You can add or overwrite

    ```tsx
    import { BlockAttributeConfigurationManager } from "easy-email-extensions";

    BlockAttributeConfigurationManager.add({
      [BasicType.TEXT]: () => <div>will be overwrite `Text`</div>,
    });
    ```

- `InteractivePrompt`

  - block hover and focus style

  - <img src="https://assets.maocanhua.cn/298d72d6-a509-4cd2-85c7-dfb915971620-image.png" alt="InteractivePrompt">

  - No configuration items

- `BlockLayer`

  - <img src="https://assets.maocanhua.cn/de1f5211-350e-43c9-9c99-d97a2f196e04-image.png" alt="ShortcutToolbar">
  - No configuration items

- `ShortcutToolbar`

  - <img src="https://assets.maocanhua.cn/f0e2ccc6-0627-472b-ad78-bc92bdb46ad1-image.png">
  - You can add or overwrite popover's preset blocks

    ```tsx
    import { BasicType } from "easy-email-core";
    import {
      BlockMarketManager,
      BlockMaskWrapper,
    } from "easy-email-extensions";

    BlockMarketManager.addCategories([
      {
        title: "Custom",
        name: "custom",
        blocks: [
          {
            type: BasicType.TEXT,
            title: "Text",
            description: "This block allows you to display text in your email.",
            component: () => {
              return (
                <BlockMaskWrapper
                  type={BasicType.TEXT}
                  payload={{
                    attributes: {
                      "font-size": "20px",
                      align: "center",
                      padding: "0px 0px 0px 0px",
                      color: "#4A90E2",
                    },
                    data: {
                      value: {
                        content: "20px",
                      },
                    },
                  }}
                >
                  <div style={{ fontSize: 20, width: "100%", paddingLeft: 20 }}>
                    20px
                  </div>
                </BlockMaskWrapper>
              );
            },
          },
        ],
      },
    ]);
    ```

- `SimpleLayout`

  - All in one extension, provide basic and complete layout example. Refer to the above extension for configuration items.

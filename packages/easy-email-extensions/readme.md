# Easy-email-extensions

## Introduction

Provide default UI components, when they don’t meet your needs, you can refer to it and write your own.

It also provides the following utils:

- MjmlToJson

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
import { BlockManager, BasicType, AdvancedType } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

const categories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
];

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE)!.create({}),
};

export default function App() {
  const { width } = useWindowSize();

  const smallScene = width < 1400;

  return (
    <EmailEditorProvider
      data={initialValues}
      height={'calc(100vh - 72px)'}
      autoComplete
      dashed={false}
    >
      {({ values }) => {
        return (
          <StandardLayout
            compact={!smallScene}
            categories={categories}
            showSourceCode={true}
          >
            <EmailEditor />
          </StandardLayout>
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
    import { BlockAttributeConfigurationManager } from 'easy-email-extensions';

    BlockAttributeConfigurationManager.add({
      [BasicType.TEXT]: () => <div>will be overwrite `Text`</div>,
    });
    ```

  - Hide Page block subject & subTitle

    ```tsx
    const DefaultPageConfigPanel = BlockAttributeConfigurationManager.get(BasicType.PAGE);
    BlockAttributeConfigurationManager.add({
      [BasicType.PAGE]: () => (
        <DefaultPageConfigPanel
          hideSubject
          hideSubTitle
        />
      ),
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
    import { BasicType } from 'easy-email-core';
    import { BlockMarketManager, BlockMaskWrapper } from 'easy-email-extensions';

    BlockMarketManager.addCategories([
      {
        title: 'Custom',
        name: 'custom',
        blocks: [
          {
            type: BasicType.TEXT,
            title: 'Text',
            description: 'This block allows you to display text in your email.',
            component: () => {
              return (
                <BlockMaskWrapper
                  type={BasicType.TEXT}
                  payload={{
                    attributes: {
                      'font-size': '20px',
                      align: 'center',
                      padding: '0px 0px 0px 0px',
                      color: '#4A90E2',
                    },
                    data: {
                      value: {
                        content: '20px',
                      },
                    },
                  }}
                >
                  <div style={{ fontSize: 20, width: '100%', paddingLeft: 20 }}>20px</div>
                </BlockMaskWrapper>
              );
            },
          },
        ],
      },
    ]);
    ```

- `SimpleLayout`

  - props
    - showSourceCode
    - mjmlReadOnly
    - defaultShowLayer

- `StandardLayout`

  - props
    - compact
    - categories
    - showSourceCode
    - jsonReadOnly
    - mjmlReadOnly

## transform mjml to json

```ts
import { MjmlToJson } from 'easy-email-extensions';

const json = MjmlToJson(`
<mjml>
  <mj-body>
    <mj-hero mode="fluid-height" background-width="600px" background-height="469px" background-url="https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg" background-color="#2a3448" padding="100px 0px">
      <mj-text padding="20px" color="#ffffff" font-family="Helvetica" align="center" font-size="45px" line-height="45px" font-weight="900">
        GO TO SPACE
      </mj-text>
      <mj-button href="https://mjml.io/" align="center">
        ORDER YOUR TICKET NOW
      </mj-button>
    </mj-hero>
  </mj-body>
</mjml>
`);

console.log(json);
```

// output

```json
{
  "type": "page",
  "data": {
    "value": {
      "breakpoint": "480px",
      "headAttributes": "",
      "font-size": "14px",
      "line-height": "1.7",
      "headStyles": [],
      "fonts": [],
      "responsive": true,
      "font-family": "lucida Grande,Verdana,Microsoft YaHei",
      "text-color": "#000000"
    }
  },
  "attributes": {
    "background-color": "#efeeea",
    "width": "600px"
  },
  "children": [
    {
      "type": "hero",
      "data": {
        "value": {}
      },
      "attributes": {
        "padding": "100px 0px 100px 0px",
        "border": "none",
        "direction": "ltr",
        "text-align": "center",
        "background-color": "#2a3448",
        "background-position": "center center",
        "mode": "fluid-height",
        "vertical-align": "top",
        "background-url": "https://cloud.githubusercontent.com/assets/1830348/15354890/1442159a-1cf0-11e6-92b1-b861dadf1750.jpg",
        "background-width": "600px",
        "background-height": "469px"
      },
      "children": [
        {
          "type": "text",
          "data": {
            "value": {
              "content": "GO TO SPACE"
            }
          },
          "attributes": {
            "padding": "20px 20px 20px 20px",
            "align": "center",
            "color": "#ffffff",
            "font-size": "45px",
            "line-height": "45px",
            "font-family": "Helvetica",
            "font-weight": "900"
          },
          "children": []
        },
        {
          "type": "button",
          "data": {
            "value": {
              "content": "ORDER YOUR TICKET NOW"
            }
          },
          "attributes": {
            "align": "center",
            "background-color": "#414141",
            "color": "#ffffff",
            "font-weight": "normal",
            "border-radius": "3px",
            "padding": "10px 25px 10px 25px",
            "inner-padding": "10px 25px 10px 25px",
            "line-height": "120%",
            "target": "_blank",
            "vertical-align": "middle",
            "border": "none",
            "text-align": "center",
            "href": "https://mjml.io/"
          },
          "children": []
        }
      ]
    }
  ]
}
```

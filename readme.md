# Easy email

<p align="center">

  <br/>
  <a aria-label="Vercel logo" href="https://vercel.com">
    <img src="https://badgen.net/badge/icon/Made%20by%20Vercel?icon=zeit&label&color=black&labelColor=black">
  </a>
  <br/>

  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/easy-email-editor">
    <img alt="" src="https://badgen.net/npm/v/easy-email-editor">
  </a>
  <a aria-label="React version" href="https://react.js">
    <img alt="" src="https://img.shields.io/badge/React-17.0-yellow.svg">
  </a>
  <a aria-label="MJML" href="https://mjml.io/">
    <img src="https://img.shields.io/badge/MJML-awesome-rgb(120 33 117).svg">
  </a>
  <a aria-label="Package size" href="https://www.typescriptlang.org/">
    <img alt="Using TypeScript" src="https://img.shields.io/badge/%3C/%3E-TypeScript-brightgreenred.svg">
  </a>
  <img alt="" src="https://badgen.net/npm/license/easy-email-editor">
</p>

## Introduction

Easy email is developed based on the [MJML](https://mjml.io/) and has very good compatibility. At the same time, it can generate code through drag-and-drop editing.

| Overview |
| :------: |

<div style="margin-top:20px;margin-bottom:20px;display:inline-block;">
    <a href="https://easy-email-m-ryan.vercel.app/editor?id=623&userId=77" target="_blank"><img src="https://assets.maocanhua.cn/3ba3146c-9ac6-45dc-838b-6030e4e950a3-image.png" alt="Overview"  width="30%"></a>
   <a href="https://easy-email-m-ryan.vercel.app/editor?id=605&userId=77" target="_blank"><img src="https://assets.maocanhua.cn/c1864078-fe3f-4b00-8f15-fca85e887e3d-image.png" width="30%"></a>
      <a href="https://easy-email-m-ryan.vercel.app/editor?id=611&userId=107" target="_blank"><img src="https://assets.maocanhua.cn/8932f09f-1b2d-4534-ae5e-2b07ab291e8d-image.png" width="30%"></a>
</div>
<br/>

<div style="margin-top:20px;display:inline-block">
   <a href="https://easy-email-m-ryan.vercel.app/editor?id=618&userId=77" target="_blank"><img src="https://assets.maocanhua.cn/7afb1f2e-3527-4a50-b14e-2ea593db6cfb-image.png" alt="Overview" width="30%"></a>
   <a href="https://easy-email-m-ryan.vercel.app/editor?id=622&userId=77&userId=77" target="_blank"><img src="https://assets.maocanhua.cn/b26a7784-e2ba-4124-9821-b4a4076ec4e6-image.png" alt="Overview" width="30%"></a>
   <a href="https://easy-email-m-ryan.vercel.app/editor?id=471&userId=77" target="_blank"><img src="https://assets.maocanhua.cn/05bf4e32-d62a-4405-b991-b54cd489fe8b-image.png" alt="Overview" width="30%"></a>

</div>

<br/>

|                                                                                  Video Overview                                                                                  |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <a href="https://www.bilibili.com/video/BV1YQ4y167bb" target="_blank"><img src="https://assets.maocanhua.cn/e2ba1d5c-c944-4351-9668-c519baf67361-image.png" alt="Overview" ></a> |
|                                                        \_Watch video overview:https://www.bilibili.com/video/BV1YQ4y167bb                                                        |

## Live Demo

Check out the live demo here: <a href="http://easy-email-m-ryan.vercel.app" target="_blank" alt="http://easy-email-m-ryan.vercel.app">http://easy-email-m-ryan.vercel.app</a>

## Hotkeys

| hotkey           | Description  |
| ---------------- | ------------ |
| mod+z            | undo         |
| mod+y            | redo         |
| delete/backspace | delete block |

## Getting started

## Install

```sh
$ npm install --save easy-email-editor antd mjml-browser react-final-form
```

or

```sh
$ yarn add easy-email-editor antd mjml-browser react-final-form
```

## Usage

```js
import React from "react";
import { BlocksMap, EmailEditor, EmailEditorProvider } from "easy-email-editor";
import "easy-email-editor/lib/style.css";
import "antd/dist/antd.css";

const initialValues = {
  subject: "Welcome to Easy-email",
  subTitle: "Nice to meet you!",
  content: BlocksMap.getBlock("Page").create({}),
};

export function App() {
  return (
    <EmailEditorProvider data={initialValues}>
      {({ values }) => {
        return <EmailEditor height={"calc(100vh - 72px)"} />;
      }}
    </EmailEditorProvider>
  );
}
```

## Custom blocks

You could customize your own blocks and inject data before sending emails. For more details, please see <a href="https://github.com/m-Ryan/easy-email/tree/master/example/pages/Editor/components/CustomBlocks" target="_blank" alt="https://github.com/m-Ryan/easy-email/tree/master/example/pages/Editor/components/CustomBlocks">https://github.com/m-Ryan/easy-email/tree/master/example/pages/Editor/components/CustomBlocks</a>

<img src="https://assets.maocanhua.cn/4dde0dbb-f7d4-4ea3-b495-fd104c0f6306-image.png" alt="Custom block" width="50%" style="text-align:center">

<br/>
<br/>
<br/>

## Development

```sh
$ git clone git@github.com:m-Ryan/easy-email.git
$ cd easy-email
$ yarn install

```

## Start the dev server

```sh
$ yarn dev

```

## Examples

> Please see <a href="https://github.com/m-Ryan/easy-email-demo" target="_blank" alt="https://github.com/m-Ryan/easy-email-demo">https://github.com/m-Ryan/easy-email-demo</a>

## Use test account

> Maybe you just want a test account that belongs to you. See <a href="./How to use an test account.md" target="_blank">here</a>.

## EmailEditorProvider Configuration

| property           | Type                                                                                               | Description                                   |
| ------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| data               | interface IEmailTemplate { content: IPage; subject: string; subTitle: string; }                    | Source data                                   |
| children           | ( props: FormState<T>,helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>) => React.ReactNode | ReactNode                                     |
| onSubmit           | Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];                                       | Called when the commit is triggered manually  |
| fontList           | { value: string; label: string; }[];                                                               | Default font list.                            |
| interactiveStyle   | { hoverColor?: string; selectedColor?: string;}                                                    | Interactive prompt color                      |
| onUploadImage      | (data: Blob) => Promise<string>;                                                                   | Triggered when an image is pasted or uploaded |
| onAddCollection    | (payload: CollectedBlock) => void;                                                                 | Add to collection list                        |
| onRemoveCollection | (payload: { id: string; }) => void;                                                                | Remove from collection list
 | dashed | boolean | Show dashed |

## EmailEditor Configuration

| property | Type             | Description                     |
| -------- | ---------------- | ------------------------------- |
| height   | string / number | Set the height of the container |

<br/>

## License

The MIT License

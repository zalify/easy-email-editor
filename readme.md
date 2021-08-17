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

Overview |
:---: |
<div style="margin-top:20px;display:inline-block">
<img src="https://assets.maocanhua.cn/b409e1b7-b9a9-43ac-a2fd-e27c285dd844-image.png" alt="Overview" width="45%">

<img src="https://assets.maocanhua.cn/6ee62f4a-62a3-4b50-9f4b-13dc68270478-image.png" alt="Overview" width="45%">

</div>


<div style="margin-top:20px;margin-bottom:20px;display:inline-block;">
<img src="https://assets.maocanhua.cn/0e50aa7b-9b17-42b4-8bf9-cd310c74f3be-image.png" alt="Overview" width="45%">
<img src="https://assets.maocanhua.cn/97c776e9-6c67-4452-b048-3f2d6e468424-image.png" alt="Overview"  width="45%">
</div>


<br/>



|                                                          Video Overview                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------: |
| [![Easy email](https://assets.maocanhua.cn/93c653c8-4bc9-4d2f-9e7e-11a590d3b2bc-image.png)](https://www.youtube.com/watch?v=3KdZQeZ9uqc_) |
|                                       _Watch video overview: https://youtu.be/3KdZQeZ9uqc_                                        |



## Live Demo

Check out the live demo here: <a href="http://easy-email-m-ryan.vercel.app" target="_blank" alt="http://easy-email-m-ryan.vercel.app">http://easy-email-m-ryan.vercel.app</a>


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
import React from 'react';
import { BlocksMap, EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';
import 'antd/dist/antd.css';

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content:BlocksMap.getBlock('Page').createInstance({}),
};

export function App() {
  return (
    <EmailEditorProvider data={initialValues}>
      {({ values }) => {
        return (
          <EmailEditor height={'calc(100vh - 72px)'} />
        );
      }}
    </EmailEditorProvider>
  );
}

```

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

You could customize your own blocks and inject data before sending emails. For more details, please see  <a href="https://github.com/m-Ryan/easy-email/tree/master/example/pages/Editor/components/CustomBlocks" target="_blank" alt="https://github.com/m-Ryan/easy-email/tree/master/example/pages/Editor/components/CustomBlocks">https://github.com/m-Ryan/easy-email/tree/master/example/pages/Editor/components/CustomBlocks</a>

<img src="https://assets.maocanhua.cn/e56ac8d8-575a-458b-a4c4-ac9e50b62799-image.png" alt="Overview" width="50%" style="text-align:center">

<br/>
<br/>
<br/>

## Examples
Please see <a href="https://github.com/m-Ryan/easy-email-demo" target="_blank" alt="https://github.com/m-Ryan/easy-email-demo">https://github.com/m-Ryan/easy-email-demo</a>

<br/>

## EmailEditorProvider Configuration

| property              | Type                              | Description                                                                  |
| -------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| data       | interface IEmailTemplate { content: IPage; subject: string; subTitle: string; }            | Source data |
| children       |  ( props: FormState<T>,helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>) => React.ReactNode| ReactNode |
| onSubmit       |  Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];           | Called when the commit is triggered manually  |
| fontList       | { value: string; label: string; }[];            | Default font list. |
| interactiveStyle  | { hoverColor?: string; selectedColor?: string; dragoverColor?: string; tangentColor?: string; } | Interactive prompt color          |
| onUploadImage             | (data: Blob) => Promise<string>;                       | Triggered when an image is pasted or uploaded      |
| onAddCollection |  (payload: CollectedBlock) => void; | Add to collection list    |
| onRemoveCollection    | (payload: { id: string; }) => void;      | remove from collection list                               |

<br/>

## EmailEditor Configuration

| property              | Type                              | Description                                                                  |
| -------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| height       |    string | number;     | Set the height of the container |


<br/>

## License

The MIT License
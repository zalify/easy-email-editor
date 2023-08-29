# Easy email

<br>
<p align="center">
  <a aria-label="Easy email logo" href="https://email.maocanhua.cn/?utm_source=github">
    <img src="./logo_text.svg" width="300">
  </a>
</p>
<br>

<p align="center">

  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/easy-email-editor">
    <img alt="" src="https://badgen.net/npm/v/easy-email-editor">
  </a>
  <a aria-label="React version" href="https://react.js">
    <img alt="" src="https://img.shields.io/badge/React-18.2-yellow.svg">
  </a>
  <a aria-label="MJML" href="https://mjml.io/">
    <img src="https://img.shields.io/badge/MJML-awesome-rgb(120 33 117).svg">
  </a>
  <a aria-label="Package size" href="https://www.typescriptlang.org/">
    <img alt="Using TypeScript" src="https://img.shields.io/badge/%3C/%3E-TypeScript-brightgreenred.svg">
  </a>
  <img alt="" src="https://badgen.net/npm/license/easy-email-editor">
</p>

## Join Our Community

<a aria-label="Join Easy Email Discord Community" href="https://discord.gg/bqrAE2zCjn">
  <img src="./join_discord.png" width="240">
</a>


## Introduction

Easy email is developed based on the [MJML](https://mjml.io/) and has very good compatibility. At the same time, it can generate code through drag-and-drop editing.

## Features:

- Drag and drop editor
- Can be converted into `MJML`, or generated through `MJML`
- Defined custom block
- Dynamic rendering
- Easily customize UI when you need
- Theme configuration

|                  Video Overview                  |
| :----------------------------------------------: |
| <img src="./StandardLayout.png" alt="Overview" > |

## Live Demo

Check out the live demo here: <a href="https://email.maocanhua.cn/?utm_source=github" target="_blank" alt="https://email.maocanhua.cn/?utm_source=github">https://email.maocanhua.cn</a>

## Custom Services
For customized features or paid consultation services, please contact 962491243@qq.com.

## Getting started

```sh
$ npm install --save easy-email-core easy-email-editor easy-email-extensions react-final-form
```

or

```sh
$ yarn add easy-email-core easy-email-editor easy-email-extensions react-final-form
```

```js
import React from 'react';
import { BlockManager, BasicType, AdvancedType } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color
import '@arco-themes/react-easy-email-theme/css/arco.css';

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


## Examples

> Please see <a href="https://github.com/m-Ryan/easy-email-demo" target="_blank" alt="https://github.com/m-Ryan/easy-email-demo">https://github.com/m-Ryan/easy-email-demo</a>

</br>

## Configuration

| property           | Type                                                                                               | Description                                                                                                                          |
| ------------------ | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| height             | string / number                                                                                    | Set the height of the container                                                                                                      |
| data               | interface IEmailTemplate { content: IPage; subject: string; subTitle: string; }                    | Source data                                                                                                                          |
| children           | ( props: FormState<T>,helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>) => React.ReactNode | ReactNode                                                                                                                            |
| onSubmit           | Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];                                       | Called when the commit is triggered manually                                                                                         |
| fontList           | { value: string; label: string; }[];                                                               | Default font list.                                                                                                                   |
| interactiveStyle   | { hoverColor?: string; selectedColor?: string;}                                                    | Interactive prompt color                                                                                                             |
| onUploadImage      | (data: Blob) => Promise<string>;                                                                   | Triggered when an image is pasted or uploaded                                                                                        |
| onAddCollection    | (payload: CollectedBlock) => void;                                                                 | Add to collection list                                                                                                               |
| onRemoveCollection | (payload: { id: string; }) => void;                                                                | Remove from collection list                                                                                                          |
| dashed             | boolean                                                                                            | Show dashed                                                                                                                          |
| autoComplete       | boolean                                                                                            | Automatically complete missing blocks. For example, Text => Section, will generate Text=>Column=>Section                             |
| mergeTags          | Object                                                                                             | A merge tag is a bit of specific code that allows you to insert dynamic data into emails. Like `{{user.name}}`, and used for preview |
| previewInjectData  | Object                                                                                             | Dynamic data for preview, it will overwrite mergeTags.                                                                               |
| onBeforePreview    | (html: string, mergeTags: PropsProviderProps['mergeTags']) => string                               | Promise<string> You can replace mergeTags when previewing.                                                                           |

## Hotkeys

| hotkey            | Description                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| mod+z             | undo                                                                                              |
| mod+y             | redo                                                                                              |
| delete/backspace  | delete block                                                                                      |
| tab / shift + tab | fast select block, if block is focusing,`tab` select next block & `shift + tab` select prev block |


## How does it work?

<img alt="" src="./work.png">

</br>

## Packages

- [easy-email-core](./packages/easy-email-core/readme.md)
- [easy-email-editor](./packages/easy-email-editor/readme.md)
- [easy-email-extensions](./packages/easy-email-extensions/readme.md)

</br>

## Development

```sh
$ git clone git@github.com:zalify/easy-email.git
$ cd easy-email


$ yarn  
$ yarn install-all
$ yarn dev

```
`If you need some new features, we always welcome you to submit a PR.`


## License

The MIT License

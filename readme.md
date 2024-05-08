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
  <a aria-label="React version" href="https://react.js">
    <img alt="" src="https://img.shields.io/badge/React-18.2-yellow.svg">
  </a>
  <a aria-label="MJML" href="https://mjml.io/">
    <img src="https://img.shields.io/badge/MJML-awesome-rgb(120 33 117).svg">
  </a>
  <a aria-label="Package size" href="https://www.typescriptlang.org/">
    <img alt="Using TypeScript" src="https://img.shields.io/badge/%3C/%3E-TypeScript-brightgreenred.svg">
  </a>
</p>

---

## Pro Version Announcement

We are delighted to announce that we now have a more powerful and customizable commercial version available. If it is for internal use only, then the open-source version is sufficient. However, if your editor is a critical feature, I recommend using the commercial version.
<a href="https://www.easyemail.pro/?utm_source=github" target="_blank">Check it out here </a>.

---

## Introduction

Easy email is developed based on the [MJML](https://mjml.io/) and has very good compatibility. At the same time, it can generate code through drag-and-drop editing.

## Features:

- Drag and drop editor
- Can be converted into `MJML`, or generated through `MJML`
- Defined custom block
- Dynamic rendering

|                  Video Overview                  |
| :----------------------------------------------: |
| <img src="./StandardLayout.png" alt="Overview" > |

## Live Demo

Check out the live demo here: <a href="https://email.maocanhua.cn/?utm_source=github" target="_blank" alt="https://email.maocanhua.cn/?utm_source=github">email.maocanhua.cn</a>

Pro version live demo here: <a href="https://demo.easyemail.pro/full?utm_source=github-live" target="_blank">demo.easyemail.pro</a>.

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

</br>

## Configuration

| property          | Type                                                                                               | Description                                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| height            | string / number                                                                                    | Set the height of the container                                                                                                      |
| data              | interface IEmailTemplate { content: IPage; subject: string; subTitle: string; }                    | Source data                                                                                                                          |
| children          | ( props: FormState<T>,helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>) => React.ReactNode | ReactNode                                                                                                                            |
| onSubmit          | Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];                                       | Called when the commit is triggered manually                                                                                         |
| fontList          | { value: string; label: string; }[];                                                               | Default font list.                                                                                                                   |
| interactiveStyle  | { hoverColor?: string; selectedColor?: string;}                                                    | Interactive prompt color                                                                                                             |
| onUploadImage     | (data: Blob) => Promise<string>;                                                                   | Triggered when an image is pasted or uploaded                                                                                        |
| autoComplete      | boolean                                                                                            | Automatically complete missing blocks. For example, Text => Section, will generate Text=>Column=>Section                             |
| mergeTags         | Object                                                                                             | A merge tag is a bit of specific code that allows you to insert dynamic data into emails. Like `{{user.name}}`, and used for preview |
| previewInjectData | Object                                                                                             | Dynamic data for preview, it will overwrite mergeTags.                                                                               |
| onBeforePreview   | (html: string, mergeTags: PropsProviderProps['mergeTags']) => string                               | Promise<string> You can replace mergeTags when previewing.                                                                           |

</br>

## Development

```sh
$ git clone git@github.com:zalify/easy-email.git
$ cd easy-email


$ pnpm install
$ pnpm run install-all
$ pnpm run dev

```

`If you need some new features, we always welcome you to submit a PR.`

## License

The MIT License

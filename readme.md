# Easy email

Easy email is developed based on the [MJML](https://mjml.io/) and has very good compatibility. At the same time, it can generate code through drag-and-drop editing.


Overview |
:---: |
<img src="https://assets.maocanhua.cn/b409e1b7-b9a9-43ac-a2fd-e27c285dd844-image.png" alt="Overview" width="100%" style="text-align:center">
<img src="https://assets.maocanhua.cn/97c776e9-6c67-4452-b048-3f2d6e468424-image.png" alt="Overview" width="100%" style="text-align:center">


## Live Demo

Check out the live demo here: <a href="http://easy-email-m-ryan.vercel.app/editor?id=456" target="_blank" alt="http://easy-email-m-ryan.vercel.app/editor?id=456">http://easy-email-m-ryan.vercel.app/editor?id=456</a>


## Getting started

### Install

```sh
$ npm install --save easy-email-editor antd formik mjml-browser
```

or

```sh
$ yarn add easy-email-editor antd formik mjml-browser
```

### Usage

```js
import React from 'react';
import { BasicType, BlocksMap, EmailEditor, EmailEditorLayout } from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';
import 'antd/dist/antd.css';

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlocksMap.findBlockByType(BasicType.PAGE).createInstance({}),
};

export function App() {
  return (
    <EmailEditor data={initialValues}>
      {({ values }) => {
        return (
          <EmailEditorLayout height={'calc(100vh - 72px)'} />
        );
      }}
    </EmailEditor>
  );
}

```

### Examples
Please see <a href="https://github.com/m-Ryan/easy-email/blob/master/example/pages/Editor/index.tsx" target="_blank" alt="https://github.com/m-Ryan/easy-email/blob/master/example/pages/Editor/index.tsx">https://github.com/m-Ryan/easy-email/blob/master/example/pages/Editor/index.tsx</a>

### APIs
See here: <a href="https://github.com/m-Ryan/easy-email/blob/master/src/index.tsx" target="_blank" alt="https://github.com/m-Ryan/easy-email/blob/master/src/index.tsx">https://github.com/m-Ryan/easy-email/blob/master/src/index.tsx</a>

### Todo

- Custom block that Help you add your own content blocks to the editor.


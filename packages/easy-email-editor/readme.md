# Easy-email-editor

## Introduction

Email render and preview container.

## usage

```sh
$ npm install --save easy-email-editor
```

or

```sh
$ yarn add easy-email-editor
```

```js
import React from 'react';
import { BlockManager } from 'easy-email-core';
import { EmailEditor, EmailEditorProvider } from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';

const initialValues = {
  subject: 'Welcome to Easy-email',
  subTitle: 'Nice to meet you!',
  content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
};

export function App() {
  return (
    <EmailEditorProvider
      data={initialValues}
      height={'calc(100vh - 72px)'}
    >
      {({ values }) => {
        return <EmailEditor />;
      }}
    </EmailEditorProvider>
  );
}
```

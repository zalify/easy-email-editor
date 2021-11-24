# Easy-email-editor

## Introduction

Email render and preview container.

## usage

```sh
$ npm install --save easy-email-editor mjml-browser react-final-form
```

or

```sh
$ yarn add easy-email-editor mjml-browser react-final-form
```

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
    <EmailEditorProvider data={initialValues} height={"calc(100vh - 72px)"}>
      {({ values }) => {
        return <EmailEditor />;
      }}
    </EmailEditorProvider>
  );
}
```

## Docs

Check out [documentation](https://docs-easy-email.vercel.app/) for guides and a full API reference.

## customize

If you customize the UI yourself,maybe you need to know

- hooks

  - useActiveTab // current tab is edit or preview
  - useBlock // includes addBlock、moveBlock、removeBlock、undo, redo, etc.
  - useHoverIdx // hover block related, dragging status related, dragging direction related
  - useEditorProps // get props from EmailEditorProvider
  - useFocusIdx // focus block related

- utils (These are some very simple methods, it is best to look at the implementation)

  - getBlockNodeByIdx
  - getBlockNodes
  - getShadowRoot
  - scrollBlockEleIntoView

- components
  - BlockAvatarWrapper // allow drag and drop to editor

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
import React from "react";
import { BlockManager } from "easy-email-core";
import { EmailEditor, EmailEditorProvider } from "easy-email-editor";
import "easy-email-editor/lib/style.css";

const initialValues = {
  subject: "Welcome to Easy-email",
  subTitle: "Nice to meet you!",
  content: BlockManager.getBlockByType(BasicType.PAGE).create({}),
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

## customize

If you customize the UI yourself,maybe you need to know

- hooks

  - useActiveTab // current tab is edit or preview
  - useBlock // includes addBlock、moveBlock、removeBlock、undo, redo, etc.
    - values // current block form values 
    - change // formHelpers, assign form values ```(name: F, value?: any) => void```
    - focusBlock // IBlockData
    - setFocusBlock // set focusBlock values ```(values: IBlockData)=>void```
    - setFocusBlockValue // assign focusBlock data values ```(values: IBlockData)=>void```
    - setValueByIdx // assign form values by focusIdx ```(focusIdx:string, values: IBlockData)=>void```
    - addBlock  ```(params: {
          type: string;
          parentIdx: string;
          positionIndex?: number;
          payload?: any;
          canReplace?: boolean;
        }) => void```
    - moveBlock // ```(sourceIdx: string, destinationIdx: string) => null | undefined```
    - copyBlock // ```(idx: string) => void```
    - removeBlock // ```(idx: string) => void```
    - isExistBlock // ```(idx:string)=>boolean```
    - redo // ```() => void```
    - undo // ```() => void```
    - reset // ```() => void```
    - redoable // ```boolean```
    - undoable // ```boolean```
  - useHoverIdx // hover block related, dragging status related, dragging direction related
  - useEditorProps // get props from EmailEditorProvider
  - useEditorContext // get form state and initialized status
  - useFocusIdx // focus block related

- utils (These are some very simple methods, it is best to look at the implementation)

  - getBlockNodeByIdx
  - getBlockNodes
  - getShadowRoot
  - scrollBlockEleIntoView

- components
  - BlockAvatarWrapper // allow drag and drop to editor

/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useRef, useState } from 'react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

(self as any).MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

const MonacoEditor: React.FC<{
  value: string;
  onChange: (val: string) => void;
  height?: string;
  width?: string;
}> = (props) => {
  const [ele, setEle] = useState<HTMLDivElement | null>(null);
  const { value, onChange } = props;
  const ref = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!ele) return;
    if (ref.current) return;

    const editor = (ref.current = monaco.editor.create(ele, {
      value: value,
      language: 'html',
      theme: 'vs-dark',
      // lineNumbers: 'off',
      minimap: { enabled: false }, // 右边的缩略图
    }));
    editor.onDidChangeModelContent(function (e) {
      onChange(editor.getValue());
    });
  }, [ele, onChange, value]);

  useEffect(() => {
    const editor = ref.current;
    return () => {
      console.log('dispose');

      editor && editor.dispose();
    };
  }, []);

  return (
    <div
      ref={setEle}
      style={{ height: props.height, width: props.width }}
    />
  );
};

export default MonacoEditor;
import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
import { Controlled as CodeMirror } from 'react-codemirror2';

import styles from './index.module.scss';

export default function CodemirrorEditor(props: {
  value: string;
  onChange(val: string): void;
}) {
  const { value, onChange } = props;
  return (
    <CodeMirror
      className={styles.container}
      value={value}
      onBeforeChange={(editor, data, value) => onChange(value)}
      options={{
        mode: 'xml',
        theme: 'material',
        lineNumbers: true,
        autofocus: true,
        styleActiveLine: true,
        smartIndent: true,
        lineWrapping: true,
        foldGutter: true,
      }}
    />
  );
}

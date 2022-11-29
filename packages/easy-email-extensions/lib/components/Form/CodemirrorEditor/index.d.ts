import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/neat.css';
import 'codemirror/mode/xml/xml.js';
export default function CodemirrorEditor(props: {
    value: string;
    onChange(val: string): void;
}): JSX.Element;

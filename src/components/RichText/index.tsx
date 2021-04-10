import React, { useEffect } from 'react';

export interface RichTextProps {
  content: string;
}
export function RichText(props: RichTextProps) {
  const { content } = props;

  useEffect(() => {
    const onSelectionChange = () => {
      const container = document.getSelection()?.getRangeAt(0).commonAncestorContainer;
      console.log('container', container);
    };
    document.addEventListener('selectionchange', onSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);

    };
  }, []);

  const onChange = () => {

  };

  console.log('content', content);

  return <div style={{ padding: 10, minHeight: 100 }} contentEditable dangerouslySetInnerHTML={{ __html: content }} onChange={onChange} />;
}
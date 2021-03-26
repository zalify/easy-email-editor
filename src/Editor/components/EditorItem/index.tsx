import { IBlockData } from '@/typings';
import React from 'react';

import { useField } from 'formik';
import { findBlockByType } from '@/utils/block';

export interface EditorProps {
  idx: string;
}

export function EditorItem(props: EditorProps) {
  const [field] = useField<IBlockData>(props.idx);

  const block = findBlockByType(field.value.type);

  if (block) {
    const BlockEditor = block.Editor as any;
    return <BlockEditor idx={props.idx} />;
  }
  return null;
}

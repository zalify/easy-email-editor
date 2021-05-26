import React from 'react';
import blockEditstyleText from '@/styles/block-edit.css.text?raw';
import { BlockInteractiveStyle } from '../../BlockInteractiveStyle';

export function ShadowStyle() {
  return (
    <>
      <style>
        {blockEditstyleText}
      </style>
      <BlockInteractiveStyle />
    </>
  );
}
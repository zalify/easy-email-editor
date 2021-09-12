import React from 'react';
import blockEditstyleText from '@/styles/block-edit.css?inline';
import iconfontText from '@/styles/icon-font.css';
import { BlockInteractiveStyle } from '../../BlockInteractiveStyle';

export function ShadowStyle() {
  return (
    <>
      <style>{iconfontText}</style>
      <style>{blockEditstyleText}</style>
      <BlockInteractiveStyle isShadowDom />
    </>
  );
}

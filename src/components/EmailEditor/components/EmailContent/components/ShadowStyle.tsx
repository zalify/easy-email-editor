import React from 'react';
import blockEditstyleText from '@/styles/block-edit.css?inline';
import { BlockInteractiveStyle } from '../../BlockInteractiveStyle';

export function ShadowStyle() {
  return (
    <>
      <style>{blockEditstyleText}</style>
      <BlockInteractiveStyle isShadowDom />
    </>
  );
}

import React from 'react';
import blockInteractiveStyleText from '@/styles/block-interactive.css.text?raw';
import blockEditstyleText from '@/styles/block-edit.css.text?raw';

export function ShadowStyle() {
  return (
    <style>
      {blockEditstyleText}
      {blockInteractiveStyleText}
    </style>
  );
}
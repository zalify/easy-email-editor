import React, { useContext } from 'react';
import blockInteractiveStyleText from '@/styles/block-interactive.css.text?raw';
import { EditorPropsContext } from '@/components/PropsProvider';

export function BlockInteractiveStyle() {
  const { interactiveStyle: {
    hoverColor = '#3b97e3',
    selectedColor = 'rgb(59, 151, 227)',
    dragoverColor = 'rgb(121, 123, 202)',
    tangentColor = 'rgb(245, 166, 35)'
  }
    = {}
  } = useContext(EditorPropsContext);
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
    * {
      --hover-color: ${hoverColor};
      --selected-color: ${selectedColor};
      --dragover-color: ${dragoverColor};
      --tangent-color: ${tangentColor};
    }

     ${blockInteractiveStyleText}

    ` }}
    />
  );
}
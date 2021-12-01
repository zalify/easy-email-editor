import React from 'react';
import iconfontText from '@/styles/icon-font.css';
import styles from '@/styles/block-shadowDom-interactive.css?inline';
import { useEditorProps } from '@/hooks/useEditorProps';

export function ShadowStyle() {
  const {
    interactiveStyle: {
      hoverColor = '#3b97e3',
      selectedColor = 'rgb(59, 151, 227)',
      dragoverColor = 'rgb(121, 123, 202)',
      tangentColor = 'rgb(245, 166, 35)',
    } = {},
  } = useEditorProps();

  return (
    <>
      <style>{iconfontText}</style>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              --hover-color: ${hoverColor};
              --selected-color: ${selectedColor};
              --dragover-color: ${dragoverColor};
              --tangent-color: ${tangentColor};
            }

            :host(*){
              all: initial;
            }

            ${styles}

            `,
        }}
      />
    </>
  );
}

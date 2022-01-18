import React from 'react';
import iconfontText from '@/assets/font/iconfont.css';
import styles from '@/styles/block-shadowDom-interactive.css?inline';
import { useEditorProps } from '@/hooks/useEditorProps';

export function ShadowStyle() {
  const {
    interactiveStyle: {
      hoverColor = 'rgb(var(--primary-4, #1890ff))',
      selectedColor = 'rgb(var(--primary-6, #1890ff))',
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

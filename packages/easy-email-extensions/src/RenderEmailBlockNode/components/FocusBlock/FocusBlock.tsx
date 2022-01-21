import { Toolbar } from '@extensions/InteractivePrompt/components/Toolbar';
import { BasicType } from 'easy-email-core';
import { BlockAvatarWrapper, IconFont } from 'easy-email-editor';
import React, { useMemo } from 'react';
import styles from './FocusBlock.module.scss';

interface FocusBlockProps {
  blockType: string;
  idx: string;
}

const FocusBlock = (props: FocusBlockProps) => {
  const { blockType, idx } = props;
  const isPage = blockType === BasicType.PAGE;

  return (
    <div
      id='easy-email-extensions-InteractivePrompt-FocusTooltip'
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <style>{'.email-block { position: relative;}'}</style>
      <div
        style={{
          position: 'absolute',
          zIndex: 9999,
          right: 0,
          top: '50%',
          display: isPage ? 'none' : undefined,
        }}
      >
        <BlockAvatarWrapper idx={idx} type={blockType} action='move'>
          <div
            style={
              {
                position: 'absolute',
                backgroundColor: 'var(--selected-color)',
                color: '#ffffff',
                height: '28px',
                width: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                cursor: 'grab',
                pointerEvents: 'auto',
                WebkitUserDrag: 'element',
              } as any
            }
          >
            <IconFont
              iconName='icon-move'
              style={{ color: '#fff', cursor: 'grab' }}
            />
          </div>
        </BlockAvatarWrapper>
      </div>

      {/* outline */}
      <div
        style={{
          position: 'absolute',
          fontSize: 14,
          zIndex: 2,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          outlineOffset: '-2px',
          outline: '2px solid var(--selected-color)',
        }}
      >
        <Toolbar />
      </div>
    </div>
  );
};

export default FocusBlock;

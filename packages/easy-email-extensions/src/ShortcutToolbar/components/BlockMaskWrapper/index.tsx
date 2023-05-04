import { IconFont, BlockAvatarWrapper } from 'easy-email-editor';
import React, { useCallback, useEffect, useRef } from 'react';
import { BlockType } from 'easy-email-core';
import styles from './index.module.scss';

export const BlockMaskWrapper: React.FC<{
  type: BlockType | string;
  payload: any;
  children: React.ReactNode | React.ReactElement;
}> = props => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const { type, payload } = props;

  const onMouseDown = useCallback(() => {
    if (ref.current) {
      ref.current.classList.add(styles.drag);
    }
  }, []);

  const onMaskMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(ev => {
    if (!dragRef.current || !dragRef.current.contains(ev.target as HTMLElement)) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, []);

  useEffect(() => {
    const mouseup = () => {
      if (ref.current) {
        ref.current.classList.remove(styles.drag);
      }
    };
    document.addEventListener('mouseup', mouseup);
    return () => {
      document.removeEventListener('mouseup', mouseup);
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      {props.children}
      <div
        className={styles.wrapper}
        style={{
          position: 'absolute',
          height: '100%',
          transform: 'translate(32px)',
          top: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <BlockAvatarWrapper
          type={type}
          payload={payload}
        >
          <div
            ref={ref}
            className={styles.mask}
            onMouseDown={onMaskMouseDown}
          >
            <div
              ref={dragRef}
              style={{
                position: 'relative',
                zIndex: 10,
              }}
              onMouseDown={onMouseDown}
            >
              <IconFont
                iconName='icon-drag'
                style={{ fontSize: 25, lineHeight: '25px', cursor: 'grab' }}
              />
            </div>
          </div>
        </BlockAvatarWrapper>
      </div>
    </div>
  );
};

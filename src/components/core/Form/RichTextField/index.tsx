import { ActiveTabKeys } from '@/components/Provider/BlocksProvider';
import { FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { findBlockNodeByIdx, getEditorRoot } from '@/utils/findBlockNodeByIdx';
import { getEditNode } from '@/utils/getEditNode';
import { onDrag } from '@/utils/onDrag';
import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocalStorage } from 'react-use';
import { EnhancerProps } from '../enhancer';
import { InlineTextField } from '../index';
import { InlineTextProps } from '../InlineTextField';
import { TextToolbar } from './components/TextToolbar';

const TEXT_BAR_LOCATION_KEY = 'TEXT_BAR_LOCATION_KEY';
export function RichTextField(
  props: Omit<InlineTextProps, 'onChange' | 'mutators'> & EnhancerProps<string>
) {
  const { activeTab } = useActiveTab();
  const isActive = activeTab === ActiveTabKeys.EDIT;

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMove, setIsMove] = useState(false);
  const [locationState, setLocationState] = useLocalStorage(
    TEXT_BAR_LOCATION_KEY,
    { left: 0, top: 0 }
  );
  const { idx } = props;

  const container = findBlockNodeByIdx(idx);

  useEffect(() => {
    const fixContainer = getEditorRoot();
    if (fixContainer && idx) {
      const { left, top } = fixContainer.getBoundingClientRect();

      setPosition({
        left: locationState?.left || left,
        top: locationState?.top || top - 46,
      });
    }
  }, [idx, locationState?.left, locationState?.top]);

  const onChange = useCallback(() => {}, []);

  const editorContainer = container && getEditNode(container);

  const textToolbar = useMemo(() => {
    const onMoveTextToolbar = (event: React.MouseEvent) => {
      setIsMove(true);
      onDrag({
        event: event as any,
        onMove(x, y) {
          setPosition({
            left: position.left + x,
            top: position.top + y,
          });
          setLocationState({
            left: position.left + x,
            top: position.top + y,
          });
        },
        onEnd() {
          setIsMove(false);
        },
      });
    };

    return createPortal(
      <div
        key={idx}
        style={{
          position: 'fixed',
          ...position,
          transform: 'translate(0,-100%)',
          padding: 16,
          boxSizing: 'border-box',

          zIndex: 100,
          transition: isMove ? undefined : 'all .3s',
          display: Boolean(isActive) ? undefined : 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#41444d',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            cursor: 'move',
          }}
          onMouseDown={onMoveTextToolbar}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <TextToolbar container={editorContainer} onChange={onChange} />
        </div>
      </div>,
      document.getElementById(FIXED_CONTAINER_ID) as HTMLDivElement
    );
  }, [
    idx,
    position,
    isMove,
    isActive,
    editorContainer,
    onChange,
    setLocationState,
  ]);

  return (
    <>
      <InlineTextField key={idx} {...(props as any)} />
      {editorContainer && textToolbar}
    </>
  );
}

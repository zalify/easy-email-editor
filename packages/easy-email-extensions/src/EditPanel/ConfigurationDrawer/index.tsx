import { useFocusIdx } from 'easy-email-editor';
import { Drawer } from '@arco-design/web-react';
import { ConfigurationPanel } from '@extensions/ConfigurationPanel';
import React, { useCallback, useMemo, useRef } from 'react';

export function ConfigurationDrawer({
  height,
  compact,
  showSourceCode,
  jsonReadOnly,
  mjmlReadOnly,
}: {
  height: string;
  compact: boolean;
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
}) {
  const refWrapper = useRef(null);
  const { focusIdx, setFocusIdx } = useFocusIdx();

  const onClose = useCallback(() => {
    setFocusIdx('');
  }, [setFocusIdx]);

  const visible = Boolean(focusIdx);
  return useMemo(() => {
    return (
      <>
        <div
          ref={refWrapper}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: visible ? 1 : -1,
            pointerEvents: visible ? 'auto' : 'none',
          }}
        />
        {refWrapper.current && (
          <Drawer
            width='100%'
            title={null}
            closable={false}
            focusLock={false}
            placement='right'
            bodyStyle={{ padding: 0 }}
            visible
            getPopupContainer={() => refWrapper && (refWrapper.current as any)}
            footer={null}
            onCancel={onClose}
          >
            <ConfigurationPanel
              compact={compact}
              showSourceCode={showSourceCode}
              height={height}
              onBack={onClose}
              jsonReadOnly={jsonReadOnly}
              mjmlReadOnly={mjmlReadOnly}
            />
          </Drawer>
        )}
      </>
    );
  }, [visible, onClose, compact, showSourceCode, height]);
}

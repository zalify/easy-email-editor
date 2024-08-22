import { cloneDeep } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TableColumnTool from './tableTool';
import { getShadowRoot, useBlock, useFocusIdx } from 'easy-email-editor';

export function TableOperation() {
  const shadowRoot = getShadowRoot();
  const { focusIdx } = useFocusIdx();
  const { focusBlock, change } = useBlock();
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const tool = useRef<TableColumnTool>();

  useEffect(() => {
    const borderTool: any = {
      top: topRef.current,
      bottom: bottomRef.current,
      left: leftRef.current,
      right: rightRef.current,
    };
    tool.current = new TableColumnTool(
      borderTool,
      shadowRoot.querySelector('body') as any,
    );
    return () => {
      tool.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (tool.current) {
      tool.current.changeTableData = (data: any[][]) => {
        change(`${focusIdx}.data.value.tableSource`, cloneDeep(data));
      };
      tool.current.tableData = cloneDeep(focusBlock?.data?.value?.tableSource || []);
    }
  }, [focusIdx, focusBlock]);

  return (
    <>
      {shadowRoot &&
        createPortal(
          <>
            <div>
              <div ref={topRef} />
              <div ref={bottomRef} />
              <div ref={leftRef} />
              <div ref={rightRef} />
            </div>
          </>,
          shadowRoot.querySelector('body') as any,
        )}
    </>
  );
}

import { cloneDeep } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import TableColumnTool from './tableTool';
import { DATA_RENDER_COUNT, getIframeDocument, useBlock, useFocusIdx } from 'easy-email-editor';

export function TableOperation() {
  const iframeDocument = getIframeDocument();
  const element = iframeDocument?.querySelector(`[${DATA_RENDER_COUNT}]`);
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
    if (element) {
      tool.current = new TableColumnTool(
        borderTool,
        element,
      );
    }
    return () => {
      tool.current?.destroy();
    };
  }, [element]);

  useEffect(() => {
    if (tool.current) {
      tool.current.changeTableData = (data: any[][]) => {
        change(`${focusIdx}.data.value.tableSource`, cloneDeep(data));
      };
      tool.current.tableData = cloneDeep(focusBlock?.data?.value?.tableSource || []);
    }
  }, [focusIdx, focusBlock, change]);

  return (
    <>
      {element &&
        createPortal(
            <div>
              <div ref={topRef} />
              <div ref={bottomRef} />
              <div ref={leftRef} />
              <div ref={rightRef} />
            </div>,
          element,
        )}
    </>
  );
}

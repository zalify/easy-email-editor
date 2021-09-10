import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import {
  getNodeIdxFromClassName,
  getNodeTypeFromClassName,
  getPageIdx,
} from '@/utils/block';
import { cloneDeep, isEqual } from 'lodash';
import { IPage } from '@/components/core/blocks/basic/Page';
import { BlockType, BLOCK_SELECTED_CLASSNAME } from '@/constants';
import { findBlockNode } from '@/utils/findBlockNode';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { getBlockNodes } from '@/utils/findBlockNodeByIdx';
import { useDraggable } from '@/hooks/useDragable';
import { useDataTransfer } from '@/hooks/useDataTransfer';
import { useEditorContext } from '@/hooks/useEditorContext';
import { HtmlStringToReactNodes } from '@/utils/HtmlStringToReactNodes';
import { createPortal } from 'react-dom';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export function MjmlDomRender() {
  const { pageData: content } = useEditorContext();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { focusIdx } = useFocusIdx();
  const { dragEnabled } = useDraggable();
  const { setDataTransfer } = useDataTransfer();
  const { dashed } = useContext(EditorPropsContext);

  useEffect(() => {
    if (!isEqual(content, pageData)) {
      setPageData(cloneDeep(content));
    }
  }, [content, pageData]);

  const html = useMemo(() => {
    if (!pageData) return '';

    const renderHtml = mjml(
      transformToMjml({
        data: pageData,
        idx: getPageIdx(),
        context: pageData,
        mode: 'testing',
      })
    ).html;
    return renderHtml;
  }, [pageData]);

  useEffect(() => {
    if (!ref) return;
    getBlockNodes().forEach((child) => {
      child.classList.remove(BLOCK_SELECTED_CLASSNAME);
      const idx = getNodeIdxFromClassName(child.classList);
      if (idx === focusIdx) {
        child.classList.add(BLOCK_SELECTED_CLASSNAME);
      }
    });
  }, [focusIdx, html, ref]);

  useEffect(() => {
    if (!ref) return;

    const onDragstart = (ev: DragEvent) => {
      const node = findBlockNode(ev.target as HTMLDivElement);

      if (node) {
        const idx = getNodeIdxFromClassName(node.classList);
        const type = getNodeTypeFromClassName(node.classList) as BlockType;
        if (!idx || !type) return;
        setDataTransfer({
          type: type,
          action: 'move',
          payload: idx,
        });
      }
    };

    ref.addEventListener('dragstart', onDragstart);
  }, [ref, html, setDataTransfer]);

  useEffect(() => {
    if (dragEnabled) {
      getBlockNodes().forEach((child) => {
        child.setAttribute('draggable', 'true');
      });
    } else {
      getBlockNodes().forEach((child) => {
        child.setAttribute('draggable', 'false');
      });
    }
  }, [dragEnabled, html]);

  return useMemo(() => {
    return (
      <div data-dashed={dashed} ref={setRef} style={{ height: '100%' }}>
        {ref && createPortal(HtmlStringToReactNodes(html), ref)}
      </div>
    );
  }, [html, ref, dashed]);
}

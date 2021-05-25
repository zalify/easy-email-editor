import React, { useEffect, useMemo, useState } from 'react';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import { useFormikContext } from 'formik';
import {
  getNodeIdxFromClassName,
  getPageIdx,
  getValueByIdx,
} from '@/utils/block';
import { cloneDeep, isEqual } from 'lodash';
import { IPage } from '@/components/core/blocks/basic/Page';
import { BLOCK_SELECTED_CLASSNAME } from '@/constants';
import { findBlockNode } from '@/utils/findBlockNode';
import { getEditNode } from '@/utils/getEditNode';
import { IEmailTemplate } from '@/typings';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { getBlockNodes } from '@/utils/findBlockNodeByIdx';

export function MjmlDomRender() {
  const formikContext = useFormikContext<IEmailTemplate>();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    if (!isEqual(formikContext.values.content, pageData)) {
      setPageData(cloneDeep(formikContext.values.content));
    }
  }, [formikContext, pageData]);

  const html = useMemo(() => {
    if (!pageData) return '';
    return mjml(transformToMjml(pageData, getPageIdx())).html;
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
        if (!idx) return;

        const block = getValueByIdx(formikContext.values, idx);
        if (!block) return;
        ev.dataTransfer?.setData('Text', block.type);
        ev.dataTransfer?.setData('Action', 'move');
        ev.dataTransfer?.setData('Payload', JSON.stringify(idx));
      }
    };

    ref.addEventListener('dragstart', onDragstart);
  }, [ref, html, formikContext.values]);

  useEffect(() => {
    if (!ref) return;
    getBlockNodes().forEach((child) => {
      const editNode = getEditNode(child as HTMLElement);
      if (editNode) {
        editNode.contentEditable = 'true';
      }
    });
  }, [ref, html]);

  return useMemo(() => {
    return (
      <div
        ref={setRef}
        dangerouslySetInnerHTML={{ __html: html }}
        style={{ height: '100%' }}
      />
    );
  }, [html]);
}

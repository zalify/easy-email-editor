import React, { useEffect, useMemo, useState } from 'react';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import { useFormikContext } from 'formik';
import { EditorProps } from '@/components/EmailEditorProvider';
import { getNodeIdxFromClassName, getPageIdx, getValueByIdx } from '@/utils/block';
import { cloneDeep, isEqual } from 'lodash';
import { IPage } from '@/components/core/blocks/basic/Page';
import { BLOCK_SELECTED_CLASSNAME } from '@/constants';
import { findBlockNode } from '@/utils/findBlockNode';

export function MjmlDomRender() {
  const formikContext = useFormikContext<EditorProps>();
  const [pageData, setPageData] = useState<IPage | null>(null);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

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
    ref.querySelectorAll('.email-block').forEach((child) => {
      child.classList.remove(BLOCK_SELECTED_CLASSNAME);
      const idx = getNodeIdxFromClassName(child.classList);
      if (idx === formikContext.values.focusIdx) {
        child.classList.add(BLOCK_SELECTED_CLASSNAME);
      }
    });
  }, [formikContext.values.focusIdx, html, ref]);

  useEffect(() => {
    if (!ref) return;
    ref.querySelectorAll('.email-block').forEach((child) => {
      child.setAttribute('draggable', 'true');
    });

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

  return useMemo(() => (
    <div ref={setRef} dangerouslySetInnerHTML={{ __html: html }} style={{ height: '100%' }} />
  ), [html]);
}
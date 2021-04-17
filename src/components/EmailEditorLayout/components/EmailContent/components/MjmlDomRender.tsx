import React, { useEffect, useMemo, useState } from 'react';
import { transformToMjml } from '@/utils/transformToMjml';
import mjml from 'mjml-browser';
import { useFormikContext } from 'formik';
import { EditorProps } from '@/components/EmailEditorProvider';
import { getNodeIdxFromClassName, getPageIdx } from '@/utils/block';
import { cloneDeep, isEqual } from 'lodash';
import { IPage } from '@/components/core/blocks/basic/Page';
import { BLOCK_SELECTED_CLASSNAME } from '@/constants';

export function MjmlDomRender() {
  const formikContext = useFormikContext<EditorProps>();
  const [pageData, setPageData] = useState<IPage | null>(null);

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
    const container = document.getElementById('VisualEditorEditMode')?.shadowRoot;

    if (!container) return;

    container.querySelectorAll('.email-block').forEach((child) => {
      child.classList.remove(BLOCK_SELECTED_CLASSNAME);
      const idx = getNodeIdxFromClassName(child.classList);
      if (idx === formikContext.values.focusIdx) {
        child.classList.add(BLOCK_SELECTED_CLASSNAME);
      }
    });
  }, [formikContext.values.focusIdx, html]);

  return useMemo(() => (
    <div dangerouslySetInnerHTML={{ __html: html }} style={{ height: '100%' }} />
  ), [html]);
}
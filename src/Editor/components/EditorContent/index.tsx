import React, { useEffect, useState } from 'react';

import { transformToMjml } from '@/utils/transformToMjml';
import mjml2Html from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';
import { findBlockByType, getIndexByIdx, getNodeIdxFromClassName, getNodeTypeFromClassName, getPageIdx, getParentIdx } from '@/utils/block';
import { findBlockNode } from '@/utils/findBlockNode';
import { BlockType, BLOCK_HOVER_CLASSNAME, BLOCK_SELECTED_CLASSNAME, DRAG_HOVER_CLASSNAME, DRAG_TANGENT_CLASSNAME } from '@/constants';
import { useBlock } from '@/hooks/useBlock';
import { getTangentDirection } from '@/utils/getTangentDirection';
import { get } from 'lodash';
import { Tooltip } from 'antd';
import { ToolBar } from '../ToolBar';
import { IBlockData } from '@/typings';

export interface EditorProps {

}

export function EditorContent(props: EditorProps) {

  const { pageData } = useEditorContext();
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { focusIdx, values, setFocusIdx, hoverIdx, setHoverIdx, addBlock, focusBlock } = useBlock();

  const smallSceen = window.innerWidth < 1920;

  const html = mjml2Html(transformToMjml(pageData, getPageIdx())).html;
  useEffect(() => {
    if (ref) {
      const onClick = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          const idx = getNodeIdxFromClassName(blockNode.classList)!;
          setFocusIdx(idx);
        }
      };
      const onMouseover = (ev: MouseEvent) => {

        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {

          blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
        }
      };
      const onMouseOut = (ev: MouseEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLElement);
        if (blockNode) {
          blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
        }
      };
      const onDragOver = (ev: DragEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        if (blockNode) {
          ev.preventDefault();

          blockNode.classList.remove(DRAG_HOVER_CLASSNAME);
          blockNode.classList.remove(DRAG_TANGENT_CLASSNAME);
          if (['top', 'bottom'].includes(getTangentDirection(ev))) {
            blockNode.classList.add(DRAG_TANGENT_CLASSNAME);
          } else {
            blockNode.classList.add(DRAG_HOVER_CLASSNAME);
          }
        }
      };
      const onDragLeave = (ev: DragEvent) => {
        const blockNode = findBlockNode(ev.target as HTMLDivElement);
        blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
        blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
      };

      ref.addEventListener('click', onClick);
      ref.addEventListener('mouseover', onMouseover);
      ref.addEventListener('mouseout', onMouseOut);
      ref.addEventListener('dragover', onDragOver);
      ref.addEventListener('dragleave', onDragLeave);
      return () => {
        ref.removeEventListener('click', onClick);
        ref.removeEventListener('mouseover', onMouseover);
        ref.removeEventListener('mouseout', onMouseOut);
        ref.removeEventListener('dragover', onDragOver);
        ref.removeEventListener('dragleave', onDragLeave);
      };
    }
  }, [ref, setFocusIdx]);

  useEffect(() => {

    if (!ref) return;

    const onDrop = (ev: DragEvent) => {

      const target = ev.target as HTMLElement;
      const blockNode = findBlockNode(target);
      blockNode?.classList.remove(DRAG_HOVER_CLASSNAME);
      blockNode?.classList.remove(DRAG_TANGENT_CLASSNAME);
      if (!blockNode) return;

      const type = ev.dataTransfer?.getData('Text') as BlockType;
      console.log('ev.dataTransfer?.getData(\'Payload\')', typeof ev.dataTransfer?.getData('Payload'));
      const payload = ev.dataTransfer?.getData('Payload') ? JSON.parse(ev.dataTransfer?.getData('Payload')) : {} as IBlockData;

      const parentIdx = getNodeIdxFromClassName(blockNode.classList)!;

      const parent = get(values, parentIdx);

      if (parent) {
        ev.preventDefault();

        const direction = getTangentDirection(ev);
        const blockData: Parameters<typeof addBlock>[0] = {
          payload,
          type,
          parentIdx
        };

        if (direction === 'top') {
          blockData.parentIdx = getParentIdx(parentIdx)!;
          blockData.positionIndex = +getIndexByIdx(parentIdx);

        } else if (direction === 'bottom') {
          blockData.parentIdx = getParentIdx(parentIdx)!;
          blockData.positionIndex = +getIndexByIdx(parentIdx) + 1;
        }

        addBlock(blockData);
      }
    };

    ref.addEventListener('drop', onDrop);
    return () => {

      ref.removeEventListener('drop', onDrop);
    };
  }, [addBlock, ref, values]);

  useEffect(() => {
    if (!ref) return;

    ref.querySelectorAll('[class]').forEach(child => {
      child.classList.remove(BLOCK_SELECTED_CLASSNAME);
      const idx = getNodeIdxFromClassName(child.classList);
      if (idx === focusIdx) {
        child.classList.add(BLOCK_SELECTED_CLASSNAME);
      }
    });

  }, [focusIdx, ref, html]);

  return (
    <>
      <style>
        {
          `
          .node-type-page {
            min-height: 100%
          }
          .node-type-column , .node-type-group{
            min-height: 30px
          }
        `
        }
      </style>
      <Tooltip
        key={2}
        placement={smallSceen ? 'topRight' : 'topLeft'}
        title={<ToolBar />}
        visible={!!focusBlock}
      >
        <div style={{ height: '100%' }} ref={setRef} dangerouslySetInnerHTML={{ __html: html }} />
      </Tooltip>

    </>
  );
}

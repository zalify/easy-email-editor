import { useEffect } from 'react';
import isHotkey from 'is-hotkey';
import { useBlock } from './useBlock';
import { getEditorRoot, getShadowRoot } from '@/utils/findBlockNodeByIdx';
import { useFocusIdx } from './useFocusIdx';
import { useEditorContext } from './useEditorContext';
import { getChildIdx, getIndexByIdx, getNodeIdxFromClassName, getParentByIdx, getParentIdx, getSiblingIdx, getValueByIdx } from '@/utils/block';
import { IEmailTemplate } from '@/typings';
import { findBlockNode } from '@/utils/findBlockNode';

function isContentEditFocus() {

  const isShadowRootFocus = document.activeElement === getEditorRoot();
  if (isShadowRootFocus) {
    if (
      getEditorRoot()?.shadowRoot?.activeElement?.getAttribute(
        'contenteditable'
      ) === 'true'
    ) {
      return true;
    }
  } else {
    if (
      ['input', 'textarea'].includes(
        document.activeElement?.tagName.toLocaleLowerCase() || ''
      ) ||
      document.activeElement?.getAttribute('contenteditable') === 'true'
    ) {
      return true;
    }
  }
  return false;
}

export function useHotKeys() {
  const { redo, undo, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { values } = useEditorContext();

  const root = getShadowRoot();
  // redo/undo
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (isContentEditFocus()) return;
      if (isHotkey('mod+z', ev)) {
        ev.preventDefault();
        undo();
      }
      if (isHotkey('mod+y', ev)) {
        ev.preventDefault();
        redo();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [redo, undo]);

  // delete
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      const isShadowRootFocus = document.activeElement === getEditorRoot();

      if (!isShadowRootFocus) return;
      if (isContentEditFocus()) return;
      if (isHotkey('delete', ev) || isHotkey('backspace', ev)) {
        removeBlock(focusIdx);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [focusIdx, removeBlock]);

  // focus
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      const isShadowRootFocus = document.activeElement === getEditorRoot();

      if (!isShadowRootFocus) return;
      if (isHotkey('tab', ev) || isHotkey('shift+tab', ev)) {
        setTimeout(() => {
          const activeElement = getShadowRoot().activeElement;
          if (activeElement instanceof HTMLElement) {
            const blockNode = findBlockNode(activeElement);
            if (blockNode) {
              const idx = getNodeIdxFromClassName(blockNode.classList)!;
              setFocusIdx(idx);
            }
          }
        }, 0);
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [focusIdx, removeBlock, setFocusIdx, values]);
}

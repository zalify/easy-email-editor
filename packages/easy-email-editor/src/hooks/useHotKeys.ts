import { useEffect } from 'react';
import isHotkey from 'is-hotkey';
import { useBlock } from './useBlock';
import { getIframeDocument } from '@/utils';
import { useFocusIdx } from './useFocusIdx';
import { useEditorContext } from './useEditorContext';
import { getNodeIdxFromClassName } from 'easy-email-core';
import { getBlockNodeByChildEle } from '@/utils/getBlockNodeByChildEle';
import { getEditorRoot } from '@/utils/getEditorRoot';

function isContentEditFocus() {
  const isIframeFocused = document.activeElement === getEditorRoot();

  if (isIframeFocused) {
    if (
      getIframeDocument()?.activeElement?.getAttribute(
        'contenteditable',
      ) === 'true'
    ) {
      return true;
    }
  } else if (
    ['input', 'textarea'].includes(
      getIframeDocument()?.activeElement?.tagName.toLocaleLowerCase() || '',
    ) ||
    getIframeDocument()?.activeElement?.getAttribute('contenteditable') === 'true'
  ) {
    return true;
  }
  return false;
}

export function useHotKeys() {
  const { redo, undo, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const {
    formState: { values },
  } = useEditorContext();

  // redo/undo
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (isContentEditFocus()) return;
      if (isHotkey('mod+z', ev)) {
        ev.preventDefault();
        undo();
      }
      if (isHotkey('mod+y', ev) || isHotkey('mod+shift+z', ev)) {
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
      const isIframeFocused = document.activeElement === getEditorRoot();

      if (!isIframeFocused) return;
      if (isContentEditFocus()) return;
      // if (isHotkey('delete', ev) || isHotkey('backspace', ev)) {
      //   removeBlock(focusIdx);
      // }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [focusIdx, removeBlock]);

  // focus
  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      const isIframedFocused = document.activeElement === getEditorRoot();

      if (!isIframedFocused) return;
      if (isHotkey('tab', ev) || isHotkey('shift+tab', ev)) {
        setTimeout(() => {
          const activeElement = getIframeDocument()?.activeElement;
          if (activeElement instanceof HTMLElement) {
            const blockNode = getBlockNodeByChildEle(activeElement);
            if (blockNode) {
              const idx = getNodeIdxFromClassName(blockNode.classList)!;
              setFocusIdx(idx);
            }
          }
        }, 0);
      }
    };
    getEditorRoot().contentWindow?.addEventListener('keydown', onKeyDown);

    return () => {
      getEditorRoot().contentWindow?.removeEventListener('keydown', onKeyDown);
    };
  }, [focusIdx, removeBlock, setFocusIdx, values]);
}

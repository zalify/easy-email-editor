import { useEffect } from 'react';
import isHotkey from 'is-hotkey';
import { useBlock } from './useBlock';
import { useFocusIdx } from 'easy-email-editor';
import { getEditorRoot, getShadowRoot } from '@/utils/findBlockNodeByIdx';

function isContentEditFocus() {
  const isShadowRootFocus = document.activeElement === getEditorRoot();
  if (isShadowRootFocus) {
    if (getEditorRoot()?.shadowRoot?.activeElement?.getAttribute('contenteditable') === 'true') {
      return true;
    }
  } else {
    if (['input', 'textarea'].includes(document.activeElement?.tagName || '') || document.activeElement?.getAttribute('contenteditable') === 'true') {
      return true;
    }
  }
  return false;
}

export function useHotKeys() {
  const { redo, undo, redoable, undoable, reset, removeBlock } = useBlock();
  const { focusIdx } = useFocusIdx();

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (isContentEditFocus()) return;
      if (isHotkey('mod+z', ev)) {
        undo();

      }
      if (isHotkey('mod+y', ev)) {
        redo();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [redo, undo]);

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
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
}
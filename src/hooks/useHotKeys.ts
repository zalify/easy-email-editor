import { useEffect } from 'react';
import isHotkey from 'is-hotkey';
import { useBlock } from './useBlock';
import { getEditorRoot, getShadowRoot } from '@/utils/findBlockNodeByIdx';
import {
  getPageIdx, getParentIdx,
} from '@/utils/block';
import { useFocusIdx } from './useFocusIdx';

function isContentEditFocus() {
  const isShadowRootFocus = document.activeElement === getEditorRoot();
  if (isShadowRootFocus) {
    if (getEditorRoot()?.shadowRoot?.activeElement?.getAttribute('contenteditable') === 'true') {
      return true;
    }
  } else {

    if (['input', 'textarea'].includes(document.activeElement?.tagName.toLocaleLowerCase() || '') || document.activeElement?.getAttribute('contenteditable') === 'true') {
      return true;
    }
  }
  return false;
}

export function useHotKeys() {

  const { redo, undo, removeBlock } = useBlock();
  const { setFocusIdx, focusIdx } = useFocusIdx();
  const root = getShadowRoot();
  // redo/undo
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

  // select block
  useEffect(() => {

    if (!root) return;
    const onSelectParent = (ev: Event) => {
      const target = ev.target as HTMLDivElement;

      if (target.id !== 'VisualEditorEdit-mask') return;
      if (focusIdx === getPageIdx()) return;
      setFocusIdx(getParentIdx(focusIdx)!);
    };

    const onSelectPage = (ev: Event) => {
      const target = ev.target as HTMLDivElement;
      if (target.id !== 'VisualEditorEdit-mask') return;
      setFocusIdx(getPageIdx());
    };

    root.addEventListener('click', onSelectParent);
    root.addEventListener('dblclick', onSelectPage);

    return () => {
      root.removeEventListener('click', onSelectParent);
      root.removeEventListener('dblclick', onSelectPage);
    };
  }, [root, focusIdx, removeBlock, setFocusIdx]);

}
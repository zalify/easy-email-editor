import { SYNC_SCROLL_ELEMENT_CLASS_NAME, useActiveTab } from '@';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

export const SyncScrollShadowDom: React.FC<React.HTMLProps<HTMLElement>> = (props) => {
  const [root, setRoot] = useState<null | ShadowRoot>(null);
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const { viewElementRef } = useDomScrollHeight();
  const { activeTab } = useActiveTab();

  const setFirstVisibleEle = useCallback((root: HTMLElement) => {
    if (!root.shadowRoot) return;

    const { left, width, top } = root.getBoundingClientRect();

    const ele = root.shadowRoot.elementFromPoint(left + width / 2, top);

    if (ele) {
      const { top: viewEleTop } = ele.getBoundingClientRect();

      viewElementRef.current = {
        selector: ele.getAttribute('data-selector') || '',
        top: viewEleTop - top
      };
    }
  }, [viewElementRef]);

  useEffect(() => {

    const viewElement = viewElementRef.current;

    if (viewElement && root) {
      const viewElementNode = root.querySelector(`[data-selector="${viewElement?.selector}"]`);
      const scrollEle = root.querySelector(`.${SYNC_SCROLL_ELEMENT_CLASS_NAME}`);
      if (viewElementNode && scrollEle) {
        viewElementNode.scrollIntoView();
        scrollEle.scrollTo(0, scrollEle.scrollTop - viewElement.top);
      }
    }
  }, [root, viewElementRef, activeTab]);

  useEffect(() => {
    if (ref) {
      const root = ref.attachShadow({ mode: 'open' });
      setRoot(root);
      if (!ref.shadowRoot) return;

      const onScroll = () => {
        if (!ref.shadowRoot) return;
        setFirstVisibleEle(ref);
      };
      ref.shadowRoot.addEventListener('scroll', onScroll, true);
      return () => {
        ref.shadowRoot?.removeEventListener('scroll', onScroll, true);
      };
    }
  }, [ref, setFirstVisibleEle]);

  return (
    <>
      <div {...(props as any)} ref={setRef}>
        {root && ReactDOM.createPortal(props.children, root as any)}
      </div>
    </>
  );
};

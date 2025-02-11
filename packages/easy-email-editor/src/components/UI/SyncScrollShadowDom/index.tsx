import { SYNC_SCROLL_ELEMENT_CLASS_NAME, useActiveTab } from '@';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { debounce } from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

// It will be occluded by richText bar, so it needs to be offset
const offsetTop = 50;

export const SyncScrollShadowDom: React.FC<React.HTMLProps<HTMLElement> & { isActive: boolean; }> = (props) => {
  const [root, setRoot] = useState<null | ShadowRoot>(null);
  const [ref, setRef] = useState<null | HTMLDivElement>(null);
  const { viewElementRef } = useDomScrollHeight();
  const { activeTab } = useActiveTab();
  const { isActive, ...rest } = props;

  const setFirstVisibleEle = useCallback(debounce((root: HTMLElement) => {
    if (!root.shadowRoot) return;

    const { left, width, top: containerTop } = root.getBoundingClientRect();

    const ele = root.shadowRoot.elementFromPoint(left + width / 2, containerTop + offsetTop);

    const findSelectorNode = (ele: Element): Element | null => {
      if (ele.getAttribute('data-selector')) {
        return ele;
      }
      if (ele.parentNode instanceof Element) {
        return findSelectorNode(ele.parentNode);
      }
      return null;
    };

    const selectorNode = ele && findSelectorNode(ele);

    viewElementRef.current = null;
    if (selectorNode) {
      const { top: selectorEleTop } = selectorNode.getBoundingClientRect();

      let selectorDiffTop = selectorEleTop - containerTop;

      const selector = selectorNode.getAttribute('data-selector');

      if (selector) {
        viewElementRef.current = {
          selector: selector || '',
          top: selectorDiffTop
        };

      }

    }
  }, 200), [viewElementRef]);

  useEffect(() => {
    if (!isActive || !root) return;
    const viewElement = viewElementRef.current;
    const scrollEle = root.querySelector(`.${SYNC_SCROLL_ELEMENT_CLASS_NAME}`);
    if (!scrollEle) return;

    if (viewElement) {
      const viewElementNode = root.querySelector(`[data-selector="${viewElement?.selector}"]`);

      if (viewElementNode && scrollEle) {

        viewElementNode.scrollIntoView();

        scrollEle.scrollTo(0, scrollEle.scrollTop - viewElement.top);
      }
    } else {

      scrollEle.scrollTo(0, 0);
    }
  }, [root, viewElementRef, activeTab, isActive]);

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
      <div {...(rest as any)} ref={setRef}>
        {root && ReactDOM.createPortal(props.children, root as any)}
      </div>
    </>
  );
};

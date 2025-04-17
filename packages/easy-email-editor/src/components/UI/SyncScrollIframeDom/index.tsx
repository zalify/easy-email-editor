import { SYNC_SCROLL_ELEMENT_CLASS_NAME, useActiveTab } from '@';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// It will be occluded by richText bar, so it needs to be offset
const offsetTop = 50;

export const SyncScrollIframeDom: React.FC<React.HTMLProps<HTMLElement> & {
  isActive: boolean;
  title?: string;
}> = (props) => {
  const iframeRef = useRef<null | HTMLIFrameElement>(null);

  const { viewElementRef } = useDomScrollHeight();
  const { activeTab } = useActiveTab();
  const { isActive, ...rest } = props;

  useEffect(() => {
    if (!iframeRef.current?.contentDocument) return;

    const root = iframeRef.current;

    const { left, width, top: containerTop } = root.getBoundingClientRect();

    const ele = root.contentDocument?.elementFromPoint(left + width / 2, containerTop + offsetTop);

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
          selector: selector,
          top: selectorDiffTop,
        };

      }

    }
  }, [viewElementRef, iframeRef]);

  useEffect(() => {
    if (!isActive || !iframeRef.current) return;
    const viewElement = viewElementRef.current;
    const scrollEle = iframeRef.current.querySelector(`.${SYNC_SCROLL_ELEMENT_CLASS_NAME}`);
    if (!scrollEle) return;

    if (viewElement) {
      const viewElementNode = iframeRef.current.querySelector(`[data-selector="${viewElement?.selector}"]`);

      if (viewElementNode && scrollEle) {

        viewElementNode.scrollIntoView();

        scrollEle.scrollTo(0, scrollEle.scrollTop - viewElement.top);
      }
    } else {
      scrollEle.scrollTo(0, 0);
    }
  }, [iframeRef, viewElementRef, activeTab, isActive]);

  return (
    <iframe title={props.title} {...(rest as any)} ref={iframeRef}>
      {iframeRef?.current?.contentDocument && createPortal(props.children, iframeRef.current.contentDocument.body)}
    </iframe>
  );
};


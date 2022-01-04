import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { awaitForElement } from '@/utils/awaitForElement';
import { getShadowRoot } from '@/utils';
import { IBlockData } from 'easy-email-core';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { debounce } from 'lodash';

export const FocusBlockLayoutContext = React.createContext<{
  focusBlockNode: HTMLDivElement | null;
  focusBlockRect: DOMRect | null;
}>({
  focusBlockNode: null,
  focusBlockRect: null,
});

export const FocusBlockLayoutProvider: React.FC = (props) => {
  const [focusBlockNode, setFocusBlockNode] = useState<HTMLDivElement | null>(
    null
  );
  const [focusBlockRect, setFocusBlockRect] = useState<DOMRect | null>(null);
  const { focusIdx } = useFocusIdx();
  const { focusBlock } = useBlock();
  const lastFocusBlock = useRef<IBlockData | null>(null);

  const isBlockEqual = useMemo(() => {
    if (lastFocusBlock.current === focusBlock) return true;
    lastFocusBlock.current = focusBlock;
    return false;
  }, [focusBlock]);

  useEffect(() => {
    if (isBlockEqual) return;

    const promiseObj = awaitForElement<HTMLDivElement>(focusIdx);
    promiseObj.promise.then((focusBlockNode) => {
      setFocusBlockNode(focusBlockNode);
    });

    return () => {
      promiseObj.cancel();
    };
  }, [focusIdx, isBlockEqual]);

  useEffect(() => {
    if (!focusBlockNode) return;

    const rect = focusBlockNode.getBoundingClientRect();
    const ele = getShadowRoot().querySelector('.shadow-container');

    if (!ele) return;
    setFocusBlockRect(rect);
    let initScrollTop = ele.scrollTop;

    const check = debounce((currentTop: number) => {
      const diffTop = currentTop - initScrollTop;
      setFocusBlockRect({
        ...rect,
        left: rect.left,
        top: rect.top - diffTop,
      });
    });

    const onScroll = (ev: Event) => {
      if (ev.target instanceof HTMLElement) {
        check(ev.target.scrollTop);
      }
    };

    ele.addEventListener('scroll', onScroll, true);
    return () => {
      ele.removeEventListener('scroll', onScroll, true);
    };
  }, [focusBlockNode]);

  const value = useMemo(() => {
    return {
      focusBlockNode,
      focusBlockRect,
    };
  }, [focusBlockRect, focusBlockNode]);

  return (
    <FocusBlockLayoutContext.Provider value={value}>
      {props.children}
    </FocusBlockLayoutContext.Provider>
  );
};

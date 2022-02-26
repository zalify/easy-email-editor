import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { awaitForElement } from '@/utils/awaitForElement';
import { IBlockData } from 'easy-email-core';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';

export const FocusBlockLayoutContext = React.createContext<{
  focusBlockNode: HTMLDivElement | null;
}>({
  focusBlockNode: null,
});

export const FocusBlockLayoutProvider: React.FC = (props) => {
  const [focusBlockNode, setFocusBlockNode] = useState<HTMLDivElement | null>(
    null
  );
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

  const value = useMemo(() => {
    return {
      focusBlockNode,
    };
  }, [focusBlockNode]);

  return (
    <FocusBlockLayoutContext.Provider value={value}>
      {props.children}
    </FocusBlockLayoutContext.Provider>
  );
};

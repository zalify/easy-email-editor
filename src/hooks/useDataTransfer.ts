import { useContext, useMemo } from 'react';
import { HoverIdxContext } from '@/components/Provider/HoverIdxProvider';

export function useDataTransfer() {
  const { dataTransfer, setDataTransfer } = useContext(HoverIdxContext);

  return useMemo(
    () => ({
      dataTransfer,
      setDataTransfer,
    }),
    [dataTransfer, setDataTransfer]
  );
}

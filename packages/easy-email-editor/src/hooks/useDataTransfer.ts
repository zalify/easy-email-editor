import { useCallback, useContext, useMemo } from 'react';
import { HoverIdxContext } from '@/components/Provider/HoverIdxProvider';
import { debounce } from 'lodash';

export function useDataTransfer() {
  const { dataTransfer, setDataTransfer } = useContext(HoverIdxContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDataTransferDebounce = useCallback(debounce(setDataTransfer), [
    setDataTransfer,
  ]);

  return useMemo(
    () => ({
      dataTransfer,
      setDataTransfer: setDataTransferDebounce,
    }),
    [dataTransfer, setDataTransferDebounce]
  );
}

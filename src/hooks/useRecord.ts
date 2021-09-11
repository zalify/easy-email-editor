import { RecordContext } from '@/components/Provider/RecordProvider';
import { useContext, useMemo } from 'react';

export function useRecord() {
  const { add } = useContext(RecordContext);

  return useMemo(() => ({
    add
  }), [add]);
}
import { BlocksContext } from '@/components/Provider/BlocksProvider';
import { useContext } from 'react';

export function useDraggable() {
  const { dragEnabled, setDragEnabled } = useContext(BlocksContext);
  return {
    dragEnabled,
    setDragEnabled,
  };
}

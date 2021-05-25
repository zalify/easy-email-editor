import { BlocksContext } from '@/components/Provider/BlocksProvider';
import { useContext } from 'react';

export function useCollapse() {
  const { collapsed, setCollapsed } = useContext(BlocksContext);
  return {
    collapsed,
    setCollapsed
  };
}

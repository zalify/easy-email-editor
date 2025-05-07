import { BlocksContext } from '@/components/Provider/BlocksProvider';
import { useContext } from 'react';

export function useActiveTab() {
  const { activeTab, setActiveTab } = useContext(BlocksContext);
  return {
    activeTab,
    setActiveTab,
  };
}

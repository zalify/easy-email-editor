import loading from '@example/store/common/loading';
import { useAppSelector } from './useAppSelector';

export function useLoading(keys: string | string[]) {
  const loadings = useAppSelector('loading');
  return Array.isArray(keys) ? keys.some(key => loadings[key]) : loadings[keys];
}
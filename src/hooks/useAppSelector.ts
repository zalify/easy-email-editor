import { useSelector } from 'react-redux';
import { AppState } from '@demo/store';

export function useAppSelector<T extends keyof AppState>(selector: T) {
  return useSelector<AppState, AppState[T]>((state) => state[selector]);
}

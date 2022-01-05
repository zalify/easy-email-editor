import { FocusBlockLayoutContext } from './../components/Provider/FocusBlockLayoutProvider/index';
import { useContext } from 'react';

export function useFocusBlockLayout() {
  return useContext(FocusBlockLayoutContext);
}

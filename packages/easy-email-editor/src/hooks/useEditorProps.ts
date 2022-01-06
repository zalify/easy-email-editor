import {
  EditorPropsContext,
  PropsProviderProps,
} from '@/components/Provider/PropsProvider';
import { useContext } from 'react';

export function useEditorProps<T extends PropsProviderProps>(): T {
  return useContext(EditorPropsContext) as any;
}

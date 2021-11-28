import {
  EditorPropsContext,
  PropsProviderProps,
} from '@/components/Provider/PropsProvider';
import { useContext } from 'react';

export function useEditorProps(): PropsProviderProps {
  return useContext(EditorPropsContext);
}

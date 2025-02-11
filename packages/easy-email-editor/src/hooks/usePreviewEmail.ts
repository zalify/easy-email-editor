import { PreviewEmailContext } from '@/components/Provider/PreviewEmailProvider';
import { useContext } from 'react';

export function usePreviewEmail() {
  return useContext(PreviewEmailContext);
}

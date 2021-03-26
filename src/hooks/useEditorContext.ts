import { EditorProps } from '@/components/EditorProvider';
import { useFormikContext } from 'formik';

export function useEditorContext() {
  const formikContext = useFormikContext<EditorProps>();
  const { content } = formikContext.values;
  return {
    ...formikContext,
    pageData: content,
  };
}

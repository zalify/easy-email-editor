import { IEmailTemplate } from '@/typings';
import { useFormikContext } from 'formik';

export function useEditorContext() {
  const formikContext = useFormikContext<IEmailTemplate>();
  const { content } = formikContext.values;
  return {
    ...formikContext,
    pageData: content,
  };
}

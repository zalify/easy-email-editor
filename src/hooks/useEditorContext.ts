import { IEmailTemplate } from '@/typings';
import { useFormState, useForm } from 'react-final-form';

export function useEditorContext() {
  const formState = useFormState<IEmailTemplate>();
  const helpers = useForm();

  const { content } = formState.values;
  return {
    ...formState,
    ...helpers,
    pageData: content,
  };
}

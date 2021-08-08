import { IEmailTemplate } from '@/typings';
import { Form, useForm, useFormState } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import React, { useMemo } from 'react';
import { BlocksProvider } from '..//BlocksProvider';
import { HoverIdxProvider } from '../HoverIdxProvider';
import { PropsProvider, PropsProviderProps } from '../PropsProvider';
import { RecordProvider } from '../RecordProvider';
import { SelectionRangeProvider } from '../SelectionRangeProvider';
import { ScrollProvider } from '../ScrollProvider';
import { Config, FormApi, FormState } from 'final-form';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
  extends PropsProviderProps {
  data: T;
  children: (
    props: FormState<T>,
    helper: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
  ) => React.ReactNode;
  onSubmit?: Config<IEmailTemplate, Partial<IEmailTemplate>>['onSubmit'];
  validationSchema?: Config<
    IEmailTemplate,
    Partial<IEmailTemplate>
  >['validate'];
}

export const EmailEditorProvider = (
  props: EmailEditorProviderProps<IEmailTemplate>
) => {
  const { data, children, onSubmit = () => {}, validationSchema } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
    };
  }, [data]);

  if (!initialValues.content) return null;

  return (
    <Form<IEmailTemplate>
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validate={validationSchema}
      mutators={{ ...arrayMutators }}
      subscription={{ submitting: true, pristine: true }}
    >
      {() => (
        <PropsProvider {...props}>
          <RecordProvider>
            <BlocksProvider>
              <HoverIdxProvider>
                <SelectionRangeProvider>
                  <ScrollProvider>
                    <FormikWrapper children={children} />
                  </ScrollProvider>
                </SelectionRangeProvider>
              </HoverIdxProvider>
            </BlocksProvider>
          </RecordProvider>
        </PropsProvider>
      )}
    </Form>
  );
};

function FormikWrapper({
  children,
}: {
  children: EmailEditorProviderProps['children'];
}) {
  const data = useFormState<IEmailTemplate>();
  const helper = useForm<IEmailTemplate>();
  return <>{children(data, helper)}</>;
}

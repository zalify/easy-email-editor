import { IEmailTemplate } from '@/typings';
import { Formik, FormikConfig, FormikProps, useFormikContext } from 'formik';
import React, { useMemo } from 'react';
import { BlocksProvider } from '..//BlocksProvider';
import { HoverIdxProvider } from '../HoverIdxProvider';
import { PropsProvider, PropsProviderProps } from '../PropsProvider';
import { RecordProvider } from '../RecordProvider';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
  extends PropsProviderProps {
  data: T;
  children: (props: FormikProps<IEmailTemplate>) => React.ReactNode;
  onSubmit?: FormikConfig<IEmailTemplate>['onSubmit'];
}

export const EmailEditorProvider = (
  props: EmailEditorProviderProps<IEmailTemplate>
) => {
  const { data, children, onSubmit = () => {} } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
    };
  }, [data]);

  if (!initialValues.content) return null;

  return (
    <Formik<IEmailTemplate>
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <PropsProvider {...props}>
        <RecordProvider>
          <BlocksProvider>
            <HoverIdxProvider>
              <FormikWrapper children={children} />
            </HoverIdxProvider>
          </BlocksProvider>
        </RecordProvider>
      </PropsProvider>
    </Formik>
  );
};

interface FormikWrapperProps {
  children: EmailEditorProviderProps['children'];
}

function FormikWrapper({ children }: FormikWrapperProps) {
  const data = useFormikContext<IEmailTemplate>();
  return <>{children(data)}</>;
}

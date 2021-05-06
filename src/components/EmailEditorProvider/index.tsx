import { IEmailTemplate } from '@/typings';
import { getPageIdx } from '@/utils/block';
import { Formik, FormikProps } from 'formik';
import React, { useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';
import { PropsProvider, PropsProviderProps } from '../PropsProvider';
import { RecordProvider } from '../RecordProvider';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any>
  extends PropsProviderProps {
  data: T;
  children: (props: FormikProps<EditorProps>) => React.ReactNode;
}

export interface EditorProps {
  subject: string;
  subTitle: string;
  content: IPage;
  focusIdx: string;
  hoverIdx: string;
}

export const EmailEditorProvider = (
  props: EmailEditorProviderProps<IEmailTemplate>
) => {
  const { data, children } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
      focusIdx: getPageIdx(),
      hoverIdx: '',
    };
  }, [data]);

  if (!initialValues.content) return null;

  return (
    <Formik<EditorProps>
      initialValues={initialValues}
      onSubmit={() => { }}
      enableReinitialize
    >
      {(...rest) => {
        return (
          <PropsProvider {...props}>
            <RecordProvider>{children(...rest)}</RecordProvider>
          </PropsProvider>
        );
      }}
    </Formik>
  );
};

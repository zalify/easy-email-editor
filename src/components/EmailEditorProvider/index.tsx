import { IEmailTemplate } from '@/typings';
import { Formik, FormikProps } from 'formik';
import React, { useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';
import { RecordProvider } from '../RecordProvider';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any> {
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

export const EmailEditorProvider = (props: EmailEditorProviderProps<IEmailTemplate>) => {
  const { data, children } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
      focusIdx: 'content',
      hoverIdx: '',

    };
  }, [data]);

  if (!initialValues.content) return null;

  return (
    <Formik<EditorProps>
      initialValues={initialValues}
      onSubmit={() => { }}
    >
      {
        (...rest) => {
          return (
            <RecordProvider>
              {children(...rest)}
            </RecordProvider>
          );
        }
      }

    </Formik>
  );
};


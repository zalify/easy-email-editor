import { IEmailTemplate } from '@/typings';
import { Formik } from 'formik';
import React, { useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';
import { EmailEditorLayout } from '../EmailEditorLayout';
import { RecordProvider } from '../RecordProvider';

export interface EmailEditorProviderProps<T extends IEmailTemplate = any> {
  data: T;
  onSubmit: (data: EditorProps) => void;
}

export interface EditorProps {
  subject: string;
  subTitle: string;
  content: IPage;
  focusIdx: string;
  hoverIdx: string;
}

export const EmailEditorProvider = (props: EmailEditorProviderProps<IEmailTemplate>) => {
  const { data, onSubmit } = props;

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
      onSubmit={onSubmit}
    >
      <RecordProvider>
        <EmailEditorLayout />
      </RecordProvider>

    </Formik>
  );
};


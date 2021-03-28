import { IEmailTemplate } from '@/typings';
import { transformToMjml } from '@/utils/transformToMjml';
import { Formik } from 'formik';
import React, { ReactNode, useMemo } from 'react';
import { IPage } from '../core/blocks/basic/Page';

export interface EditorProviderProps<T extends IEmailTemplate = any> {
  data: T;
  onSubmit: (data: EditorProps) => void;
  children:
  | ((params: {
    handleSubmit: (
      e?: React.FormEvent<HTMLFormElement> | undefined
    ) => void;
  }) => ReactNode)
  | ReactNode;
  uploadHandler: EditorProps['props']['uploadHandler'];
}

export interface EditorProps {
  subject: string;
  subTitle: string;
  content: IPage;
  focusIdx: string;
  hoverIdx: string;
  variableMap: { [key: string]: any; };
  actionMap: { [key: string]: any; };
  props: {
    uploadHandler: (file: File) => Promise<string>;
  };
}

export const EditorProvider = (props: EditorProviderProps<IEmailTemplate>) => {
  const { data, onSubmit, uploadHandler } = props;

  const initialValues = useMemo(() => {
    return {
      subject: data.subject,
      subTitle: data.subTitle,
      content: data.content,
      focusIdx: 'content',
      hoverIdx: '',
      variableMap: {},
      actionMap: {},
      props: {
        uploadHandler,
      },
    };
  }, [data, uploadHandler]);

  if (!initialValues.content) return null;

  return (
    <Formik<EditorProps>
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {props.children}
    </Formik>
  );
};

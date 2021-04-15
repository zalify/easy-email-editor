/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@example/store/template';
import { useAppSelector } from '@example/hooks/useAppSelector';
import { useLoading } from '@example/hooks/useLoading';
import { Button, message, PageHeader } from 'antd';
import { useQuery } from '@example/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { Loading } from '@example/components/loading';
import { EmailEditor } from '@/index';
import { Stack } from '@/components/Stack';
import { EmailEditorLayout } from '@/components/EmailEditorLayout';
import { EditorProps } from '@/components/EmailEditorProvider';
import mjml from 'mjml-browser';
import { transformToMjml } from '@/utils/transformToMjml';

export default function Editor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const { id } = useQuery();
  const loading = useLoading(template.loadings.fetchById);

  const isSubmitting = useLoading([
    template.loadings.create,
    template.loadings.updateById,
  ]);

  useEffect(() => {
    if (id) {
      dispatch(template.actions.fetchById(+id));
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }
  }, [dispatch, id]);

  const onSubmit = useCallback(
    (values: EditorProps) => {
      if (id) {
        dispatch(
          template.actions.updateById({
            id: +id,
            template: values,
            success() {
              message.success('Updated success!');
            },
          })
        );
      } else {
        dispatch(
          template.actions.create({
            template: values,
            success(templateId) {
              history.replace(`/editor?id=${templateId}`);
              message.success('Saved success!');
            },
          })
        );
      }
    },
    [dispatch, history, id]
  );

  const onExportHtml = (values: EditorProps) => {
    console.log(
      mjml(transformToMjml(values.content), {
        beautify: true,
        validationLevel: 'soft',
      }).html
    );
  };

  const initialValues: EditorProps | null = useMemo(() => {
    if (!templateData) return null;
    return {
      ...templateData,
      content: cloneDeep(templateData.content), // because redux object is not extensible
    };
  }, [templateData]);

  if (!templateData && loading) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  if (!initialValues) return null;

  return (
    <div>
      <EmailEditor data={initialValues}>
        {({ values }) => (
          <>
            <PageHeader
              title='Edit'
              extra={
                <Stack>
                  <Button onClick={() => onExportHtml(values)}>
                    Export html
                  </Button>
                  <Button
                    loading={isSubmitting}
                    type='primary'
                    onClick={() => onSubmit(values)}
                  >
                    Save
                  </Button>
                </Stack>
              }
            />
            <EmailEditorLayout />
          </>
        )}
      </EmailEditor>
    </div>
  );
}

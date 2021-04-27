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
import { EmailEditor, EmailEditorLayout, EditorProps } from '@/index';
import { Stack } from '@/components/Stack';
import mjml from 'mjml-browser';
import { transformToMjml } from '@/utils/transformToMjml';
import extraBlocks from '@example/store/extraBlocks';
import { CollectedBlock } from '@/components/PropsProvider';
import { copy } from '@example/util/clipboard';
import { useEmailModal } from './components/useEmailModal';
import { WarnAboutUnsavedChanges } from '@example/components/WarnAboutUnsavedChanges';

export default function Editor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const extraBlocksData = useAppSelector('extraBlocks');
  const { openModal, modal } = useEmailModal();
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
    async (values: EditorProps) => {

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

    const html = mjml(transformToMjml(values.content), {
      beautify: true,
      validationLevel: 'soft',
    }).html;

    copy(html);
    message.success('Copied to pasteboard!');

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

  const onAddCollection = (payload: CollectedBlock) => {
    dispatch(extraBlocks.actions.add(payload));
    message.success('Added to collection!');
  };
  const onRemoveCollection = ({ id }: { id: string; }) => {
    dispatch(extraBlocks.actions.remove({ id }));
    message.success('Removed from collection.');
  };


  return (
    <div>
      <EmailEditor
        data={initialValues}
        extraBlocks={extraBlocksData}
        onAddCollection={onAddCollection}
        onRemoveCollection={onRemoveCollection}
      >
        {({ values, }) => (
          <>
            <PageHeader
              title='Edit'
              onBack={() => history.push('/')}
              extra={
                <Stack>
                  <Button onClick={() => onExportHtml(values)}>
                    Export html
                  </Button>
                  <Button onClick={() => openModal(values)}>
                    Send test email
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
            <WarnAboutUnsavedChanges />
          </>
        )}
      </EmailEditor>
      {modal}
    </div>
  );
}

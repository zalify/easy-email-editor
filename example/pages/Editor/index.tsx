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
import mjml from 'mjml-browser';
import extraBlocks from '@example/store/extraBlocks';
import { CollectedBlock } from 'easy-email-editor';
import { copy } from '@example/util/clipboard';
import { useEmailModal } from './components/useEmailModal';
import { WarnAboutUnsavedChanges } from '@example/components/WarnAboutUnsavedChanges';
import services from '@example/services';

import {
  EmailEditor,
  EmailEditorLayout,
  IEmailTemplate,
  transformToMjml,
} from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';
import { Stack } from '@example/components/Stack';
import { customBlocks } from './components/CustomBlocks';

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

    return () => {
      dispatch(template.actions.set(null));
    };
  }, [dispatch, id]);

  const onSubmit = useCallback(
    async (values: IEmailTemplate) => {
      if (id) {
        dispatch(
          template.actions.updateById({
            id: +id,
            template: values,
            success(templateId) {
              message.success('Updated success!');
              history.replace(`/editor?id=${templateId}`);
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

  const onExportHtml = (values: IEmailTemplate) => {
    const html = mjml(transformToMjml(values.content), {
      beautify: true,
      validationLevel: 'soft',
    }).html;

    copy(html);
    message.success('Copied to pasteboard!');
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    return {
      ...templateData,
      content: cloneDeep(templateData.content), // because redux object is not extensible
    };
  }, [templateData]);

  const extraBlocksList = useMemo(() => {
    return [customBlocks, ...extraBlocksData];
  }, [extraBlocksData]);

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
  const onRemoveCollection = ({ id }: { id: string }) => {
    dispatch(extraBlocks.actions.remove({ id }));
    message.success('Removed from collection.');
  };

  return (
    <div>
      <EmailEditor
        data={initialValues}
        extraBlocks={extraBlocksList}
        onAddCollection={onAddCollection}
        onRemoveCollection={onRemoveCollection}
        onUploadImage={services.common.uploadByQiniu}
        interactiveStyle={{
          hoverColor: '#3b97e3',
          selectedColor: '#69c0ff',
          dragoverColor: '#13c2c2',
          tangentColor: '#ffec3d',
        }}
      >
        {({ values }) => {
          return (
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
              <EmailEditorLayout height={'calc(100vh - 72px)'} />
              <WarnAboutUnsavedChanges />
            </>
          );
        }}
      </EmailEditor>
      {modal}
    </div>
  );
}

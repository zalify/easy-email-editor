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
import { GithubOutlined } from '@ant-design/icons';

import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  transformToMjml,
} from 'easy-email-editor';
import 'easy-email-editor/lib/style.css';
import { Stack } from '@example/components/Stack';
import { customBlocks } from './components/CustomBlocks';
import { pushEvent } from '@example/util/pushEvent';
import { FormApi } from 'final-form';
import { UserStorage } from '@example/util/user-storage';

const fontList = [
  'Arial',
  'Tahoma',
  'Verdana',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Lato',
  'Montserrat',
  '黑体',
  '仿宋',
  '楷体',
  '标楷体',
  '华文仿宋',
  '华文楷体',
  '宋体',
  '微软雅黑',
].map((item) => ({ value: item, label: item }));

export default function Editor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const extraBlocksData = useAppSelector('extraBlocks');
  const { openModal, modal } = useEmailModal();
  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);

  const isSubmitting = useLoading([
    template.loadings.create,
    template.loadings.updateById,
  ]);

  useEffect(() => {
    if (id) {
      if (!userId) {
        UserStorage.getAccount().then((account) => {
          dispatch(
            template.actions.fetchById({ id: +id, userId: account.user_id })
          );
        });
      } else {
        dispatch(template.actions.fetchById({ id: +id, userId: +userId }));
      }
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

    return () => {
      dispatch(template.actions.set(null));
    };
  }, [dispatch, id, userId]);

  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
    ) => {
      pushEvent({ name: 'Save' });
      if (id) {
        dispatch(
          template.actions.updateById({
            id: +id,
            template: values,
            success() {
              message.success('Updated success!');
              form.restart(values);
            },
          })
        );
      } else {
        dispatch(
          template.actions.create({
            template: values,
            success(id, newTemplate) {
              message.success('Saved success!');
              form.restart(newTemplate);
              history.replace(`/editor?id=${id}`);
            },
          })
        );
      }
    },
    [dispatch, history, id]
  );

  const onExportHtml = (values: IEmailTemplate) => {
    pushEvent({ name: 'ExportHtml' });
    const html = mjml(
      transformToMjml({
        data: values.content,
        mode: 'production',
        context: values.content,
      }),
      {
        beautify: true,
        validationLevel: 'soft',
      }
    ).html;

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
      <EmailEditorProvider
        key={id}
        data={initialValues}
        extraBlocks={extraBlocksList}
        onAddCollection={onAddCollection}
        onRemoveCollection={onRemoveCollection}
        onUploadImage={services.common.uploadByQiniu}
        interactiveStyle={{
          hoverColor: '#1890ff',
          selectedColor: '#1890ff',
          dragoverColor: '#1890ff',
        }}
        fontList={fontList}
        onSubmit={onSubmit}
        autoComplete
        dashed={false}
      >
        {({ values }, { submit }) => {
          return (
            <>
              <PageHeader
                title='Edit'
                onBack={() => history.push('/')}
                extra={
                  <Stack alignment='center'>
                    <Button onClick={() => onExportHtml(values)}>
                      Export html
                    </Button>
                    <Button onClick={() => openModal(values)}>
                      Send test email
                    </Button>
                    <Button
                      loading={isSubmitting}
                      type='primary'
                      onClick={() => submit()}
                    >
                      Save
                    </Button>
                    <a
                      target='_blank'
                      href='https://github.com/m-Ryan/easy-email'
                      style={{
                        color: '#000',
                        fontSize: 28,
                      }}
                      onClick={() => pushEvent({ name: 'Github' })}
                    >
                      <GithubOutlined />
                    </a>
                  </Stack>
                }
              />
              <EmailEditor height={'calc(100vh - 85px)'} />
              <WarnAboutUnsavedChanges />
            </>
          );
        }}
      </EmailEditorProvider>
      {modal}
    </div>
  );
}

/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import { Button, Message, PageHeader } from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { Loading } from '@demo/components/loading';
import mjml from 'mjml-browser';
import { copy } from '@demo/utils/clipboard';
import { useEmailModal } from './components/useEmailModal';
import services from '@demo/services';
import { IconGithub } from '@arco-design/web-react/icon';

import {
  EmailEditor,
  EmailEditorProvider,
  EmailEditorProviderProps,
  IEmailTemplate,
} from 'easy-email-editor';

import { Stack } from '@demo/components/Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { FormApi } from 'final-form';
import { UserStorage } from '@demo/utils/user-storage';

import { useCollection } from './components/useCollection';
import mustache from 'mustache';
import { JsonToMjml } from 'easy-email-core';
import { BlockMarketManager, SimpleLayout } from 'easy-email-extensions';
import { AutoSaveAndRestoreEmail } from '@demo/components/AutoSaveAndRestoreEmail';

// Register external blocks
import './components/CustomBlocks';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

const imageCompression = import('browser-image-compression');

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
  const { addCollection, removeCollection, collectionCategory } =
    useCollection();
  const { openModal, modal } = useEmailModal();
  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);

  const isSubmitting = useLoading([
    template.loadings.create,
    template.loadings.updateById,
  ]);

  useEffect(() => {
    if (collectionCategory) {
      BlockMarketManager.addCategories([collectionCategory]);
      return () => {
        BlockMarketManager.removeCategories([collectionCategory]);
      };
    }
  }, [collectionCategory]);

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

  const mergeTags = useMemo(() => {
    return {
      user: {
        name: 'Ryan',
        avatar:
          'https://assets.maocanhua.cn/bbb041da-62c3-4e6a-9648-60a06738836b-image.png',
      },
      company: {
        name: 'Easy email',
      },
      date: {
        today: () => new Date().toDateString(),
      },
      condition: {
        isHidden: true,
        isNotHidden: false,
      },
    };
  }, []);

  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return services.common.uploadByQiniu(compressionFile);
  };

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
              Message.success('Updated success!');
              form.restart(values);
            },
          })
        );
      } else {
        dispatch(
          template.actions.create({
            template: values,
            success(id, newTemplate) {
              Message.success('Saved success!');
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
      JsonToMjml({
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
    Message.success('Copied to pasteboard!');
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    return {
      ...templateData,
      content: cloneDeep(templateData.content), // because redux object is not extensible
    };
  }, [templateData]);

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] =
    useCallback((data, mergeTags) => {
      return JSON.parse(mustache.render(JSON.stringify(data), mergeTags));
    }, []);

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
      <EmailEditorProvider
        key={id}
        height={'calc(100vh - 85px)'}
        data={initialValues}
        onAddCollection={addCollection}
        onRemoveCollection={({ id }) => removeCollection(id)}
        onUploadImage={onUploadImage}
        interactiveStyle={{
          hoverColor: '#78A349',
          selectedColor: '#1890ff',
        }}
        fontList={fontList}
        onSubmit={onSubmit}
        autoComplete
        dashed={false}
        mergeTags={mergeTags}
        onBeforePreview={onBeforePreview}
      >
        {({ values }, { submit }) => {
          return (
            <>
              <PageHeader
                backIcon
                title='Edit'
                onBack={() => history.push('/')}
                extra={
                  <Stack alignment='center'>
                    <Button onClick={() => onExportHtml(values)}>
                      Export html
                    </Button>
                    <Button onClick={() => openModal(values, mergeTags)}>
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
                      <IconGithub />
                    </a>
                  </Stack>
                }
              />
              <SimpleLayout>
                <EmailEditor />
              </SimpleLayout>
              <AutoSaveAndRestoreEmail />
            </>
          );
        }}
      </EmailEditorProvider>
      {modal}
    </div>
  );
}

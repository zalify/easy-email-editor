/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import {
  ConfigProvider,
} from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { Loading } from '@demo/components/loading';
import { common } from '@demo/services/common';
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
} from 'easy-email-editor';

import { UserStorage } from '@demo/utils/user-storage';

import { IBlockData } from 'easy-email-core';
import { SimpleLayout } from 'easy-email-extensions';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import blueTheme from '@arco-themes/react-easy-email-theme/css/arco.css?inline';

import enUS from '@arco-design/web-react/es/locale/en-US';


export default function Editor() {

  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');;
  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);

  useEffect(() => {
    if (id) {
      if (!userId) {
        UserStorage.getAccount().then(account => {
          dispatch(template.actions.fetchById({ id: +id, userId: account.user_id }));
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

  const onUploadImage = async (blob: Blob) => {
    return common.uploadByQiniu(blob);
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    const sourceData = cloneDeep(templateData.content) as IBlockData;
    return {
      ...templateData,
      content: sourceData, // replace standard block
    };
  }, [templateData]);

  const onSubmit = useCallback(
    async (values: IEmailTemplate) => {
      console.log(values);
    },
    [dispatch, history, id, initialValues],
  );

  if (!templateData && loading) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  if (!initialValues) return null;

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <style>{blueTheme}</style>
        <EmailEditorProvider
          height={'calc(100vh - 68px)'}
          data={initialValues}
          onUploadImage={onUploadImage}
          onSubmit={onSubmit}
          dashed={false}
        >
          {() => {
            return (
              <>
                <SimpleLayout>
                  <EmailEditor />
                </SimpleLayout>
              </>
            );
          }}
        </EmailEditorProvider>
      </div>
    </ConfigProvider>
  );
}

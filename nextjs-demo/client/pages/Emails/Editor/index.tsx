/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdvancedType } from 'easy-email-core';
import {
  EmailEditor,
  EmailEditorProvider,
  EmailEditorProviderProps,
  IEmailTemplate,
  Stack,
} from 'easy-email-editor';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';
import { Button, Message, PageHeader } from '@arco-design/web-react';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

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
].map(item => ({ value: item, label: item }));

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color

import { Config } from 'final-form';
import {
  useGetEmailTemplateQuery,
  useUpdateEmailTemplateMutation,
  useUpload,
} from '@/client/hooks';
import { useRouter } from 'next/router';
import FullScreenLoading from '@/client/components/FullScreenLoading';
import { pushEvent } from '@/client/utils/pushEvent';
import { Liquid } from 'liquidjs';
import { testMergeTags } from './testMergeTags';

import blueTheme from '!!raw-loader!@arco-themes/react-easy-email-theme/css/arco.css';
import { useSession } from 'next-auth/react';
import { CommercialBanner } from '@/client/components/CommercialBanner';
import { useShowCommercialEditor } from '@/client/hooks/useShowCommercialEditor';

const imageCompression = import('browser-image-compression');

const defaultCategories: ExtensionProps['categories'] = [
  {
    label: 'Content',
    active: true,
    blocks: [
      {
        type: AdvancedType.TEXT,
      },
      {
        type: AdvancedType.IMAGE,
        payload: { attributes: { padding: '0px 0px 0px 0px' } },
      },
      {
        type: AdvancedType.BUTTON,
      },
      {
        type: AdvancedType.SOCIAL,
      },
      {
        type: AdvancedType.DIVIDER,
      },
      {
        type: AdvancedType.SPACER,
      },
      {
        type: AdvancedType.HERO,
      },
      {
        type: AdvancedType.WRAPPER,
      },
    ],
  },
  {
    label: 'Layout',
    active: true,
    displayType: 'column',
    blocks: [
      {
        title: '2 columns',
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        title: '3 columns',
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        title: '4 columns',
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
];

export default function App() {
  const { featureEnabled } = useShowCommercialEditor();
  const { upload } = useUpload();

  const session = useSession();
  const user = session.data?.user;

  const router = useRouter();
  const id = router.query.id;

  const { data: template, fetching } = useGetEmailTemplateQuery({
    id: id as string,
  });

  const { fetching: updateLoading, updateEmailTemplateMutation } =
    useUpdateEmailTemplateMutation();

  const onSubmit: Config<IEmailTemplate>['onSubmit'] = async values => {
    try {
      pushEvent({
        event: 'Save-Email',
      });
      await updateEmailTemplateMutation({
        id: template!.id,
        data: {
          subject: values.subject,
          content: values.content,
          thumbnail: template!.thumbnail,
        },
      });
      Message.success('Save succeed');
    } catch (error) {
      Message.error(String(error));
    }
  };

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback(
    (html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    },
    [],
  );

  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return upload(compressionFile);
  };

  if (!template || !user) return <FullScreenLoading isFullScreen />;

  return (
    <>
      <style>{blueTheme}</style>
      <EmailEditorProvider
        data={template}
        height={'calc(100vh - 115px)'}
        autoComplete
        dashed={false}
        onSubmit={onSubmit}
        onUploadImage={onUploadImage}
        fontList={fontList}
        mergeTags={testMergeTags}
        mergeTagGenerate={tag => `{{${tag}}}`}
        onBeforePreview={onBeforePreview}
      >
        {({ values }, { submit, restart }) => {
          return (
            <>
              <PageHeader
                style={{ background: 'var(--color-bg-2)' }}
                backIcon
                title='Edit'
                onBack={() => router.push('/')}
                extra={
                  <Stack alignment='center'>
                    <Button
                      target='_blank'
                      type='primary'
                      status='success'
                      loading={updateLoading}
                      onClick={submit}
                    >
                      <strong>Save</strong>
                    </Button>
                    {featureEnabled && (
                      <Button
                        type='primary'
                        target='_blank'
                        href='https://demo.easyemail.pro?utm_source=easyemail'
                      >
                        Try commercial version
                      </Button>
                    )}
                  </Stack>
                }
              />
              <CommercialBanner page='EDITOR' />
              <StandardLayout
                showSourceCode={true}
                categories={defaultCategories}
              >
                <EmailEditor />
              </StandardLayout>
            </>
          );
        }}
      </EmailEditorProvider>
    </>
  );
}

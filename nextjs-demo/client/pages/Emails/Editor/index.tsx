/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AdvancedType } from 'easy-email-core';
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  Stack,
} from 'easy-email-editor';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';
import { Button, Message, PageHeader } from '@arco-design/web-react';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

import { Config } from 'final-form';
import {
  useGetEmailTemplateQuery,
  useUpdateEmailTemplateMutation,
  useUpload,
} from '@/client/hooks';
import { useRouter } from 'next/router';
import FullScreenLoading from '@/client/components/FullScreenLoading';
import { pushEvent } from '@/client/utils/pushEvent';

import blueTheme from '!!raw-loader!@arco-themes/react-easy-email-theme/css/arco.css';
import { useSession } from 'next-auth/react';
import { CommercialBanner } from '@/client/components/CommercialBanner';
import { useShowCommercialEditor } from '@/client/hooks/useShowCommercialEditor';
import { useWindowSize } from 'react-use';

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

  const onUploadImage = async (blob: Blob) => {
    return upload(blob);
  };
  const { width } = useWindowSize();
  const compact = width > 1400;
  if (!template || !user) return <FullScreenLoading isFullScreen />;

  return (
    <>
      <style>{blueTheme}</style>
      <EmailEditorProvider
        data={template}
        height={'calc(100vh - 115px)'}
        dashed={false}
        onSubmit={onSubmit}
        onUploadImage={onUploadImage}
      >
        {({}, { submit }) => {
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
                showSourceCode={false}
                categories={defaultCategories}
                compact={compact}
                showBlockLayer={false}
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

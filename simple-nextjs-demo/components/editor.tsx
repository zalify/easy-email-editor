import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Menu,
  Message,
  PageHeader,
  Select,
} from '@arco-design/web-react';
import mjml from 'mjml-browser';
import { saveAs } from 'file-saver';
import {
  BlockAvatarWrapper,
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  Stack,
} from 'easy-email-editor';

import { AdvancedType, IBlockData, JsonToMjml } from 'easy-email-core';
import { ExtensionProps, StandardLayout } from 'easy-email-extensions';

import '@arco-themes/react-easy-email-theme/css/arco.css';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

import enUS from '@arco-design/web-react/es/locale/en-US';
import { useRouter, useSearchParams } from 'next/navigation';

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
      {
        type: AdvancedType.TABLE,
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

export default function Editor() {
  const [template, setTemplate] = useState<IEmailTemplate | null>(null);
  const [loading, setLoading] = useState(false);

  const id = useSearchParams().get('id');
  const router = useRouter();
  const onUploadImage = async (blob: Blob) => {
    return Promise.resolve(URL.createObjectURL(blob));
  };

  useEffect(() => {
    console.log('id', id);
    setLoading(true);
    import(`../data/template${id}.json`)
      .then(data => {
        const template = data.content;

        setTemplate({
          content: template,
          subject: 'New Template',
          subTitle: 'New Template',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const onExportMJML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
    });

    navigator.clipboard.writeText(mjmlString);
    saveAs(new Blob([mjmlString], { type: 'text/mjml' }), 'easy-email.mjml');
  };

  const onExportHTML = (values: IEmailTemplate) => {
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
    });

    const html = mjml(mjmlString, {}).html;

    navigator.clipboard.writeText(html);
    saveAs(new Blob([html], { type: 'text/html' }), 'easy-email.html');
  };

  const onExportJSON = (values: IEmailTemplate) => {
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' }),
      'easy-email.json',
    );
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!template) return null;
    return template;
  }, [template]);

  const onSubmit = useCallback(
    async (values: IEmailTemplate) => {
      console.log(values);
    },
    [initialValues],
  );

  if (!initialValues) return null;

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <EmailEditorProvider
          height={'calc(100vh - 68px)'}
          data={initialValues}
          onUploadImage={onUploadImage}
          onSubmit={onSubmit}
          dashed={false}
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
                      <Dropdown
                        droplist={
                          <Menu>
                            <Menu.Item
                              key='Export MJML'
                              onClick={() => onExportMJML(values)}
                            >
                              Export MJML
                            </Menu.Item>
                            <Menu.Item
                              key='Export HTML'
                              onClick={() => onExportHTML(values)}
                            >
                              Export HTML
                            </Menu.Item>
                            <Menu.Item
                              key='Export JSON'
                              onClick={() => onExportJSON(values)}
                            >
                              Export JSON
                            </Menu.Item>
                          </Menu>
                        }
                      >
                        <Button>
                          <strong>Export</strong>
                        </Button>
                      </Dropdown>
                      <Button
                        type='primary'
                        target='_blank'
                        href='https://demo.easyemail.pro?utm_source=easyemail'
                      >
                        Try commercial version
                      </Button>
                    </Stack>
                  }
                />

                <StandardLayout
                  categories={defaultCategories}
                  showSourceCode={true}
                  mjmlReadOnly={false}
                  showBlockLayer={false}
                >
                  <EmailEditor />
                </StandardLayout>
              </>
            );
          }}
        </EmailEditorProvider>
      </div>
    </ConfigProvider>
  );
}

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
import { IconLeft } from '@arco-design/web-react/icon';
import mjml from 'mjml-browser';
import { saveAs } from 'file-saver';
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  Stack,
} from 'easy-email-editor';

import { JsonToMjml } from 'easy-email-core';
import { SimpleLayout } from 'easy-email-extensions';

import '@arco-themes/react-easy-email-theme/css/arco.css';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

import enUS from '@arco-design/web-react/es/locale/en-US';
import { useRouter, useSearchParams } from 'next/navigation';

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
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    padding: '12px 24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  backIcon={
                    <IconLeft
                      style={{
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    />
                  }
                  title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>Edit</span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          fontSize: '13px',
                          opacity: 0.95,
                          flexWrap: 'nowrap',
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap', color: '#fff' }}>
                          🚀 Try Easy Email Pro
                        </span>
                        <span style={{ whiteSpace: 'nowrap', color: '#fff' }}>
                          ✅ Cross-browser support
                        </span>
                        <span style={{ whiteSpace: 'nowrap', color: '#fff' }}>
                          ✅ React 19 support
                        </span>
                        <span style={{ whiteSpace: 'nowrap', color: '#fff' }}>
                          ✅ Desktop & Mobile Email Preview
                        </span>
                        <span style={{ whiteSpace: 'nowrap', color: '#fff' }}>
                          ✅ More advanced features
                        </span>
                      </div>
                    </div>
                  }
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
                        <Button
                          style={{
                            background: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            border: 'none',
                          }}
                        >
                          <strong>Export</strong>
                        </Button>
                      </Dropdown>
                      <Button
                        type='primary'
                        target='_blank'
                        href='https://demo.easyemail.pro?utm_source=easyemail'
                        style={{
                          background: '#fff',
                          color: '#667eea',
                          border: 'none',
                          fontWeight: 'bold',
                        }}
                      >
                        Try Pro Version
                      </Button>
                    </Stack>
                  }
                />

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

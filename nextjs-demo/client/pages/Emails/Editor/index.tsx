/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BlockManager, BasicType, AdvancedType, JsonToMjml } from 'easy-email-core';
import {
  EmailEditor,
  EmailEditorProvider,
  IEmailTemplate,
  Stack,
} from 'easy-email-editor';
import { ExtensionProps, MjmlToJson, StandardLayout } from 'easy-email-extensions';
import { useWindowSize } from 'react-use';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Form,
  Input,
  Menu,
  Message,
  Modal,
  PageHeader,
  Select,
  Space,
  Spin,
} from '@arco-design/web-react';
import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';

// theme, If you need to change the theme, you can make a duplicate in https://arco.design/themes/design/1799/setting/base/Color

import { Config } from 'final-form';
import mjml from 'mjml-browser';
import { useGetEmailTemplateQuery, useUpdateEmailTemplateMutation } from '@/client/hooks';
import { useRouter } from 'next/router';
import FullScreenLoading from '@/client/components/FullScreenLoading';
import { pushEvent } from '@/client/utils/pushEvent';
import { Liquid } from 'liquidjs';
import { saveAs } from 'file-saver';
import { useMergeTagsModal } from '@/client/hooks/useMergeTagsModal';
import { testMergeTags } from './testMergeTags';
import { IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { Uploader } from '@/client/utils/Uploader';

import blueTheme from '!!raw-loader!@arco-themes/react-easy-email-theme/css/arco.css';
import purpleTheme from '!!raw-loader!@arco-themes/react-easy-email-theme-purple/css/arco.css';
import greenTheme from '!!raw-loader!@arco-themes/react-easy-email-theme-green/css/arco.css';
import { useSession } from 'next-auth/react';
import { CommercialBanner } from '@/client/components/CommercialBanner';

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
  const { width } = useWindowSize();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const [locale, setLocale] = useState('en');
  const {
    modal: mergeTagsModal,
    openModal: openMergeTagsModal,
    mergeTags,
    setMergeTags,
  } = useMergeTagsModal(testMergeTags);

  const session = useSession();
  const user = session.data?.user;

  const smallScene = width < 1400;
  const router = useRouter();
  const id = router.query.id;

  const { data: template, fetching } = useGetEmailTemplateQuery({
    id: id as string,
  });

  const { fetching: updateLoading, updateEmailTemplateMutation } =
    useUpdateEmailTemplateMutation();

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [isDarkMode]);

  const themeStyleText = useMemo(() => {
    if (theme === 'green') return greenTheme;
    if (theme === 'purple') return purpleTheme;
    return blueTheme;
  }, [theme]);

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

  const onExportImage = async (values: IEmailTemplate) => {
    Message.loading('Loading...');
    const html2canvas = (await import('html2canvas')).default;
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    const html = mjml(mjmlString, {}).html;

    container.innerHTML = html;
    document.body.appendChild(container);

    const blob = await new Promise<any>(resolve => {
      html2canvas(container, { useCORS: true }).then(canvas => {
        return canvas.toBlob(resolve, 'png', 0.1);
      });
    });
    saveAs(blob, 'demo.png');
    Message.clear();
  };

  const onChangeTheme = useCallback(t => {
    setTheme(t);
  }, []);

  const onExportMJML = (values: IEmailTemplate) => {
    pushEvent({
      event: 'ExportMJM',
    });
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    pushEvent({ event: 'MJMLExport', payload: { values, mergeTags } });
    navigator.clipboard.writeText(mjmlString);
    saveAs(new Blob([mjmlString], { type: 'text/mjml' }), 'easy-email.mjml');
  };

  const onExportHTML = (values: IEmailTemplate) => {
    pushEvent({
      event: 'ExportHTML',
    });
    const mjmlString = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    const html = mjml(mjmlString, {}).html;

    pushEvent({ event: 'HTMLExport', payload: { values, mergeTags } });
    navigator.clipboard.writeText(html);
    saveAs(new Blob([html], { type: 'text/html' }), 'easy-email.html');
  };

  const onExportJSON = (values: IEmailTemplate) => {
    pushEvent({
      event: 'ExportJSON',
    });
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' }),
      'easy-email.json',
    );
  };

  const onImportMJML = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
    pushEvent({
      event: 'ImportMJM',
    });
    const uploader = new Uploader(() => Promise.resolve(''), {
      accept: 'text/mjml',
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const pageData = await new Promise<[string, IEmailTemplate['content']]>(
      (resolve, reject) => {
        reader.onload = function (evt) {
          if (!evt.target) {
            reject();
            return;
          }
          try {
            const pageData = MjmlToJson(evt.target.result as any);
            resolve([file.name, pageData]);
          } catch (error) {
            reject();
          }
        };
        reader.readAsText(file);
      },
    );

    restart({
      subject: pageData[0],
      content: pageData[1],
      subTitle: '',
    });
  };

  const onImportJSON = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
    pushEvent({
      event: 'ImportJSON',
    });
    const uploader = new Uploader(() => Promise.resolve(''), {
      accept: 'application/json',
      limit: 1,
    });

    const [file] = await uploader.chooseFile();
    const reader = new FileReader();
    const emailTemplate = await new Promise<IEmailTemplate>((resolve, reject) => {
      reader.onload = function (evt) {
        if (!evt.target) {
          reject();
          return;
        }
        try {
          const template = JSON.parse(evt.target.result as any) as IEmailTemplate;
          resolve(template);
        } catch (error) {
          reject();
        }
      };
      reader.readAsText(file);
    });

    restart({
      subject: emailTemplate.subject,
      content: emailTemplate.content,
      subTitle: emailTemplate.subTitle,
    });
  };

  if (!template || !user) return <FullScreenLoading isFullScreen />;

  return (
    <>
      <style>{themeStyleText}</style>
      <EmailEditorProvider
        data={template}
        height={'calc(100vh - 115px)'}
        autoComplete
        dashed={false}
        onSubmit={onSubmit}
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
                    {/* <Button
                    onClick={() => setIsDarkMode(v => !v)}
                    shape='circle'
                    type='text'
                    icon={isDarkMode ? <IconMoonFill /> : <IconSunFill />}
                  ></Button> */}

                    <Select
                      onChange={onChangeTheme}
                      value={theme}
                    >
                      <Select.Option value='blue'>Theme: Blue</Select.Option>
                      <Select.Option value='green'>Theme: Green</Select.Option>
                      <Select.Option value='purple'>Theme: Purple</Select.Option>
                    </Select>
                    <Select
                      onChange={setLocale}
                      value={locale}
                    >
                      <Select.Option value='en'>English</Select.Option>
                      <Select.Option value='zh-Hans'>中文简体</Select.Option>
                      <Select.Option value='zh-Hant'>中文繁體</Select.Option>
                      <Select.Option value='ja'>Japanese</Select.Option>
                      <Select.Option value='it'>Italian</Select.Option>
                    </Select>

                    {/* <Button onClick={openMergeTagsModal}>Update mergeTags</Button> */}

                    <Dropdown
                      droplist={
                        <Menu>
                          <Menu.Item
                            key='MJML'
                            onClick={() => onImportMJML({ restart })}
                          >
                            Import from MJML
                          </Menu.Item>

                          <Menu.Item
                            key='JSON'
                            onClick={() => onImportJSON({ restart })}
                          >
                            Import from JSON
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        <strong>Import</strong>
                      </Button>
                    </Dropdown>

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
                          <Menu.Item
                            key='Export Image'
                            onClick={() => onExportImage(values)}
                          >
                            Export Image
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <Button>
                        <strong>Export</strong>
                      </Button>
                    </Dropdown>
                    <Button
                      target='_blank'
                      onClick={ev => {
                        ev.preventDefault();
                        pushEvent({
                          event: 'CheckCommercialEditor',
                          payload: {
                            user: user.email!,
                          },
                        });
                        window.open('https://github.com/m-Ryan', '_blank');
                      }}
                    >
                      <strong>Commercial Editor</strong>
                    </Button>
                    <Button
                      target='_blank'
                      type='primary'
                      loading={updateLoading}
                      onClick={submit}
                    >
                      <strong>Save</strong>
                    </Button>
                    <a
                      href='https://www.buymeacoffee.com/easyemail?utm_source=webside&utm_medium=button&utm_content=donate'
                      target='_blank'
                      onClick={ev => {
                        ev.preventDefault();
                        pushEvent({
                          event: 'Donate',
                          payload: {
                            user: user.email!,
                          },
                        });
                        window.open(
                          'https://www.buymeacoffee.com/easyemail?utm_source=webside&utm_medium=button&utm_content=donate',
                          '_blank',
                        );
                      }}
                    >
                      <img
                        style={{
                          marginTop: -16,
                          position: 'relative',
                          top: 11,
                          height: 32,
                        }}
                        src='https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png'
                        alt='Buy Me A Coffee'
                      />
                    </a>
                  </Stack>
                }
              />
              <CommercialBanner page='EDITOR' />
              <StandardLayout
                compact={!smallScene}
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

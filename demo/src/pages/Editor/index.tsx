/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import {
  Button,
  ConfigProvider,
  Form,
  Input,
  Message,
  Modal,
  PageHeader,
} from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep, set, isEqual } from 'lodash';
import { Loading } from '@demo/components/loading';
import mjml from 'mjml-browser';
import services from '@demo/services';
import { Liquid } from 'liquidjs';
import { saveAs } from 'file-saver';
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
import { AdvancedType, BasicType, IBlockData, JsonToMjml } from 'easy-email-core';
import {
  BlockMarketManager,
  ExtensionProps,
  MjmlToJson,
  StandardLayout,
} from 'easy-email-extensions';
import { AutoSaveAndRestoreEmail } from '@demo/components/AutoSaveAndRestoreEmail';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import { testMergeTags } from './testMergeTags';
import { useMergeTagsModal } from './components/useMergeTagsModal';

import { useWindowSize } from 'react-use';
import { Uploader } from '@demo/utils/Uploader';
import axios from 'axios';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { IconSave } from '@arco-design/web-react/icon';
import { useEmailModal } from './components/useEmailModal';

const imageCompression = import('browser-image-compression');

export default function Editor() {
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
          type: 'TopBar1',
          json: {
            tag: 'mj-hero',
            name: 'Top Bar I',
            type: 'TopBar1',
            defaultData: {
              type: 'TopBar1',
              data: {
                value: 'DHFHB HDHD hHDD'
              },
              attributes: {
                'background-color': '#ffffff',
                'background-position': 'center center',
                mode: 'fluid-height',
                padding: '100px 0px 100px 0px',
                'vertical-align': 'top',
                'background-url': 'https://easy-email-m-ryan.vercel.app/images/dd1584fb-cb60-42c9-80c7-5545e16130ca-226ba72b-ce9e-4948-ad0d-347381fb96c5.png',
              },
              children: [
                {
                  type: 'text',
                  data: {
                    value: {
                      content: 'We Serve Healthy &amp; Delicious Foods',
                    },
                  },
                  attributes: {
                    padding: '10px 25px 10px 25px',
                    align: 'center',
                    color: '#ffffff',
                    'font-size': '45px',
                    'line-height': '45px',
                  },
                  children: [],
                },
                {
                  type: 'text',
                  data: {
                    value: {
                      content:
                        'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.<br>',
                    },
                  },
                  attributes: {
                    align: 'center',
                    'background-color': '#414141',
                    color: '#ffffff',
                    'font-weight': 'normal',
                    'border-radius': '3px',
                    padding: '10px 25px 10px 25px',
                    'inner-padding': '10px 25px 10px 25px',
                    'line-height': '1.5',
                    target: '_blank',
                    'vertical-align': 'middle',
                    border: 'none',
                    'text-align': 'center',
                    href: '#',
                    'font-size': '14px',
                  },
                  children: [],
                },
                {
                  type: 'button',
                  data: {
                    value: {
                      content: 'Get Your Order Here!',
                    },
                  },
                  attributes: {
                    align: 'center',
                    'background-color': '#f3a333',
                    color: '#ffffff',
                    'font-size': '13px',
                    'font-weight': 'normal',
                    'border-radius': '30px',
                    padding: '10px 25px 10px 25px',
                    'inner-padding': '10px 25px 10px 25px',
                    'line-height': '120%',
                    target: '_blank',
                    'vertical-align': 'middle',
                    border: 'none',
                    'text-align': 'center',
                    href: '#',
                  },
                  children: [],
                },
              ],
            },
            validParentType: [BasicType.PAGE],
          },
        }
      ],
    }
  ];
  const [defaultCategoriesState, setDefaultCategoriesState] = useState(defaultCategories);
  const changeCategories = (category: string) => {
    const newBlock: ExtensionProps['categories'] = [
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
          }
        ]
      }
    ];
    setDefaultCategoriesState(newBlock);
  };

  // const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  // const [locale, setLocale] = useState('en');
  const { addCollection, removeCollection, collectionCategory } = useCollection();
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const { width } = useWindowSize();

  const emailPattern =
    // eslint-disable-next-line
    /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;

  const postEmail = async () => {
    if (!emailPattern.test(text)) {
      Message.error('Please enter a valid email address');
      return;
    }
    pushEvent({
      event: 'TryNewEditor',
      payload: { email: text },
    });
    await axios.post(`/api/email`, {
      email: text,
    });
    setVisible(false);
  };

  const smallScene = width < 1400;

  const { openModal, modal } = useEmailModal();
  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const {
    modal: mergeTagsModal,
    openModal: openMergeTagsModal,
    mergeTags,
    setMergeTags,
  } = useMergeTagsModal(testMergeTags);

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
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return services.common.uploadByQiniu(compressionFile);
  };

  const onChangeMergeTag = useCallback((path: string, val: any) => {
    setMergeTags(old => {
      const newObj = cloneDeep(old);
      set(newObj, path, val);
      return newObj;
    });
  }, []);

  const onImportMJML = async ({
    restart,
  }: {
    restart: (val: IEmailTemplate) => void;
  }) => {
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

  const onExportMJML = (values: IEmailTemplate) => {
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
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    saveAs(
      new Blob([JSON.stringify(values, null, 2)], { type: 'application/json' }),
      'easy-email.json',
    );
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

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    const sourceData = cloneDeep(templateData.content) as IBlockData;
    return {
      ...templateData,
      content: sourceData, // replace standard block
    };
  }, [templateData]);

  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>,
    ) => {
      pushEvent({ event: 'EmailSave' });
      if (id) {
        const isChanged = !(
          isEqual(initialValues?.content, values.content) &&
          isEqual(initialValues?.subTitle, values?.subTitle) &&
          isEqual(initialValues?.subject, values?.subject)
        );

        if (!isChanged) {
          Message.success('Updated success!');
          form.restart(values);
          return;
        }
        dispatch(
          template.actions.updateById({
            id: +id,
            template: values,
            success() {
              Message.success('Updated success!');
              form.restart(values);
            },
          }),
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
          }),
        );
      }
    },
    [dispatch, history, id, initialValues],
  );

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] = useCallback(
    (html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    },
    [],
  );

  // const themeStyleText = useMemo(() => {
  //   if (theme === 'green') return greenTheme;
  //   if (theme === 'purple') return purpleTheme;
  //   return blueTheme;
  // }, [theme]);

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
        {/* <style>{themeStyleText}</style> */}
        <EmailEditorProvider
          key={id}
          height={'calc(100vh - 68px)'}
          data={initialValues}
          // interactiveStyle={{
          //   hoverColor: '#78A349',
          //   selectedColor: '#1890ff',
          // }}
          // onAddCollection={addCollection}
          // onRemoveCollection={({ id }) => removeCollection(id)}
          onUploadImage={onUploadImage}
          onSubmit={onSubmit}
          onChangeMergeTag={onChangeMergeTag}
          autoComplete
          enabledLogic
          // enabledMergeTagsBadge
          dashed={false}
          mergeTags={mergeTags}
          mergeTagGenerate={tag => `{{${tag}}}`}
          onBeforePreview={onBeforePreview}
          socialIcons={[]}
        // locale={localesData[locale]}
        >
          {({ values }, { submit, restart }) => {
            return (
              <>
                <PageHeader
                  style={{ background: 'var(--color-bg-2)' }}
                  backIcon
                  title='Back'
                  onBack={() => history.push('/')}
                  extra={
                    <Stack alignment='center'>
                      <Button
                        type='outline'
                        onClick={() => changeCategories()}
                        icon={<IconSave />
                        }
                      ></Button>
                    </Stack>
                  }
                />
                <StandardLayout
                  compact={!smallScene}
                  categories={defaultCategoriesState}
                  changeCategories={changeCategories}
                >
                  <EmailEditor />
                </StandardLayout>
                <AutoSaveAndRestoreEmail />
              </>
            );
          }}
        </EmailEditorProvider>
        {modal}
        {mergeTagsModal}
        <Modal
          title={<p style={{ textAlign: 'left' }}>Leave your email</p>}
          visible={visible}
          onCancel={() => setVisible(false)}
          onOk={postEmail}
        >
          <Form.Item label='Email'>
            <Input
              value={text}
              onChange={setText}
            />
          </Form.Item>
        </Modal>
        <style>{`#bmc-wbtn {display:none !important;}`}</style>
      </div>
    </ConfigProvider>
  );
}

function replaceStandardBlockToAdvancedBlock(blockData: IBlockData) {
  const map = {
    [BasicType.TEXT]: AdvancedType.TEXT,
    [BasicType.BUTTON]: AdvancedType.BUTTON,
    [BasicType.IMAGE]: AdvancedType.IMAGE,
    [BasicType.DIVIDER]: AdvancedType.DIVIDER,
    [BasicType.SPACER]: AdvancedType.SPACER,
    [BasicType.SOCIAL]: AdvancedType.SOCIAL,
    [BasicType.ACCORDION]: AdvancedType.ACCORDION,
    [BasicType.CAROUSEL]: AdvancedType.CAROUSEL,
    [BasicType.NAVBAR]: AdvancedType.NAVBAR,
    [BasicType.WRAPPER]: AdvancedType.WRAPPER,
    [BasicType.SECTION]: AdvancedType.SECTION,
    [BasicType.GROUP]: AdvancedType.GROUP,
    [BasicType.COLUMN]: AdvancedType.COLUMN,
  };

  if (map[blockData.type]) {
    blockData.type = map[blockData.type];
  }
  blockData.children.forEach(replaceStandardBlockToAdvancedBlock);
  return blockData;
}

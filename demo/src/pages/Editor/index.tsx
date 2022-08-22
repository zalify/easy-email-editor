/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import { Button, Message, PageHeader, Select } from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep, set, isEqual } from 'lodash';
import { Loading } from '@demo/components/loading';
import mjml from 'mjml-browser';
import { copy } from '@demo/utils/clipboard';
import { useEmailModal } from './components/useEmailModal';
import services from '@demo/services';
import { IconGithub, IconMoonFill, IconSunFill } from '@arco-design/web-react/icon';
import { Liquid } from 'liquidjs';
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
import {
  AdvancedType,
  BasicType,
  getPageIdx,
  IBlockData,
  JsonToMjml,
} from 'easy-email-core';
import { BlockMarketManager, StandardLayout } from 'easy-email-extensions';
import { AutoSaveAndRestoreEmail } from '@demo/components/AutoSaveAndRestoreEmail';

// Register external blocks
import './components/CustomBlocks';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import blueTheme from '@arco-themes/react-easy-email-theme/css/arco.css?inline';
import purpleTheme from '@arco-themes/react-easy-email-theme-purple/css/arco.css?inline';
import greenTheme from '@arco-themes/react-easy-email-theme-green/css/arco.css?inline';
import { useState } from 'react';
import { testMergeTags } from './testMergeTags';
import { useMergeTagsModal } from './components/useMergeTagsModal';

import { useWindowSize } from 'react-use';

const socialIcons = [
  {
    content: 'facebook',
    image:
      'https://assets.maocanhua.cn/ea599da9-c42d-4d15-b06d-f6bea01d897f-5282541_fb_socialmedia_facebook_facebooklogo_socialnetwork_icon.png',
  },
  {
    content: 'linkedin',
    image:
      'https://assets.maocanhua.cn/afeab92b-16bb-4cdc-815b-544409e9a0fa-5282542_linkedin_network_socialnetwork_linkedinlogo_icon(1).png',
  },
  {
    content: 'instagram',
    image:
      'https://assets.maocanhua.cn/d202cfbe-cb0a-4d58-85c4-938c8b304439-5282544_camera_instagram_socialmedia_socialnetwork_instagramlogo_icon.png',
  },
  {
    content: 'pinterest',
    image:
      'https://assets.maocanhua.cn/bcb27543-662d-4a6c-b91d-9b3fce82a82a-5282545_pin_pinterest_inspiration_pinterestlogo_icon.png',
  },
  {
    content: 'youtube',
    image:
      'https://assets.maocanhua.cn/c628f0db-7efd-4c10-a426-a633954008ad-5282548_play_player_video_youtube_youtublelogo_icon.png',
  },
  {
    content: 'twitter',
    image:
      'https://assets.maocanhua.cn/9d594e46-a9b0-483a-8d3d-af3e748904b2-5282551_tweet_twitter_twitterlogo_icon.png',
  },
  {
    content: 'tiktok',
    image: 'https://assets.maocanhua.cn/df888c4d-aa94-4649-a806-73a758b366cc-tiktok.png',
  },
  {
    content: 'tumblr',
    image:
      'https://assets.maocanhua.cn/06072412-c14d-483e-9ccd-01706a108053-5282552_tumblr_tumblrlogo_icon.png',
  },

  // colorful
  {
    content: 'facebook',
    image:
      'https://assets.maocanhua.cn/a080b611-ef54-4517-a7f4-62a9de8c8c4f-5365678_fb_facebook_facebooklogo_icon.png',
  },
  {
    content: 'linkedin',
    image:
      'https://assets.maocanhua.cn/e616cd72-ce70-413c-a185-e2b5ae2b64f4-5296501_linkedin_network_linkedinlogo_icon.png',
  },
  {
    content: 'instagram',
    image:
      'https://assets.maocanhua.cn/e0f0e4b4-8aef-4c49-a9e4-dbfe8e0cb4d6-instagram.png',
  },
  {
    content: 'pinterest',
    image:
      'https://assets.maocanhua.cn/4c53ff96-ad2f-4cdc-9e63-0f8b0ba52f10-5296503_inspiration_pin_pinned_pinterest_socialnetwork_icon.png',
  },
  {
    content: 'youtube',
    image:
      'https://assets.maocanhua.cn/9b25a927-763c-43e2-8557-63f7225ad11a-5296521_play_video_vlog_youtube_youtubelogo_icon.png',
  },
  {
    content: 'twitter',
    image:
      'https://assets.maocanhua.cn/07ae33c6-3feb-4424-a378-39031d2b63d4-5296516_tweet_twitter_twitterlogo_icon.png',
  },
  {
    content: 'tiktok',
    image:
      'https://assets.maocanhua.cn/59102950-e1dc-41a4-b1c5-c0890f064673-7024783_tiktok_socialmedia_icon.png',
  },
  {
    content: 'tumblr',
    image:
      'https://assets.maocanhua.cn/fcbc85b0-ccbf-4f5f-a9d7-067f16691a56-5296511_network_socialnetwork_tumblr_tumblrlogo_icon.png',
  },
];

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
].map(item => ({ value: item, label: item }));

export default function Editor() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const { addCollection, removeCollection, collectionCategory } = useCollection();

  const { width } = useWindowSize();

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

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [isDarkMode]);

  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return services.common.uploadByQiniu(compressionFile);
  };

  const onChangeTheme = useCallback(t => {
    setTheme(t);
  }, []);

  const onChangeMergeTag = useCallback((path: string, val: any) => {
    setMergeTags(old => {
      const newObj = cloneDeep(old);
      set(newObj, path, val);
      return newObj;
    });
  }, []);

  const onExportHtml = (values: IEmailTemplate) => {
    pushEvent({ event: 'HtmlExport' });
    const html = mjml(
      JsonToMjml({
        data: values.content,
        mode: 'production',
        context: values.content,
        dataSource: mergeTags,
      }),
      {
        beautify: true,
        validationLevel: 'soft',
      },
    ).html;

    copy(html);
    Message.success('Copied to pasteboard!');
  };

  const onExportMJML = (values: IEmailTemplate) => {
    const html = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    copy(html);
    pushEvent({ event: 'MJMLExport', payload: { values, mergeTags } });
    Message.success('Copied to pasteboard!');
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

  const themeStyleText = useMemo(() => {
    if (theme === 'green') return greenTheme;
    if (theme === 'purple') return purpleTheme;
    return blueTheme;
  }, [theme]);

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
      <style>{themeStyleText}</style>
      <EmailEditorProvider
        key={id}
        height={'calc(100vh - 65px)'}
        data={initialValues}
        // interactiveStyle={{
        //   hoverColor: '#78A349',
        //   selectedColor: '#1890ff',
        // }}
        // onAddCollection={addCollection}
        // onRemoveCollection={({ id }) => removeCollection(id)}
        onUploadImage={onUploadImage}
        fontList={fontList}
        onSubmit={onSubmit}
        onChangeMergeTag={onChangeMergeTag}
        autoComplete
        enabledLogic
        // enabledMergeTagsBadge
        dashed={false}
        mergeTags={mergeTags}
        mergeTagGenerate={tag => `{{${tag}}}`}
        onBeforePreview={onBeforePreview}
        socialIcons={socialIcons}
      >
        {({ values }, { submit }) => {
          return (
            <>
              <PageHeader
                style={{ background: 'var(--color-bg-2)' }}
                backIcon
                title='Edit'
                onBack={() => history.push('/')}
                extra={
                  <Stack alignment='center'>
                    <Button
                      onClick={() => setIsDarkMode(v => !v)}
                      shape='circle'
                      type='text'
                      icon={isDarkMode ? <IconMoonFill /> : <IconSunFill />}
                    ></Button>

                    <Select
                      onChange={onChangeTheme}
                      value={theme}
                    >
                      <Select.Option value='blue'>Blue</Select.Option>
                      <Select.Option value='green'>Green</Select.Option>
                      <Select.Option value='purple'>Purple</Select.Option>
                    </Select>

                    <Button onClick={openMergeTagsModal}>Update mergeTags</Button>

                    <Button onClick={() => onExportMJML(values)}>Export MJML</Button>

                    <Button onClick={() => onExportHtml(values)}>Export html</Button>

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
                        width: 33,
                        height: 33,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '50%',
                      }}
                      onClick={() => pushEvent({ event: 'Github' })}
                    >
                      <IconGithub />
                    </a>
                  </Stack>
                }
              />
              <StandardLayout compact={!smallScene}>
                <EmailEditor />
              </StandardLayout>
              <AutoSaveAndRestoreEmail />
            </>
          );
        }}
      </EmailEditorProvider>
      {modal}
      {mergeTagsModal}
    </div>
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

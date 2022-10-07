import { Card, ConfigProvider, Layout, Message, Tabs } from '@arco-design/web-react';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import React, { useEffect, useMemo } from 'react';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { MergeTagBadgePrompt } from '@extensions/MergeTagBadgePrompt';
import { EditPanel } from '../EditPanel';
import { ConfigurationPanel } from '@extensions/ConfigurationPanel';
import {
  ExtensionProps,
  ExtensionProvider,
} from '@extensions/components/Providers/ExtensionProvider';
import { AdvancedType } from 'easy-email-core';
import { enTranslations } from '@extensions/Translations';
import { useTranslation } from '@extensions/hooks/useTranslation';
import { enCoreTranslations } from 'easy-email-core';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';

export const StandardLayout: React.FC<ExtensionProps> = props => {
  const { height: containerHeight } = useEditorProps();
  const { t } = useTranslation();
  const defaultCategories: ExtensionProps['categories'] = useMemo(() => {
    return [
      {
        label: t('standardLayout.content'),
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
        label: t('standardLayout.layout'),
        active: true,
        displayType: 'column',
        blocks: [
          {
            title: t('standardLayout.columns2'),
            payload: [
              ['50%', '50%'],
              ['33%', '67%'],
              ['67%', '33%'],
              ['25%', '75%'],
              ['75%', '25%'],
            ],
          },
          {
            title:  t('standardLayout.columns3'),
            payload: [
              ['33.33%', '33.33%', '33.33%'],
              ['25%', '25%', '50%'],
              ['50%', '25%', '25%'],
            ],
          },
          {
            title:  t('standardLayout.columns4'),
            payload: [[['25%', '25%', '25%', '25%']]],
          },
        ],
      },
    ];
  }, [t]);

  const { showSourceCode = true, compact = true, categories = defaultCategories } = props;
  const { setFocusIdx } = useFocusIdx();

  useEffect(() => {
    if (!compact) {
      setFocusIdx('');
    }
  }, [compact, setFocusIdx]);

  const translations = useMemo(() => {
    const defaultTranslations = {
      core: enCoreTranslations,
      ...enTranslations,
    };

    if (props.translations) {
      return merge(cloneDeep(defaultTranslations), props.translations);
    }

    return defaultTranslations;
  }, [props.translations])

  return (
    <ExtensionProvider
      {...props}
      categories={categories}
      translations={translations}
    >

      <ConfigProvider locale={enUS}>
        <Card
          style={{ padding: 0 }}
          bodyStyle={{
            padding: 0,
            height: containerHeight,
            overflow: 'hidden',
          }}
        >
          <Layout
            className={styles.StandardLayout}
            style={{
              display: 'flex',
              width: '100vw',
              overflow: 'hidden',
            }}
          >
            {compact && <EditPanel />}
            <Layout style={{ height: containerHeight, flex: 1 }}>{props.children}</Layout>
            {!compact && <EditPanel />}
            {compact ? (
              <Layout.Sider
                style={{
                  height: containerHeight,
                  minWidth: 300,
                  maxWidth: 350,
                  width: 350,
                }}
              >
                <ConfigurationPanel
                  compact={compact}
                  height={containerHeight}
                  showSourceCode={showSourceCode}
                />
              </Layout.Sider>
            ) : (
              <Layout.Sider style={{ width: 0, overflow: 'hidden' }} />
            )}
          </Layout>
        </Card>
        <InteractivePrompt />
        <MergeTagBadgePrompt />
      </ConfigProvider>
    </ExtensionProvider>
  );
};

import { Card, ConfigProvider, Layout } from '@arco-design/web-react';
import { useEditorProps, useFocusIdx } from 'easy-email-editor';
import React, { useEffect } from 'react';
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

const defaultCategories: ExtensionProps['categories'] = [
  {
    get label() {
      return t('Content');
    },
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
    get label() {
      return t('Layout');
    },
    active: true,
    displayType: 'column',
    blocks: [
      {
        get title() {
          return t('2 columns');
        },
        payload: [
          ['50%', '50%'],
          ['33%', '67%'],
          ['67%', '33%'],
          ['25%', '75%'],
          ['75%', '25%'],
        ],
      },
      {
        get title() {
          return t('3 columns');
        },
        payload: [
          ['33.33%', '33.33%', '33.33%'],
          ['25%', '25%', '50%'],
          ['50%', '25%', '25%'],
        ],
      },
      {
        get title() {
          return t('4 columns');
        },
        payload: [['25%', '25%', '25%', '25%']],
      },
    ],
  },
];

export const StandardLayout: React.FC<ExtensionProps> = props => {
  const { height: containerHeight } = useEditorProps();
  const {
    showSourceCode = true,
    compact = true,
    categories = defaultCategories,
    jsonReadOnly = false,
    mjmlReadOnly = true,
  } = props;

  const { setFocusIdx } = useFocusIdx();

  useEffect(() => {
    if (!compact) {
      setFocusIdx('');
    }
  }, [compact, setFocusIdx]);

  return (
    <ExtensionProvider
      {...props}
      categories={categories}
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
              width: '100%',
              overflow: 'hidden',
            }}
          >
            {compact && (
              <EditPanel
                showSourceCode={showSourceCode}
                jsonReadOnly={jsonReadOnly}
                mjmlReadOnly={mjmlReadOnly}
              />
            )}
            <Layout style={{ height: containerHeight, flex: 1 }}>{props.children}</Layout>
            {!compact && (
              <EditPanel
                showSourceCode={showSourceCode}
                jsonReadOnly={jsonReadOnly}
                mjmlReadOnly={mjmlReadOnly}
              />
            )}
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
                  jsonReadOnly={jsonReadOnly}
                  mjmlReadOnly={mjmlReadOnly}
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

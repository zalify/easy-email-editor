import React, { useEffect, useState } from 'react';
import { Tabs } from '@arco-design/web-react';
import { AttributePanel } from '@extensions/AttributePanel';
import { SourceCodePanel } from '@extensions/SourceCodePanel';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { IconLeft } from '@arco-design/web-react/icon';
import styles from './index.module.scss';

export interface ConfigurationPanelProps {
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
  height: string;
  onBack?: () => void;
  compact?: boolean;
}

export function ConfigurationPanel({
  showSourceCode,
  height,
  onBack,
  compact,
  jsonReadOnly,
  mjmlReadOnly,
}: ConfigurationPanelProps) {
  const [inited, setInited] = useState(false);

  useEffect(() => {
    // Tabs 在 drawer 里面有bug
    let timer = setTimeout(() => {
      setInited(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!inited) return null;

  return (
    <>
      {showSourceCode ? (
        <Tabs
          className={styles.tabs}
          renderTabHeader={(_, DefaultHeader) =>
            !compact ? (
              <div
                className={styles.largeTabsHeader}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div
                  style={{ padding: 10, cursor: 'pointer' }}
                  onClick={onBack}
                >
                  <IconLeft fontSize={16} />
                </div>

                <DefaultHeader style={{ flex: 1 }} />
              </div>
            ) : (
              <div
                className={styles.largeTabsHeader}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <DefaultHeader style={{ flex: 1 }} />
              </div>
            )
          }
        >
          <Tabs.TabPane
            title={
              <div style={{ height: 40, lineHeight: '40px' }}>{t('Configuration')}</div>
            }
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <AttributePanel />
            </FullHeightOverlayScrollbars>
          </Tabs.TabPane>

          <Tabs.TabPane
            destroyOnHide
            key='Source code'
            title={
              <div style={{ height: 40, lineHeight: '40px' }}>{t('Source code')}</div>
            }
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <SourceCodePanel jsonReadOnly={jsonReadOnly} mjmlReadOnly={mjmlReadOnly} />
            </FullHeightOverlayScrollbars>
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <AttributePanel />
      )}
    </>
  );
}

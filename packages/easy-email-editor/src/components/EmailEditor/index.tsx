import React, { useMemo } from 'react';
import { Stack } from '../UI/Stack';
import { ToolsPanel } from './components/ToolsPanel';
import { createPortal } from 'react-dom';
import { FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '../Provider/BlocksProvider';
import { DesktopEmailPreview } from './components/DesktopEmailPreview';
import { MobileEmailPreview } from './components/MobileEmailPreview';
import { EditEmailPreview } from './components/EditEmailPreview';
import { IconFont } from '../IconFont';
import { TabPane, Tabs } from '@/components/UI/Tabs';
import { useEditorProps } from '@/hooks/useEditorProps';
import './index.scss';

(window as any).global = window;

export const EmailEditor = () => {
  const { height: containerHeight } = useEditorProps();
  const { setActiveTab } = useActiveTab();

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  return useMemo(
    () => (
      <div
        style={{
          display: 'flex',
          flex: '1',
          overflow: 'hidden',
          justifyContent: 'center',
          minWidth: 640,
          height: containerHeight,
        }}
      >
        <Tabs
          onChange={(id) => setActiveTab(id as any)}
          style={{ height: '100%', width: '100%' }}
          tabBarExtraContent={<ToolsPanel />}
        >
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
              <Stack spacing='tight'>
                <IconFont iconName='icon-editor' />
              </Stack>
            )}
            key={ActiveTabKeys.EDIT}
          >
            <EditEmailPreview />
          </TabPane>
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
              <Stack spacing='tight'>
                <IconFont iconName='icon-desktop' />
              </Stack>
            )}
            key={ActiveTabKeys.PC}
          >
            <DesktopEmailPreview />
          </TabPane>
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
              <Stack spacing='tight'>
                <IconFont iconName='icon-mobile' />
              </Stack>
            )}
            key={ActiveTabKeys.MOBILE}
          >
            <MobileEmailPreview />
          </TabPane>
        </Tabs>

        {fixedContainer}
      </div>
    ),
    [containerHeight, fixedContainer, setActiveTab]
  );
};

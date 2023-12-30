import { Space } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import React from 'react';
import Collapsible from '../../UI/Collapsible';

export function Spacer() {
  return (
    <AttributesPanelWrapper>
      <Collapsible title='Dimension'>
        <Space direction='vertical'>
          <Height />
          {/* <Padding /> */}
        </Space>
      </Collapsible>

      <Collapsible title='Background'>
        <ContainerBackgroundColor title={t('Background color')} />
      </Collapsible>
    </AttributesPanelWrapper>
  );
}

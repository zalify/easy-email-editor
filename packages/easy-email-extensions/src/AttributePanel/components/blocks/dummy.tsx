import React, { useState } from 'react';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Tooltip, Button } from '@arco-design/web-react';
import { IconFont } from 'easy-email-editor';
import { BackgroundColor, CollapseWrapper } from '../attributes';
import { HtmlEditor } from '../UI/HtmlEditor';

export function DefaultAttributePanel() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper
      extra={(
        <Tooltip content={t('Html mode')}>
          <Button
            onClick={() => setVisible(true)}
            icon={<IconFont iconName='icon-html' />}
          />
        </Tooltip>
      )}
    >
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item
          name='1'
          header={t('Color')}
        >

          <BackgroundColor title={t('Background color')} />
        </Collapse.Item>
      </CollapseWrapper>
      <HtmlEditor
        visible={visible}
        setVisible={setVisible}
      />
    </AttributesPanelWrapper>
  );
}

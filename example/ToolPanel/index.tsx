import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import {
  CustomerServiceOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  LayoutOutlined,
  FontSizeOutlined,
  MergeCellsOutlined,
  FormOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import { BlockIcon } from './components/BlockIcon';
import { BasicType } from '@/constants';

const { Panel } = Collapse;

export const ToolPanel = function () {
  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3']}>
        <Panel header='基础组件' key='1'>
          <BlockIcon
            text='section'
            type={BasicType.SECTION}
            icon={<FormOutlined />}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

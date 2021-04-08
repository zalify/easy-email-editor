import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import {
  PictureOutlined,
  FontSizeOutlined,
  DatabaseOutlined,
  MinusOutlined,
  ColumnHeightOutlined,
  BorderOuterOutlined,
  PicCenterOutlined,
  YoutubeOutlined,
  TableOutlined
} from '@ant-design/icons';
import { BlockIcon } from './components/BlockIcon';
import { BasicType } from '@/constants';
import { ColumnBlockIconPanel } from './components/ColumnBlockIcon';

const { Panel } = Collapse;

export const ComponentsPanel = function () {
  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3']}>
        <Panel header='Layout' key='2'>
          <div style={{ padding: '10px 20px' }}>
            <ColumnBlockIconPanel />
          </div>

        </Panel>
        <Panel header='Content' key='1'>
          <div className={styles.list}>
            <BlockIcon
              text='Wrapper'
              type={BasicType.WRAPPER}
              icon={<BorderOuterOutlined />}
            />
            <BlockIcon
              text='Row'
              type={BasicType.SECTION}
              icon={<PicCenterOutlined />}
            />

            <BlockIcon
              text='Group'
              type={BasicType.GROUP}
              icon={<TableOutlined />}
            />
            <BlockIcon
              text='Column'
              type={BasicType.COLUMN}
              icon={<DatabaseOutlined />}
            />
            <BlockIcon
              text='Image'
              type={BasicType.IMAGE}
              icon={<PictureOutlined />}
            />
            <BlockIcon
              text='Text'
              type={BasicType.TEXT}
              icon={<FontSizeOutlined />}
            />
            <BlockIcon
              text='Button'
              type={BasicType.BUTTON}
              icon={<YoutubeOutlined />}
            />
            <BlockIcon
              text='Divider'
              type={BasicType.DIVIDER}
              icon={<MinusOutlined />}
            />
            <BlockIcon
              text='Spacer'
              type={BasicType.SPACER}
              icon={<ColumnHeightOutlined />}
            />
          </div>
        </Panel>

      </Collapse>
    </div>
  );
};

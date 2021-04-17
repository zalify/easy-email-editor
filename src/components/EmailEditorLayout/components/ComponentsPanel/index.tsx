import React, { useContext } from 'react';
import styles from './index.module.scss';
import { Collapse, Empty, Tag } from 'antd';
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
import { Stack } from '@/components/Stack';
import { EditorPropsContext } from '@/components/PropsProvider';
import { TextStyle } from '@/components/TextStyle';

const { Panel } = Collapse;

export const ComponentsPanel = function () {
  const { extraBlocks = [] } = useContext(EditorPropsContext);
  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3', '4', '5']}>
        <Panel header='Layout' key='2'>
          <div style={{ padding: '10px 20px' }}>
            <ColumnBlockIconPanel />
          </div>
        </Panel>
        <Panel header='Content' key='1'>
          <div className={styles.list}>
            <BlockIcon
              text='Wrapper'
              helpText={
                `
                Wrapper enables to wrap multiple sections together. It's especially useful to achieve nested layouts with shared border or background images across sections.
                `
              }
              type={BasicType.WRAPPER}
              icon={<BorderOuterOutlined />}
            />
            <BlockIcon
              text='Section'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Sections are intended to be used as rows within your email. They will be used to structure the layout.
                  </TextStyle>
                  <TextStyle>
                    Sections cannot nest in sections. Columns can nest in sections; all content must be in a column.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.SECTION}
              icon={<PicCenterOutlined />}
            />

            <BlockIcon
              text='Group'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Group allows you to prevent columns from stacking on mobile. To do so, wrap the columns inside a mj-group tag, so they'll stay side by side on mobile.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.GROUP}
              icon={<TableOutlined />}
            />
            <BlockIcon
              text='Column'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Columns enable you to horizontally organize the content within your sections. They must be located under "Section" block in order to be considered by the engine. To be responsive, columns are expressed in terms of percentage.
                  </TextStyle>
                  <TextStyle>
                    Every single column has to contain something because they are responsive containers, and will be vertically stacked on a mobile view.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.COLUMN}
              icon={<DatabaseOutlined />}
            />
            <BlockIcon
              text='Image'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Displays a responsive image in your email. It is similar to the HTML "&lt;img/&gt;"  tag. Note that if no width is provided, the image will use the parent column width.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.IMAGE}
              icon={<PictureOutlined />}
            />
            <BlockIcon
              text='Text'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    This block allows you to display text in your email.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.TEXT}
              icon={<FontSizeOutlined />}
            />
            <BlockIcon
              text='Button'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Displays a customizable button.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.BUTTON}
              icon={<YoutubeOutlined />}
            />
            <BlockIcon
              text='Divider'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Displays a horizontal divider that can be customized like a HTML border.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.DIVIDER}
              icon={<MinusOutlined />}
            />
            <BlockIcon
              text='Spacer'
              helpText={(
                <Stack vertical spacing="none">
                  <TextStyle>
                    Displays a blank space.
                  </TextStyle>
                </Stack>
              )}
              type={BasicType.SPACER}
              icon={<ColumnHeightOutlined />}
            />
          </div>
          <Stack vertical>
            <Stack.Item />
            <Stack.Item />
            <Stack.Item />
          </Stack>
        </Panel>

        {
          extraBlocks.map((item, index) => (
            <Panel header={item.title} key={`${index + 3}`}>
              <div className={styles.list}>
                {
                  item.blocks.map((block, bIndex) => (
                    <BlockIcon
                      id={block.id}
                      key={bIndex}
                      text={block.label}
                      helpText={block.helpText}
                      type={block.data.type}
                      icon={block.icon}
                      payload={block.data}
                    />
                  ))
                }
                <Stack.Item fill>
                  <Stack vertical distribution="center" alignment="center">
                    <Stack.Item />
                    {
                      item.blocks.length === 0 && (
                        <Empty />
                      )
                    }
                  </Stack>
                </Stack.Item>
              </div>
              <Stack vertical>
                <Stack.Item />
                <Stack.Item />
                <Stack.Item />
              </Stack>
            </Panel>
          ))
        }
      </Collapse>
    </div>
  );
};

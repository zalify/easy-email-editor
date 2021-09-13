/* eslint-disable react/jsx-wrap-multilines */
import React, { useContext, useState } from 'react';
import styles from './index.module.scss';
import { Button, Collapse, Empty } from 'antd';
import {
  PictureOutlined,
  FontSizeOutlined,
  DatabaseOutlined,
  MinusOutlined,
  ColumnHeightOutlined,
  BorderOuterOutlined,
  PicCenterOutlined,
  YoutubeOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { BlockIcon } from './components/BlockIcon';
import { BasicType } from '@/constants';
import { ColumnBlockIconPanel } from './components/ColumnBlockIcon';
import { Stack } from '@/components/UI/Stack';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { TextStyle } from '@/components/UI/TextStyle';
import { LayoutBlockIcon } from './components/LayoutBlockIcon';

const { Panel } = Collapse;

export const ComponentsPanel = React.memo(function () {
  const [visible, setVisible] = useState(false);
  const { extraBlocks = [] } = useContext(EditorPropsContext);

  const onToggleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((v) => !v);
  };

  return (
    <div className={styles.container}>
      <Collapse
        className={styles.collapse}
        defaultActiveKey={['1', '2', '3', '4', '5']}
      >
        <Panel
          header="Layout"
          key="2"
          extra={
            <Button type="link" onClick={onToggleMore}>
              {visible ? ' Show less' : ' Show more'}
            </Button>
          }
        >
          <div
            style={{
              display: 'flex',
              flex: '1',
            }}
          >
            <Stack.Item fill>
              <Stack vertical alignment="center" distribution="center">
                <Stack.Item />
                <Stack alignment="center" distribution="center">
                  <LayoutBlockIcon
                    text="Wrapper"
                    helpText={`
                Wrapper enables to wrap multiple sections together. It's especially useful to achieve nested layouts with shared border or background images across sections.
                `}
                    type={BasicType.WRAPPER}
                    icon={<BorderOuterOutlined />}
                  />
                  <LayoutBlockIcon
                    text="Section"
                    helpText={
                      <Stack vertical spacing="none">
                        <TextStyle>
                          Sections are intended to be used as rows within your
                          email. They will be used to structure the layout.
                        </TextStyle>
                        <TextStyle>
                          Sections cannot nest in sections. Columns can nest in
                          sections; all content must be in a column.
                        </TextStyle>
                      </Stack>
                    }
                    type={BasicType.SECTION}
                    icon={<PicCenterOutlined />}
                  />
                </Stack>
                <Stack alignment="center" distribution="center">
                  <LayoutBlockIcon
                    text="Group"
                    helpText={
                      <Stack vertical spacing="none">
                        <TextStyle>
                          Group allows you to prevent columns from stacking on
                          mobile. To do so, wrap the columns inside a group
                          block, so they'll stay side by side on mobile.
                        </TextStyle>
                      </Stack>
                    }
                    type={BasicType.GROUP}
                    icon={<TableOutlined />}
                  />
                  <LayoutBlockIcon
                    text="Column"
                    helpText={
                      <Stack vertical spacing="none">
                        <TextStyle>
                          Columns enable you to horizontally organize the
                          content within your sections. They must be located
                          under "Section" block in order to be considered by the
                          engine. To be responsive, columns are expressed in
                          terms of percentage.
                        </TextStyle>
                        <TextStyle>
                          Every single column has to contain something because
                          they are responsive containers, and will be vertically
                          stacked on a mobile view.
                        </TextStyle>
                      </Stack>
                    }
                    type={BasicType.COLUMN}
                    icon={<DatabaseOutlined />}
                  />
                </Stack>
                <Stack.Item />
              </Stack>
            </Stack.Item>
          </div>
          <div
            style={{
              maxHeight: visible ? 999 : 0,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '10px 20px' }}>
              <ColumnBlockIconPanel />
            </div>
          </div>
        </Panel>
        <Panel header="Content" key="1">
          <div className={styles.list}>
            <BlockIcon
              text="Text"
              payload={{
                attributes: {
                  padding: '0px 0px 0px 0px',
                },
              }}
              helpText={
                <Stack vertical spacing="none">
                  <TextStyle>
                    This block allows you to display text in your email.
                  </TextStyle>
                </Stack>
              }
              type={BasicType.TEXT}
              icon={<FontSizeOutlined />}
            />
            <BlockIcon
              text="Image"
              helpText={
                <Stack vertical spacing="none">
                  <TextStyle>
                    Displays a responsive image in your email. It is similar to
                    the HTML "&lt;img/&gt;" tag. Note that if no width is
                    provided, the image will use the parent column width.
                  </TextStyle>
                </Stack>
              }
              payload={{
                attributes: { width: '150px', padding: '0px 0px 0px 0px' },
              }}
              type={BasicType.IMAGE}
              icon={<PictureOutlined />}
            />

            <BlockIcon
              text="Button"
              payload={{
                attributes: {
                  padding: '0px 0px 0px 0px',
                },
              }}
              helpText={
                <Stack vertical spacing="none">
                  <TextStyle>Displays a customizable button.</TextStyle>
                </Stack>
              }
              type={BasicType.BUTTON}
              icon={<YoutubeOutlined />}
            />
            <BlockIcon
              text="Divider"
              helpText={
                <Stack vertical spacing="none">
                  <TextStyle>
                    Displays a horizontal divider that can be customized like a
                    HTML border.
                  </TextStyle>
                </Stack>
              }
              type={BasicType.DIVIDER}
              icon={<MinusOutlined />}
            />
            <BlockIcon
              text="Spacer"
              helpText={
                <Stack vertical spacing="none">
                  <TextStyle>Displays a blank space.</TextStyle>
                </Stack>
              }
              type={BasicType.SPACER}
              icon={<ColumnHeightOutlined />}
            />

            <>
              <BlockIcon
                text="Accordion"
                helpText={
                  <Stack vertical spacing="none">
                    <TextStyle>
                      Accordion is an interactive component to stack content in
                      tabs, so the information is collapsed and only the titles
                      are visible. Readers can interact by clicking on the tabs
                      to reveal the content, providing a great experience on
                      mobile devices where space is scarce.
                    </TextStyle>
                  </Stack>
                }
                type={BasicType.ACCORDION}
                icon={<ColumnHeightOutlined />}
              />
              <BlockIcon
                text="Hero"
                helpText={
                  <Stack vertical spacing="none">
                    <TextStyle>
                      This block displays a hero image. It behaves like an
                      'section' with a single 'column'.
                    </TextStyle>
                  </Stack>
                }
                type={BasicType.HERO}
                icon={<ColumnHeightOutlined />}
              />
              <BlockIcon
                text="Carousel"
                helpText={
                  <Stack vertical spacing="none">
                    <TextStyle>
                      This block displays a gallery of images or "carousel".
                      Readers can interact by hovering and clicking on
                      thumbnails depending on the email client they use.
                    </TextStyle>
                  </Stack>
                }
                type={BasicType.CAROUSEL}
                icon={<ColumnHeightOutlined />}
              />
              <BlockIcon
                text="Navbar"
                helpText={
                  <Stack vertical spacing="none">
                    <TextStyle>
                      Displays a menu for navigation with an optional hamburger
                      mode for mobile devices.
                    </TextStyle>
                  </Stack>
                }
                type={BasicType.NAVBAR}
                icon={<ColumnHeightOutlined />}
              />
              <BlockIcon
                text="Social"
                helpText={
                  <Stack vertical spacing="none">
                    <TextStyle>
                      Displays calls-to-action for various social networks with
                      their associated logo.
                    </TextStyle>
                  </Stack>
                }
                type={BasicType.SOCIAL}
                icon={<ColumnHeightOutlined />}
              />
            </>
          </div>
          <Stack vertical>
            <Stack.Item />
            <Stack.Item />
            <Stack.Item />
          </Stack>
        </Panel>

        {extraBlocks.map((item, index) => (
          <Panel header={item.title} key={`${index + 3}`}>
            <div className={styles.list}>
              {item.blocks.map((block, bIndex) => (
                <BlockIcon
                  {...block}
                  key={bIndex}
                  text={block.label}
                  type={block.data.type}
                  payload={block.data}
                />
              ))}
              <Stack.Item fill>
                <Stack vertical distribution="center" alignment="center">
                  <Stack.Item />
                  {item.blocks.length === 0 && <Empty />}
                </Stack>
              </Stack.Item>
            </div>
            <Stack vertical>
              <Stack.Item />
              <Stack.Item />
              <Stack.Item />
            </Stack>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
});

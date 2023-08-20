import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, CollapseWrapper, ColorPickerField, EditTabField, ImageUploaderField, TextField } from 'easy-email-extensions';
import React from 'react';

export function topBar5Panel(props: any) {
  const { focusIdx } = useFocusIdx();

  const topBar5AttributeJson = [
    {
      components: [
        {
          "type": "BlockLevel",
          "label": "Top Bar 5 Block",
          "path": "",
          "properties": [
            {
              "label": "Background Color",
              "path": ".attributes.background-color",
              "value": "#ffffff"
            },
            {
              "label": "Background Image",
              "path": ".attributes.background-url",
              "value": "https://s3.com/path"
            }
          ]
        },
        {
          "type": "Nav",
          "label": "Links Left Side",
          "path": ".children.[0].children.[0].children.[0]",
          "properties": [
            {
              "label": "Links",
              "path": ".data.value.links",
              "value": [
                {
                  "href": "/gettings-started-onboard",
                  "content": "Home"
                },
                {
                  "href": "/try-it-live",
                  "content": "About"
                }
              ]
            }
          ]
        },
        {
          "type": "logo",
          "label": "Logo",
          "path": ".children[0]children[1]children[0]",
          "properties": [
            {
              "label": "Image",
              "path": ".attributes.src",
              "value": "https://plus.unsplash.com/premium_photo-1668064108355-ac4e7a7d089e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=401&q=80"
            },
            {
              "label": "Width",
              "path": ".attributes.width",
              "value": "40px"
            },
            {
              "label": "Height",
              "path": ".attributes.height",
              "value": "40px"
            }
          ]
        },
        {
          "type": "Nav",
          "label": "Links Right Side",
          "path": ".children[0]children[2]children[0]",
          "properties": [
            {
              "label": "Links",
              "path": ".data.value.links",
              "value": [
                {
                  "href": "/gettings-started-onboard",
                  "content": "Privacy"
                },
                {
                  "href": "/try-it-live",
                  "content": "Service"
                }
              ]
            }
          ]
        },
      ]
    }
  ];

  console.log("value", topBar5AttributeJson[0].components[1].properties[0].value[0]);

  return (
    <AttributesPanelWrapper style={{ padding: '20px' }}>
      <Stack vertical>
        {
          topBar5AttributeJson[0].components.map((attribute: any, index: number) => {

            if (attribute.label === 'Top Bar 5 Block') {
              return (
                attribute.properties.map((prop: any, index: number) => {
                  if (prop.label === 'Background Color') {
                    return (
                      <ColorPickerField
                        label='Background color'
                        name={`${focusIdx}${prop.path}`}
                        inline
                      // alignment='center'
                      />
                    );
                  }
                  if (prop.label === 'Background Image') {
                    return (
                      <>
                        <ImageUploaderField
                          label={prop.label}
                          name={`${focusIdx}${prop.path}`}
                          inline
                        // alignment='center'
                        />
                      </>
                    );
                  }
                })
              );
            }
            if (attribute.label === 'Links Left Side') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Left Navbar links')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties[0].value.map((props: any, index: number) => {

                        console.log("contzwfwevweendsft", (focusIdx),(attribute.path),(attribute.properties[0].path),
                        (index),(props.content));
                        if (props.content === 'Home') {
                          return (
                            <Grid.Row>
                              <Grid.Col span={11}>
                                <TextField
                                  label={t('Content')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].content`}
                                />
                              </Grid.Col>
                              <Grid.Col
                                offset={1}
                                span={11}
                              >
                                <TextField
                                  label={t('url')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].href`}

                                />
                              </Grid.Col>
                            </Grid.Row>
                          );
                        }
                        if (props.content === 'About') {
                          return (
                            <Grid.Row>
                              <Grid.Col span={11}>
                                <TextField
                                  label={t('Content')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].content`}

                                />
                              </Grid.Col>
                              <Grid.Col
                                offset={1}
                                span={11}
                              >
                                <TextField
                                  label={t('url')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].href`}
                                />
                              </Grid.Col>
                            </Grid.Row>
                          );
                        }
                      })}
                    </Space>

                  </Collapse.Item>
                </CollapseWrapper>
              );
            }

            if (attribute.label === 'Logo') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Logo')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        console.log("cimage", (focusIdx),(attribute.path),(props.path));
                        if (props.label === 'Image') {
                          return (
                            <TextField
                              label={props.label}
                              name={`${focusIdx}${attribute.path}${props.path}`}
                              inline
                            />
                          );
                        }
                        if (props.label === 'Width') {
                          console.log("pathsssssssss", props.path)
                          return (
                            <TextField
                              label={props.label}
                              name={`${focusIdx}${attribute.path}${props.path}`}
                            />
                          );
                        }
                        if (props.label === 'Height') {
                          return (
                            <TextField
                              label={props.label}
                              name={`${focusIdx}${attribute.path}${props.path}`}
                            />
                          );
                        }
                      })}
                    </Space>

                  </Collapse.Item>
                </CollapseWrapper>
              );
            }


            if (attribute.label === 'Links Right Side') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Links Right Side')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties[0].value.map((props: any, index: number) => {
                        console.log("contendsft", attribute.properties[0].path);
                        if (props.content === 'Privacy') {
                          return (
                            <Grid.Row>
                              <Grid.Col span={11}>
                                <TextField
                                  label={t('Content')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].content`}
                                />
                              </Grid.Col>
                              <Grid.Col
                                offset={1}
                                span={11}
                              >
                                <TextField
                                  label={t('url')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].href`}

                                />
                              </Grid.Col>
                            </Grid.Row>
                          );
                        }
                        if (props.content === 'Service') {
                          return (
                            <Grid.Row>
                              <Grid.Col span={11}>
                                <TextField
                                  label={t('Content')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].content`}
                                />
                              </Grid.Col>
                              <Grid.Col
                                offset={1}
                                span={11}
                              >
                                <TextField
                                  label={t('url')}
                                  name={`${focusIdx}${attribute.path}${attribute.properties[0].path}.[${index}].href`}

                                />
                              </Grid.Col>
                            </Grid.Row>
                          );
                        }
                      })}
                    </Space>

                  </Collapse.Item>
                </CollapseWrapper>
              );
            }
          })
        }
      </Stack>
    </AttributesPanelWrapper>
  );
}

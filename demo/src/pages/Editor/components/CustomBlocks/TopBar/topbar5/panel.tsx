import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, CollapseWrapper, ColorPickerField, EditTabField, ImageUploaderField, TextField } from 'easy-email-extensions';
import React from 'react';

export function TopBar5Panel(props: any) {
  const { focusIdx } = useFocusIdx();

  const topBar5AttributeJson =
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
  };

  return (
    <AttributesPanelWrapper style={{ padding: '20px' }}>
      <Stack vertical>
        {
          topBar5AttributeJson.components.map((attribute: any, index: number) => {
            if (attribute.type === 'BlockLevel') {
              return (
                attribute.properties.map((prop: any, index: number) => {
                  if (prop.label === 'Background Color') {
                    return (
                      <ColorPickerField
                        label='Background color'
                        name={`${focusIdx}${prop.path}`}
                        inline
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
                        />
                      </>
                    );
                  }
                })
              );
            }

            if (attribute.type === 'logo') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t(attribute.label)}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        console.log("cimage", (focusIdx), (attribute.path), (props.path));
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
                          console.log("pathsssssssss", props.path);
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


            if (attribute.type = 'Nav') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t(attribute.label)}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties[0].value.map((props: any, index: number) => {
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

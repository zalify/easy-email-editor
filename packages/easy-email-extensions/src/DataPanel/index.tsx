import { useEditorProps } from '@';
import { Button, Form, FormInstance, Input, Space } from '@arco-design/web-react';
import { IconDelete, IconPlus, IconSave } from '@arco-design/web-react/icon';
import React, { useRef, useState } from 'react';

export function DataPanel() {
  const { setMergeTags, mergeTags } = useEditorProps();

  const formRef = useRef<FormInstance>(null);
  return (
    <div style={{ padding: 0 }}>
      <Form
        ref={formRef}
        autoComplete='off'
        onSubmit={(values => {
          let newObj: Record<string, any> = {};
          values.tagData.map((tag: { key: string; value: string; }) => {
            newObj[tag.key] = tag.value;
          });

          setMergeTags && setMergeTags({
            global: newObj
          });
        })}
        initialValues={{
          tagData: Object.keys(mergeTags?.global).map(k => {
            return {
              key: k,
              value: mergeTags?.global[k]
            };
          }),
        }}
        onValuesChange={(_, v) => {
          if (Array.isArray(_)) {
            return;
          }
          if (typeof _ === 'object') {
            const key = Object.keys(_)[0];
          }
        }}
      >
        <Form.List field='tagData'>
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Space style={{ padding: 10 }}>
                        <Form.Item
                          field={item.field + '.key'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          field={item.field + '.value'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                        <Button
                          icon={<IconDelete />}
                          shape='circle'
                          status='danger'
                          onClick={() => remove(index)}
                        />
                      </Space>
                    </div>
                  );
                })}
                <Form.Item style={{ padding: 10 }}>
                  <Space size={20}>

                    <Button
                      type='primary'
                      icon={<IconPlus />}
                      onClick={() => {
                        add();
                      }}
                    />
                    <Button
                      icon={<IconSave />}
                      type='primary'
                      htmlType='submit'
                    >
                      Save Data
                    </Button>
                  </Space>

                </Form.Item>

              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
}

import { EmailEditorLayout } from '@/components/EmailEditorLayout';
import { EditorProps } from '@/components/EmailEditorProvider';
import { Stack } from '@/components/Stack';
import { BasicType } from '@/constants';
import { EmailEditor } from '@/index';
import { IEmailTemplate } from '@/typings';
import { transformToMjml } from '@/utils/transformToMjml';
import { Button, PageHeader } from 'antd';
import React from 'react';
import mjml from 'mjml-browser';

export default function App() {
  const onSubmit = (values: EditorProps) => { };

  const onExportHtml = (values: EditorProps) => {
    console.log(mjml(transformToMjml(values.content), { beautify: true, validationLevel: 'strict' }).html);
  };

  const data: IEmailTemplate = {
    content: {
      type: BasicType.PAGE,
      data: {
        value: {},
      },
      attributes: {},
      children: [],
    },
    subject: '',
    subTitle: 'string',
  };

  return (
    <div>

      <EmailEditor data={data}>
        {
          ({ values }) => (
            <>
              <PageHeader title="Edit" extra={(
                <Stack>
                  <Button onClick={() => onExportHtml(values)}>Export html</Button>
                  <Button type="primary" onClick={() => onSubmit(values)}>Save</Button>
                </Stack>
              )}
              />
              <EmailEditorLayout />
            </>
          )
        }
      </EmailEditor>
    </div>
  );
}

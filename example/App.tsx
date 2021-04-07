
import { BasicType } from '@/constants';
import { EmailEditor } from '@/index';
import { IEmailTemplate } from '@/typings';
import React from 'react';

export default function App() {
  const onSubmit = () => { };

  const data: IEmailTemplate = {
    content: {
      type: BasicType.PAGE,
      data: {
        value: {},
      },
      attribute: {},
      children: [],
    },
    subject: '',
    subTitle: 'string',
  };

  return (
    <div>
      <EmailEditor
        data={data}
        onSubmit={onSubmit}
      />
    </div>
  );
}

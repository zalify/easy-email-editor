import { IBlockData, IEmailTemplate, transformToMjml } from 'easy-email-editor';
import { message, Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import mjml from 'mjml-browser';
import { useDispatch } from 'react-redux';
import email from '@example/store/email';
import * as Yup from 'yup';
import { Form } from 'react-final-form';
import { TextField } from '@example/components/Form';
import { useLoading } from '@example/hooks/useLoading';
import { useCallback } from 'react';
import { pushEvent } from '@example/util/pushEvent';
import { TextAreaField } from '@example/components/Form';
import mustache from 'mustache';
import { CustomBlocksType } from './CustomBlocks/constants';
import { cloneDeep, merge } from 'lodash';

const schema = Yup.object().shape({
  toEmail: Yup.string().email('Unvalid email').required('Email required'),
});

export function useEmailModal() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [emailData, setEmailData] = useState<IEmailTemplate | null>(null);
  const [mergeTags, setMergeTags] = useState<any>(null);
  const emailSendLoading = useLoading(email.loadings.send);

  const onSendEmail = useCallback(
    async (values: { toEmail: string; mergeTags: string; }) => {
      if (!emailData) return null;
      pushEvent({ name: 'SendTestEmail' });
      let mergeTagsPayload = {};
      try {
        mergeTagsPayload = JSON.parse(values.mergeTags);
      } catch (error) {
        message.error('invalid JSON');
        return;
      }
      const content = JSON.parse(mustache.render(JSON.stringify(emailData.content), mergeTagsPayload));
      const customBlockData = injectData(content);

      const html = mjml(transformToMjml({
        data: customBlockData,
        mode: 'production',
        context: customBlockData
      }), {
        beautify: true,
        validationLevel: 'soft',
      }).html;

      dispatch(
        email.actions.send({
          data: {
            toEmail: values.toEmail,
            subject: emailData.subject,
            text: emailData.subTitle || emailData.subject,
            html: html,
          },
          success: () => {
            closeModal();
            message.success('Email send!');
          },
        })
      );
    },
    [dispatch, emailData]
  );

  const openModal = (value: IEmailTemplate, mergeTags: any) => {
    setEmailData(value);
    setMergeTags(mergeTags);
    setVisible(true);
  };
  const closeModal = () => {
    setEmailData(null);
    setMergeTags(null);
    setVisible(false);
  };

  const modal = useMemo(() => {
    return (
      <Form
        validationSchema={schema}
        initialValues={{ toEmail: '', mergeTags: JSON.stringify(mergeTags, null, 2) }}
        onSubmit={onSendEmail}
      >
        {({ handleSubmit }) => (
          <Modal
            zIndex={9999}
            title='Send test email'
            okText='Send'
            visible={visible}
            confirmLoading={emailSendLoading}
            onOk={() => handleSubmit()}
            onCancel={closeModal}
          >
            <TextField autoFocus name='toEmail' label='To email' />
            <TextAreaField rows={15} autoFocus name='mergeTags' label='Dynamic data' />
          </Modal>
        )}
      </Form>
    );
  }, [mergeTags, onSendEmail, visible, emailSendLoading]);

  return {
    modal,
    openModal,
  };
}

function injectData(data: IBlockData) {
  const customBlockData = cloneDeep(data);
  customBlockData.children.forEach((item) => {
    if (item.type === CustomBlocksType.PRODUCT_RECOMMENDATION as any) {
      item.data.value = merge(item.data.value, {
        productList: [
          {
            image:
              'https://assets.maocanhua.cn/da9b173d-b272-4101-aa25-4635ed95e9e3-image.png',
            title: 'Slim Fit Printed shirt',
            price: '$59.99 HKD',
            url: 'https://easy-email-m-ryan.vercel.app',
          },
          {
            image:
              'https://assets.maocanhua.cn/4ef7cb65-ee1f-4b12-832c-17ab07a8b9ac-image.png',
            title: 'Casual Collar Youth Handsome Slim Print Blazer',
            price: '$59.99 HKD',
            url: 'https://easy-email-m-ryan.vercel.app',
          },
          {
            image:
              'https://assets.maocanhua.cn/88fe9bfa-547f-4d5e-9ba5-ac6b91572dde-image.png',
            title: 'Shirt Business Casual',
            price: '$59.99 HKD',
            url: 'https://easy-email-m-ryan.vercel.app',
          },
        ],
      });
    }
  });

  return customBlockData;
}

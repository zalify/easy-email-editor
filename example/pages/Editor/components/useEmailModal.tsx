import { EditorProps } from '@/components/EmailEditorProvider';
import { message, Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import mjml from 'mjml-browser';
import { transformToMjml } from '@/utils/transformToMjml';
import { useDispatch } from 'react-redux';
import email from '@example/store/email';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TextField } from '@/components/core/Form';
import { useLoading } from '@example/hooks/useLoading';

const schema = Yup.object().shape({
  toEmail: Yup.string().email('Unvalid email').required("Email required")
});

export function useEmailModal() {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [emailData, setEmailData] = useState<EditorProps | null>(null);
  const emailSendLoading = useLoading(email.loadings.send);

  const onSendEmail = async (values: {
    toEmail: string;
  }) => {
    if (!emailData) return null;
    const html = mjml(transformToMjml(emailData.content), {
      beautify: false,
      minify: true,
      validationLevel: 'soft',
    }).html;

    dispatch(email.actions.send({
      data: {
        toEmail: values.toEmail,
        subject: emailData.subject,
        text: emailData.subTitle || emailData.subject,
        html: html,
      },
      success: () => {
        closeModal();
        message.success('Email send!');
      }
    }));

  };

  const openModal = (value: EditorProps) => {
    setEmailData(value);
    setVisible(true);
  };
  const closeModal = () => {
    setEmailData(null);
    setVisible(false);
  };

  const modal = useMemo(() => {
    return (
      <Formik validationSchema={schema} initialValues={{ toEmail: '' }} onSubmit={onSendEmail} >
        {
          ({ handleSubmit }) => (
            <Modal zIndex={9999}
              title="Send test email"
              okText="Send"
              visible={visible}
              confirmLoading={emailSendLoading}
              onOk={() => handleSubmit()}
              onCancel={closeModal}>

              <TextField autoFocus name="toEmail" label="To email" />

            </Modal>
          )
        }
      </Formik>
    );
  }, [visible, closeModal, emailSendLoading]);

  return {
    modal,
    openModal
  };
}
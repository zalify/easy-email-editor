import { Modal } from '@arco-design/web-react';
import { Stack, useBlock, useEditorProps } from 'easy-email-editor';
import React from 'react';
import { Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { ImageUploaderField, TextAreaField, TextField } from '../Form';
import { useTranslation } from '@extensions/hooks/useTranslation';

export const AddToCollection: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = ({ visible, setVisible }) => {
  const { focusBlock: focusBlockData } = useBlock();
  const { onAddCollection, onUploadImage } = useEditorProps();
  const { t } = useTranslation();

  const onSubmit = (values: {
    label: string;
    helpText: string;
    thumbnail: string;
  }) => {
    if (!values.label) return;
    const uuid = uuidv4();
    onAddCollection?.({
      label: values.label,
      helpText: values.helpText,
      data: focusBlockData!,
      thumbnail: values.thumbnail,
      id: uuid,
    });
    setVisible(false);
  };

  return (
    <Form
      initialValues={{ label: '', helpText: '', thumbnail: '' }}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <Modal
          maskClosable={false}
          style={{ zIndex: 2000 }}
          visible={visible}
          title='Add to collection'
          onOk={() => handleSubmit()}
          onCancel={() => setVisible(false)}
        >
          <Stack vertical>
            <Stack.Item />
            <TextField
              label={t('addToCollection.title')}
              name='label'
              validate={(val: string) => {
                if (!val) return t('addToCollection.titleRequired');
                return undefined;
              }}
            />
            <TextAreaField label={t('addToCollection.description')} name='helpText' />
            <ImageUploaderField
              label={t('addToCollection.thumbnail')}
              name={'thumbnail'}
              uploadHandler={onUploadImage}
              validate={(val: string) => {
                if (!val) return t('addToCollection.thumbnailRequired');
                return undefined;
              }}
            />
          </Stack>
        </Modal>
      )}
    </Form>
  );
};

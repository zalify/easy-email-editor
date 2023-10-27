import { Message, Modal } from '@arco-design/web-react';
import React, { useMemo, useState } from 'react';
import { Form } from 'react-final-form';
import { TextAreaField } from 'easy-email-extensions';
import { Config } from 'final-form';

export function useMergeTagsModal(defaultMergeTags: Record<string, any>) {
  const [visible, setVisible] = useState(false);
  const [mergeTags, setMergeTags] = useState<any>(defaultMergeTags);



  const openModal = () => {

    setVisible(true);
  };
  const closeModal = () => {

    setVisible(false);
  };

  const onSubmit: Config<any, { mergeTags: string; }>['onSubmit'] = (values) => {

    try {
      setMergeTags(JSON.parse(values.mergeTags));
      closeModal();
    } catch (error: any) {
      Message.warning(error?.message || error);
    }

  };

  const modal = useMemo(() => {
    return (
      <Form
        initialValues={{
          mergeTags: JSON.stringify(mergeTags, null, 2),
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Modal

            style={{ zIndex: 9999, width: '80vw', height: '80vh' }}
            title='Merge tags'
            okText='Save'
            cancelText='Cancel'
            visible={visible}
            onOk={() => handleSubmit()}
            onCancel={closeModal}
          >
            <TextAreaField
              rows={20}
              autoFocus
              name='mergeTags'
              label='Merge tags'
              labelHidden
            />
          </Modal>
        )}
      </Form>
    );
  }, [mergeTags, visible]);

  return {
    modal,
    openModal,
    mergeTags,
    setMergeTags
  };
}

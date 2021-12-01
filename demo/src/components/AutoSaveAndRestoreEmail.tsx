import React, { useEffect, useState } from 'react';
import { useForm, useFormState } from 'react-final-form';
import { useInterval, useLocalStorage } from 'react-use';
import { WarnAboutUnsavedChanges } from './WarnAboutUnsavedChanges';
import { IEmailTemplate } from 'easy-email-editor';
import { Modal } from '@arco-design/web-react';
import { getIsFormTouched } from '@demo/utils/getIsFormTouched';
import { useQuery } from '@demo/hooks/useQuery';

export function AutoSaveAndRestoreEmail() {
  const formState = useFormState<any>();
  const { reset, mutators } = useForm();
  const { id = 'new' } = useQuery<{ id: string }>();

  const [currentEmail, setCurrentEmail] =
    useLocalStorage<IEmailTemplate | null>(id, null);
  const dirty = getIsFormTouched(formState.touched as any);

  const [visible, setVisible] = useState(Boolean(currentEmail));

  useEffect(() => {
    if (dirty) {
      setCurrentEmail(formState.values);
    }
  }, [dirty, formState.values, setCurrentEmail]);

  useInterval(() => {
    if (dirty) {
      setCurrentEmail(formState.values);
    }
  }, 5000);

  const onRestore = () => {
    if (currentEmail) {
      reset(currentEmail);
      setCurrentEmail(null);
      setVisible(false);
      mutators.setFieldTouched(Object.keys(formState.touched || {})[0], true);
    }
  };

  const onDiscard = () => {
    setCurrentEmail(null);
    setVisible(false);
  };

  const onBeforeConfirm = () => {
    setCurrentEmail(null);
  };

  return (
    <>
      <Modal
        title='Restore email?'
        visible={Boolean(visible && currentEmail)}
        onOk={onRestore}
        okText='Restore'
        cancelText='Discard'
        onCancel={onDiscard}
        style={{ zIndex: 10000 }}
      >
        <p>Are you want to restore unsaved email?</p>
      </Modal>
      <WarnAboutUnsavedChanges onBeforeConfirm={onBeforeConfirm} />
    </>
  );
}

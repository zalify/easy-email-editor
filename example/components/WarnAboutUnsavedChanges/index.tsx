import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Prompt } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { ConfirmBeforeLeavePage } from '../../util/ConfirmBeforeLeavePage';
import { Modal } from 'antd';

export function WarnAboutUnsavedChanges() {
  const formik = useFormikContext<any>();
  const callbackRef = useRef<null | ((isOk: boolean) => any)>(null);
  const [visible, setVisible] = useState(false);
  const dirty = getIsFormTouched(formik.touched as any);

  const openConfirmModal = useCallback(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    ConfirmBeforeLeavePage.register((callback) => {
      if (dirty) {
        callbackRef.current = callback;
        openConfirmModal();
      }
    });

    const onCheckUnsaved = (event: Event) => {
      if (dirty) {
        event.preventDefault();
        (event.returnValue as any) = 'Changes that you made may not be saved.';
      }
    };

    window.addEventListener('beforeunload', onCheckUnsaved);

    return () => {
      ConfirmBeforeLeavePage.unregister();
      window.removeEventListener('beforeunload', onCheckUnsaved);
    };
  }, [openConfirmModal, dirty]);

  const onCancel = useCallback(() => {
    callbackRef.current?.(false);
    setVisible(false);
  }, []);

  const onOk = useCallback(() => {
    callbackRef.current?.(true);
  }, []);

  return (
    <>
      <Modal
        title='Discard changes?'
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
        okText='Discard'
        zIndex={10000}
      >
        <p>Are you sure you want to discard all unsaved changes?</p>
      </Modal>
      <Prompt when={dirty} message='' />
    </>
  );
}

interface TouchedObj {
  [key: string]: boolean | TouchedObj | undefined;
}
export function getIsFormTouched(touchedObj: TouchedObj) {
  let hasTouched = false;
  const getIsTouch = (o: TouchedObj) => {
    for (const key in o) {
      const val = o[key];
      if (typeof val === 'object') {
        getIsTouch(val);
      } else if (val) {
        hasTouched = true;
        return;
      }
    }
  };
  getIsTouch(touchedObj);
  return hasTouched;
}

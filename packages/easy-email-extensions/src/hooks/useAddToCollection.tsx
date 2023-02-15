import { AddToCollection } from '@extensions/components/AddToCollection';
import React, { useMemo, useState } from 'react';

export function useAddToCollection() {
  const [modalVisible, setModalVisible] = useState(false);
  const modal = useMemo(() => <AddToCollection visible={modalVisible} setVisible={setModalVisible} />, [modalVisible]);

  return {
    modal,
    modalVisible,
    setModalVisible
  };
}
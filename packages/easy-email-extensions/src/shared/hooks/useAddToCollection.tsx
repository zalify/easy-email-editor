import { AddToCollection } from '@extensions/shared/components/add-to-collection';
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

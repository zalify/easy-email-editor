import { IEmailTemplate } from '@/typings';
import { useFormikContext } from 'formik';
import { cloneDeep, isEqual } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

const MAX_RECORD_SIZE = 100;

export type RecordStatus = 'add' | 'redo' | 'undo';

export const RecordContext = React.createContext<{
  status: RecordStatus;
  records: Array<IEmailTemplate>;
  redo: () => void;
  undo: () => void;
  reset: () => void;
  redoable: boolean;
  undoable: boolean;
}>({
  status: 'add',
  records: [],
  redo: () => { },
  undo: () => { },
  reset: () => { },
  redoable: false,
  undoable: false,
});

export const RecordProvider: React.FC<{}> = (props) => {
  const formikContext = useFormikContext<IEmailTemplate>();
  const [data, setData] = useState<Array<IEmailTemplate>>([]);
  const [index, setIndex] = useState(-1);
  const [status, setStatus] = useState<RecordStatus>('add');
  const [initialValues, setInitialValues] = useState<IEmailTemplate>(cloneDeep(formikContext.initialValues));

  useEffect(() => {
    setInitialValues(cloneDeep(formikContext.initialValues));
  }, [formikContext.initialValues]);

  const value = useMemo(() => {
    return {
      status,
      records: data,
      redo: () => {
        const nextIndex = Math.min(MAX_RECORD_SIZE - 1, index + 1);
        setIndex(nextIndex);
        setStatus('redo');
        formikContext.setValues(data[nextIndex]);
      },
      undo: () => {
        const prevIndex = Math.max(0, index - 1);
        setIndex(prevIndex);
        setStatus('undo');
        formikContext.setValues(data[prevIndex]);
      },
      reset: () => {
        formikContext.resetForm({ values: initialValues });
      },
      undoable: index > 0,
      redoable: index < data.length - 1,
    };
  }, [data, formikContext, index, initialValues, status]);

  useEffect(() => {
    const currentItem = data[index];
    const isChanged = !(
      currentItem &&
      isEqual(formikContext.values.content, currentItem.content) &&
      formikContext.values.subTitle === currentItem.subTitle &&
      formikContext.values.subTitle === currentItem.subTitle
    );

    if (isChanged) {
      setStatus('add');
      const newData = [...data, cloneDeep(formikContext.values)];
      setData(newData.slice(-MAX_RECORD_SIZE));
      setIndex(Math.max(Math.min(data.length, MAX_RECORD_SIZE - 1), 0));
    }
  }, [data, formikContext, index]);

  return (
    <RecordContext.Provider value={value}>
      {props.children}
    </RecordContext.Provider>
  );
};

import { IEmailTemplate } from '@/typings';
import { useForm, useFormState } from 'react-final-form';
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
  const formState = useFormState<IEmailTemplate>();
  const [data, setData] = useState<Array<IEmailTemplate>>([]);
  const [index, setIndex] = useState(-1);
  const [status, setStatus] = useState<RecordStatus>('add');
  const [initialValues, setInitialValues] = useState<IEmailTemplate>(cloneDeep(formState.initialValues as IEmailTemplate));
  const form = useForm();

  useEffect(() => {
    setInitialValues(cloneDeep(formState.initialValues as IEmailTemplate));
  }, [formState.initialValues]);

  const value = useMemo(() => {
    return {
      status,
      records: data,
      redo: () => {
        const nextIndex = Math.min(MAX_RECORD_SIZE - 1, index + 1);
        setIndex(nextIndex);
        setStatus('redo');
        form.reset(data[nextIndex]);
      },
      undo: () => {
        const prevIndex = Math.max(0, index - 1);
        setIndex(prevIndex);
        setStatus('undo');
        form.reset(data[prevIndex]);
      },
      reset: () => {
        form.reset({ values: initialValues });
      },
      undoable: index > 0,
      redoable: index < data.length - 1,
    };
  }, [data, form, index, initialValues, status]);

  useEffect(() => {
    const currentItem = data[index];
    const isChanged = !(
      currentItem &&
      isEqual(formState.values.content, currentItem.content) &&
      formState.values.subTitle === currentItem.subTitle &&
      formState.values.subTitle === currentItem.subTitle
    );

    if (isChanged) {
      setStatus('add');
      const newData = [...data, cloneDeep(formState.values)];
      setData(newData.slice(-MAX_RECORD_SIZE));
      setIndex(Math.max(Math.min(data.length, MAX_RECORD_SIZE - 1), 0));
    }
  }, [data, formState, index]);

  return (
    <RecordContext.Provider value={value}>
      {props.children}
    </RecordContext.Provider>
  );
};

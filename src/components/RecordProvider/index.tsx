import { useFormikContext } from 'formik';
import { cloneDeep, isEqual } from 'lodash';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { EditorProps } from '../EmailEditorProvider';

const MAX_RECORD_SIZE = 100;

export const RecordContext = React.createContext<{
  records: Array<EditorProps>;
  redo: () => void;
  undo: () => void;
  reset: () => void;
  redoable: boolean;
  undoable: boolean;
}>({
  records: [],
  redo: () => { },
  undo: () => { },
  reset: () => { },
  redoable: false,
  undoable: false
});

export const RecordProvider: React.FC<{}> = (props) => {
  const formikContext = useFormikContext<EditorProps>();
  const { current: initialValues } = useRef<EditorProps>(cloneDeep(formikContext.values));
  const [data, setData] = useState<Array<EditorProps>>([]);
  const [index, setIndex] = useState(0);

  const value = useMemo(() => {
    return {
      records: data,
      redo: () => {
        const nextIndex = Math.min(MAX_RECORD_SIZE - 1, index + 1);
        setIndex(nextIndex);
        formikContext.setValues(data[nextIndex]);
      },
      undo: () => {
        const prevIndex = Math.max(0, index - 1);
        setIndex(prevIndex);
        formikContext.setValues(data[prevIndex]);
      },
      reset: () => {
        formikContext.setValues(initialValues);
      },
      undoable: index > 0,
      redoable: index < data.length - 1,
    };
  }, [data, formikContext, index, initialValues]);

  useEffect(() => {
    const currentItem = data[index];
    const isChanged = !(currentItem && isEqual(formikContext.values.content, currentItem.content) && formikContext.values.subTitle === currentItem.subTitle && formikContext.values.subTitle === currentItem.subTitle);

    if (isChanged) {
      setIndex(Math.max(Math.min(data.length, MAX_RECORD_SIZE), 0));
      setData([...data, cloneDeep(formikContext.values)]);
    }
  }, [data, formikContext, index]);

  return (
    <RecordContext.Provider value={value}>
      {props.children}
    </RecordContext.Provider>
  );
};
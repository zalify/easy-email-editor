import { ShadowDom } from '@/components/UI/ShadowDom';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { useEditorContext } from '@/hooks/useEditorContext';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { Button, Drawer } from 'antd';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { IText } from '.';

const CodeMirrorEditorPromise = import(
  '@/components/EmailEditor/components/CodemirrorEditor'
);
const CodeMirrorEditor = React.lazy(() => CodeMirrorEditorPromise);

export const HtmlEditor: React.FC<{
  visible: boolean;
  setVisible: (v: boolean) => void;
}> = (props) => {
  const { visible, setVisible } = props;

  const { focusBlock, setValueByIdx } = useBlock();
  const { pageData } = useEditorContext();
  const { focusIdx } = useFocusIdx();
  const [content, setContent] = useState(focusBlock?.data.value.content);

  useEffect(() => {
    setContent(focusBlock?.data.value.content);
  }, [focusBlock?.data.value.content]);

  const onClose = () => {
    setVisible(false);
  };

  const onSave = () => {
    if (!focusBlock) return;
    focusBlock.data.value.content = content;
    setValueByIdx(focusIdx, { ...focusBlock });
    onClose();
  };

  const styles = useMemo(() => {
    if (!focusBlock) return {};

    const attributes = focusBlock.attributes as IText['attributes'];
    return {
      color: attributes.color || pageData.data.value['text-color'],
      fontSize: attributes['font-size'] || pageData.data.value['font-size'],
      fontFamily:
        attributes['font-family'] || pageData.data.value['font-family'],
      fontWeight:
        attributes['font-weight'] || pageData.data.value['font-weight'],
      backgroundColor: attributes['container-background-color'],
      padding: attributes.padding,
    };
  }, [focusBlock, pageData.data.value]);

  if (!visible) return null;
  return (
    <Drawer
      title={(
        <Stack distribution='equalSpacing'>
          <TextStyle variation='strong' size='large'>
            Html
          </TextStyle>
          <Stack>
            {/* <Button onClick={onClose}>Cancel</Button> */}
            <Button type='primary' onClick={onSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      )}
      closeIcon={null}
      width='100vw'
      onClose={onClose}
      visible={visible}
      bodyStyle={{ padding: 0, overflow: 'hidden' }}
    >
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flex: 1, height: '100%' }}>
          <Suspense
            fallback={(
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#263238',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: '#fff',
                }}
              >
                Editor Loading...
              </div>
            )}
          >
            <CodeMirrorEditor value={content} onChange={setContent} />
          </Suspense>
        </div>
        <div
          style={{ flex: 1, height: '100%', overflow: 'auto', marginRight: 10 }}
        >
          <ShadowDom
            style={{
              ...styles,
              width: pageData.attributes.width || '600px',
              margin: 'auto',
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </ShadowDom>
        </div>
      </div>
    </Drawer>
  );
};

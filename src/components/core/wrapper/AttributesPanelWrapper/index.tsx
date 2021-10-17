import { useBlock } from '@/hooks/useBlock';
import { findBlockByType } from '@/utils/block';
import { Card } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React, { useCallback, useContext } from 'react';
import { Stack } from '@/components/UI/Stack';
import { BasicType } from '@/constants';
import { TextStyle } from '@/components/UI/TextStyle';
import { MergeTags } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/MergeTags';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export interface AttributesPanelWrapper {
  style?: React.CSSProperties;
  extra?: React.ReactNode;
}
export const AttributesPanelWrapper: React.FC<AttributesPanelWrapper> = (
  props
) => {
  const { focusBlock, setFocusBlock } = useBlock();
  const { mergeTags } = useContext(EditorPropsContext);
  const block = focusBlock && findBlockByType(focusBlock.type);

  const onChangeHidden = useCallback((val: string | boolean) => {
    if (!focusBlock) return;
    focusBlock.data.hidden = val as any;
    setFocusBlock({ ...focusBlock });
  }, [focusBlock, setFocusBlock]);

  if (!focusBlock || !block) return null;

  return (
    <Card title={(
      <Stack vertical spacing="extraTight">
        <Stack spacing="extraTight" alignment="center">
          <EyeIcon />
          <TextStyle>{`${block.name} attributes`}</TextStyle>
        </Stack>
        {/* <MergeTags /> */}
        {Boolean(focusBlock.data.hidden) && mergeTags && (
          <Stack spacing="extraTight">
            <TextStyle>Hide if</TextStyle>
            <MergeTags isSelect onChange={onChangeHidden} value={String(focusBlock.data.hidden)} />
          </Stack>
        )}
      </Stack>
    )} bodyStyle={{ padding: 0 }}
      extra={(
        <>
          {props.extra}
        </>
      )}
    >
      <div style={{ padding: '0px', ...props.style }}>{props.children}</div>
    </Card>
  );
};

function EyeIcon() {
  const { setFocusBlock, focusBlock } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      if (!focusBlock) return null;
      e.stopPropagation();
      setFocusBlock(
        {
          ...focusBlock,
          data: {
            ...focusBlock.data,
            hidden: !focusBlock.data.hidden
          }
        }
      );
    },
    [focusBlock, setFocusBlock]
  );

  if (!focusBlock) return null;

  if (focusBlock.type === BasicType.PAGE) return null;

  return focusBlock.data.hidden ? (
    <EyeInvisibleOutlined onClick={onToggleVisible} />
  ) : (
    <EyeOutlined onClick={onToggleVisible} />
  );
}
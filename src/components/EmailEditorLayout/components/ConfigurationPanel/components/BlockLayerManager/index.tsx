import {
  EyeOutlined,
  EyeInvisibleOutlined,
  RightOutlined,
  DownOutlined,
  CopyOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import React, { useCallback, useMemo, useState } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import {
  findBlockByType,
  getChildIdx,
  getNodeIdxClassName,
  getNodeTypeClassName,
  getPageIdx,
} from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType } from '@/constants';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';
import { useDropBlock } from '@/hooks/useDropBlock';

import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { BlockInteractiveStyle } from '../../../BlockInteractiveStyle';

export function BlockLayerManager() {
  const { setRef } = useDropBlock();
  const { pageData } = useEditorContext();
  return (
    <div ref={setRef}>
      <BlockLayerItem blockData={pageData} idx={getPageIdx()} />
      <BlockInteractiveStyle />
    </div>
  );
}

const BlockLayerItem = ({
  blockData,
  idx,
  indent,
}: {
  blockData: IBlockData;
  idx: string;
  indent?: React.ReactNode;
}) => {
  const { focusIdx } = useBlock();
  const [visible, setVisible] = useState(true);
  const title = findBlockByType(blockData.type)?.name;
  const noChild = blockData.children.length === 0;

  const onToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((v) => !v);
  }, []);

  const subIcon = useMemo(() => {
    if (noChild)
      return (
        <div style={{ visibility: 'hidden' }}>
          <DownOutlined />
        </div>
      );
    if (visible) {
      return <DownOutlined onClick={onToggle} />;
    }
    return <RightOutlined onClick={onToggle} />;
  }, [noChild, onToggle, visible]);

  const listItem = (
    <BlockAvatarWrapper
      key={idx}
      type={blockData.type}
      payload={idx}
      action='move'
    >
      <li
        className={classnames(
          styles.blockItem,
          focusIdx === idx && styles.blockItemSelected,
          'email-block',
          getNodeIdxClassName(idx!),
          getNodeTypeClassName(blockData.type)
        )}
        data-idx={idx}
      >
        <Stack.Item fill>
          <Stack distribution='equalSpacing'>
            <Stack spacing='tight'>
              {indent}
              <EyeIcon idx={idx} blockData={blockData} />
              <TextStyle>{title}</TextStyle>
            </Stack>
            <Stack>
              <ShortcutTool idx={idx} blockData={blockData} />
              {subIcon}
            </Stack>
          </Stack>
        </Stack.Item>
      </li>
    </BlockAvatarWrapper>
  );

  if (noChild) return listItem;
  return (
    <>
      {listItem}
      {visible && (
        <ul className={classnames(styles.blockList)}>
          {blockData.children.map((item, index) => (
            <BlockLayerItem
              key={index}
              indent={(
                <Stack spacing='none'>
                  {indent}
                  <div style={{ width: 16, height: '100%' }} />
                </Stack>
              )}
              blockData={item}
              idx={getChildIdx(idx, index)}
            />
          ))}
        </ul>
      )}
    </>
  );
};

function EyeIcon({ idx, blockData }: { idx: string; blockData: IBlockData; }) {
  const { setValueByIdx } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      blockData.data.hidden = !blockData.data.hidden;
      setValueByIdx(idx, blockData);
    },
    [blockData, idx, setValueByIdx]
  );

  if (blockData.type === BasicType.PAGE) return null;

  return blockData.data.hidden ? (
    <EyeInvisibleOutlined onClick={onToggleVisible} />
  ) : (
    <EyeOutlined onClick={onToggleVisible} />
  );
}

function ShortcutTool({
  idx,
  blockData,
}: {
  idx: string;
  blockData: IBlockData;
}) {
  const { copyBlock, removeBlock } = useBlock();

  const enHanceHandler = useCallback((handler: (...rest: any) => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      handler();
    };
  }, []);

  if (blockData.type === BasicType.PAGE) return null;
  return (
    <div className={styles.shortcutTool}>
      <Stack>
        <CopyOutlined onClickCapture={enHanceHandler(() => copyBlock(idx))} />
        <CloseOutlined
          onClickCapture={enHanceHandler(() => removeBlock(idx))}
        />
      </Stack>
    </div>
  );
}


import { EyeOutlined, EyeInvisibleOutlined, RightOutlined, DownOutlined, CopyOutlined, } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import { findBlockByType, getChildIdx, getNodeIdxFromClassName, getPageIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType, BLOCK_HOVER_CLASSNAME } from '@/constants';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';

export function BlockLayerManager() {

  const { pageData } = useEditorContext();

  return (
    <BlockLayerItem blockData={pageData} idx={getPageIdx()} />

  );
}

const BlockLayerItem = ({ blockData, idx, indent }: { blockData: IBlockData, idx: string; indent?: React.ReactNode; }) => {
  const { setFocusIdx, setHoverIdx, focusIdx } = useBlock();
  const [visible, setVisible] = useState(true);
  const title = findBlockByType(blockData.type)?.name;
  const noChild = blockData.children.length === 0;

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(v => !v);
  };

  const subIcon = useMemo(() => {
    if (noChild) return <div style={{ visibility: 'hidden' }}><DownOutlined /></div>;
    if (visible) {
      return <DownOutlined onClick={onToggle} />;
    }
    return <RightOutlined onClick={onToggle} />;
  }, [noChild, visible]);

  const listItem = (
    <li

      key={idx}

      className={classnames(styles.blockItem, focusIdx === idx && styles.blockItemSelected)}

      onClick={(e) => {
        e.stopPropagation();
        setFocusIdx(idx);
      }}

      onMouseEnter={
        (ev) => {
          ev.stopPropagation();
          setHoverIdx(idx);
          const blockNode = findBlockNodeByIdx(idx);

          if (blockNode) {
            const idx = getNodeIdxFromClassName(blockNode.classList)!;
            setHoverIdx(idx);
            blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
          }
        }
      }

      onMouseLeave={
        (ev) => {
          ev.stopPropagation();
          setHoverIdx('');
          const blockNode = findBlockNodeByIdx(idx);
          if (blockNode) {
            setHoverIdx('');
            blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
          }
        }
      }
    >
      <Stack.Item fill>
        <Stack distribution="equalSpacing">
          <Stack spacing="tight">
            {indent}
            <EyeIcon idx={idx} blockData={blockData} />
            <TextStyle>
              {title}
            </TextStyle>
          </Stack>
          <Stack>
            <ShortcutTool idx={idx} blockData={blockData} />
            {subIcon}
          </Stack>
        </Stack>
      </Stack.Item>
    </li>
  );

  if (noChild) return listItem;
  return (
    <>
      {listItem}
      {
        visible && (
          <ul className={classnames(styles.blockList)}>
            {
              blockData.children.map((item, index) => (
                <BlockLayerItem
                  key={index}
                  indent={(
                    <Stack spacing="none">
                      {indent}<div style={{ width: 16, height: '100%' }} />
                    </Stack>
                  )}
                  blockData={item} idx={getChildIdx(idx, index)}
                />
              ))
            }
          </ul>
        )
      }

    </>

  );
};

function EyeIcon({ idx, blockData }: { idx: string; blockData: IBlockData; }) {
  const { setValueByIdx } = useBlock();
  const onToggleVisible = (e: React.MouseEvent) => {
    e.stopPropagation();
    blockData.data.hidden = !blockData.data.hidden;
    setValueByIdx(idx, blockData);
  };
  if (blockData.type === BasicType.PAGE) return null;
  return blockData.data.hidden ? <EyeInvisibleOutlined onClick={onToggleVisible} /> : <EyeOutlined onClick={onToggleVisible} />;
}

function ShortcutTool({ idx, blockData }: { idx: string; blockData: IBlockData; }) {
  const { copyBlock } = useBlock();

  const enHanceHandler = (handler: (...rest: any) => void) => {

    return (e: React.MouseEvent) => {
      e.stopPropagation();
      handler();
    };
  };
  if (blockData.type === BasicType.PAGE) return null;
  return (
    <Stack>
      <CopyOutlined onClick={enHanceHandler(() => copyBlock(idx))} />
    </Stack>
  );
}
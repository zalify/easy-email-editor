import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IBlockData } from '@/typings';
import { findBlockByType, getPageIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType, BlockType } from '@/constants';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { useCollapse } from '@/hooks/useCollapse';
import { IconFont } from '@/components/IconFont';
import { getIconNameByBlockType } from '@/utils/getIconNameByBlockType';
import { BlocksMap } from '@/components/core/blocks';
import { useHoverIdx } from '@/hooks/useHoverIdx';
import { scrollFocusBlockIntoView } from '@/utils/scrollFocusBlockIntoView';
import { ContextMenu } from '@/components/EmailEditor/components/ContextMenu';

export const BlockLayerItemContent = ({
  blockData,
  idx,
  indent,
  hidden,
  parentType,
  visible,
  setVisible,
}: {
  blockData: IBlockData;
  idx: string;
  indent: number;
  parentType: BlockType | null;
  hidden?: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const title = findBlockByType(blockData.type)?.name;
  const noChild = blockData.children.length === 0;
  const isPageBlock = idx === getPageIdx();
  const { setHoverIdx, hoverIdx, isDragging } = useHoverIdx();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const onSelect = useCallback(() => {
    setFocusIdx(idx);
    scrollFocusBlockIntoView({ idx, inShadowDom: true });
  }, [idx, setFocusIdx]);

  const isSelected = idx === focusIdx;
  const isHover = !isDragging && idx === hoverIdx;

  const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (ev) => {
      if (ref) {
        setHoverIdx(ref.getAttribute('data-idx')!);
      }
    },
    [ref, setHoverIdx]
  );

  const onMouseLeave = useCallback(() => {
    setHoverIdx('');
  }, [setHoverIdx]);

  useEffect(() => {
    if (ref) {
      if (isSelected) {
        ref.classList.add(styles.listItemSelected);
      } else {
        ref.classList.remove(styles.listItemSelected);
      }
    }
  }, [isSelected, ref]);

  useEffect(() => {
    if (ref) {
      if (isHover && !isSelected) {
        ref.classList.add(styles.listItemHover);
      } else {
        ref.classList.remove(styles.listItemHover);
      }
    }
  }, [isHover, isSelected, ref]);

  return useMemo(
    () => (
      <div
        ref={setRef}
        data-idx={idx}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onSelect}
        className={classnames(styles.listItemContentWrapper)}
      >
        <Stack.Item fill>
          <Stack distribution='equalSpacing' alignment='center'>
            <Stack spacing='none' wrap={false}>
              <div style={{ width: indent * 18 }} />
              <Stack.Item fill>
                <div className={styles.listItemContent}>
                  <Stack wrap={false} spacing='tight' alignment='center'>
                    <SubIcon
                      blockType={blockData.type}
                      noChild={noChild}
                      isPageBlock={isPageBlock}
                      visible={visible}
                      setVisible={setVisible}
                    />
                    <Stack spacing='none'>
                      <IconFont
                        iconName={getIconNameByBlockType(blockData.type)}
                        style={{ fontSize: 12 }}
                      />

                      <TextStyle size='smallest'>
                        <span
                          title={title}
                          style={{
                            maxWidth: 100,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'block',
                          }}
                        >
                          {title}
                        </span>
                      </TextStyle>
                    </Stack>
                  </Stack>
                </div>
              </Stack.Item>
            </Stack>
            <Stack spacing='extraTight' wrap={false}>
              {/* <ShortcutTool idx={idx} blockData={blockData} /> */}
              <EyeIcon hidden={hidden} idx={idx} blockData={blockData} />
              <div>
                <IconFont iconName='icon-drag' style={{ cursor: 'grab' }} />
              </div>
            </Stack>
          </Stack>
        </Stack.Item>
        {ref && <ContextMenu ele={ref} idx={idx} />}
      </div>
    ),
    [
      blockData,
      hidden,
      idx,
      indent,
      isPageBlock,
      noChild,
      onMouseEnter,
      onMouseLeave,
      onSelect,
      ref,
      setVisible,
      title,
      visible,
    ]
  );
};

function EyeIcon({
  idx,
  blockData,
  hidden,
}: {
  idx: string;
  blockData: IBlockData;
  hidden?: boolean;
}) {
  const { setValueByIdx } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      blockData.data.hidden = !blockData.data.hidden;
      setValueByIdx(idx, blockData);
    },
    [blockData, idx, setValueByIdx]
  );

  if (hidden)
    return (
      <div style={{ visibility: 'hidden' }}>
        <EyeOutlined />
      </div>
    );
  if (blockData.type === BasicType.PAGE) return null;

  return blockData.data.hidden ? (
    <EyeInvisibleOutlined onClick={onToggleVisible} />
  ) : (
    <EyeOutlined onClick={onToggleVisible} />
  );
}

const SubIcon: React.FC<{
  blockType: BlockType;
  noChild: boolean;
  isPageBlock: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ blockType, noChild, isPageBlock, visible, setVisible }) => {
  const { collapsed, setCollapsed } = useCollapse();

  const onToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isPageBlock) {
        setCollapsed((collapsed) => !collapsed);
      } else {
        setVisible((v) => !v);
      }
    },
    [isPageBlock, setCollapsed, setVisible]
  );

  if (
    noChild ||
    BlocksMap.findBlockByType(blockType).validParentType.includes(
      BasicType.COLUMN
    )
  )
    return <IconFont size={12} iconName='icon-dot' />;

  const display = isPageBlock ? !collapsed : visible;
  if (display) {
    return (
      <IconFont
        size={12}
        iconName='icon-minus-square'
        onClickCapture={onToggle}
      />
    );
  }
  return (
    <IconFont size={12} iconName='icon-plus-square' onClickCapture={onToggle} />
  );
});

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
    <div className={styles.shortcutTool} onClick={(e) => e.stopPropagation()}>
      <Stack spacing='extraTight'>
        <IconFont
          iconName='icon-copy'
          size={12}
          onClickCapture={enHanceHandler(() => copyBlock(idx))}
        />
        <IconFont
          iconName='icon-delete'
          size={12}
          onClickCapture={enHanceHandler(() => removeBlock(idx))}
        />
      </Stack>
    </div>
  );
}

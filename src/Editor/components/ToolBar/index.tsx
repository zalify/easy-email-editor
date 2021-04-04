import React, {
  useMemo
} from 'react';

import { Tooltip } from 'antd';
import { UpOutlined, DownOutlined, UpSquareOutlined, DownSquareOutlined, CopyOutlined, CloseOutlined, BorderOuterOutlined } from '@ant-design/icons';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { findBlockByType, getParentIdx, getSiblingIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';

type SideBarItem = {
  icon: React.ReactNode;
  title: string;
  method: () => void;
  confirm?: boolean;
  toolTip?: React.ReactNode;
};

export const ToolBar = () => {

  const { moveByIdx, focusBlock, copyBlock, removeBlock, focusIdx, setFocusIdx } = useBlock();
  const block = focusBlock && findBlockByType(focusBlock.type);
  const sidebarList = useMemo(() => {
    if (!focusBlock) return [];
    const hasChildren = focusBlock.children.length > 0;
    return [
      {
        icon: <UpOutlined />,
        title: 'Move up',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, -1));
        }
      },
      {
        icon: <DownOutlined />,
        title: 'Move down',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, 1));
        }
      },
      {
        icon: <UpSquareOutlined />,
        title: 'Select parent',
        method() {
          const parentIdx = getParentIdx(focusIdx);
          if (parentIdx) {
            setFocusIdx(parentIdx);
          }

        }
      },
      hasChildren && {
        icon: <DownSquareOutlined />,
        title: 'Select child',
        toolTip: (
          <Stack>            {
            focusBlock.children.map((item, index) => {
              return <Tooltip key={index} placement="topLeft" title={`Select child node ${findBlockByType(item.type)?.name}`}><BorderOuterOutlined onClick={() => setFocusIdx(`${focusIdx}.children.[${index}]`)} /></Tooltip>;
            })
          }
          </Stack>
        ),
        method() { }
      },
      {
        icon: <CopyOutlined />,
        title: 'Copy',
        method() {
          copyBlock(focusIdx);
        }
      },
      {
        icon: <CloseOutlined />,
        title: 'Remove',
        method() {
          removeBlock(focusIdx);
        }
      }
    ].filter(item => !!item) as SideBarItem[];
  }, [copyBlock, focusBlock, focusIdx, moveByIdx, removeBlock, setFocusIdx]);

  return useMemo(() => {
    return (

      <Stack>
        <TextStyle>{block?.name}</TextStyle>
        {
          sidebarList.map(item => {
            return (
              <Tooltip key={item.title} placement="topRight" title={item.toolTip || item.title}>

                <span style={{ cursor: 'pointer' }} onClick={item.method}>{item.icon}</span>
              </Tooltip>
            );
          })
        }
      </Stack>
    );
  }, [block?.name, sidebarList]);
};

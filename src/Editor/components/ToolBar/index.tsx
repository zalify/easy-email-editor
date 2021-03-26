import React, {
  useMemo
} from 'react';

import { Tooltip, Popconfirm } from 'antd';
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
        title: '上移',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, -1));
        }
      },
      {
        icon: <DownOutlined />,
        title: '下移',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, 1));
        }
      },
      {
        icon: <UpSquareOutlined />,
        title: '选中父级',
        method() {
          const parentIdx = getParentIdx(focusIdx);
          if (parentIdx) {
            setFocusIdx(parentIdx);
          }

        }
      },
      hasChildren && {
        icon: <DownSquareOutlined />,
        title: '选中子级',
        toolTip: (
          <Stack>            {
            focusBlock.children.map((item, index) => {
              return <Tooltip key={index} placement="topLeft" title={`选中子节点 ${index + 1}`}><BorderOuterOutlined onClick={() => setFocusIdx(`${focusIdx}.children.[${index}]`)} /></Tooltip>;
            })
          }
          </Stack>
        ),
        method() { }
      },
      {
        icon: <CopyOutlined />,
        title: '复制',
        method() {
          copyBlock(focusIdx);
        }
      },
      {
        icon: <CloseOutlined />,
        title: '删除',
        confirm: true,
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

                {
                  item.confirm
                    ? (
                      <Popconfirm
                        title={`你确定要${item.title}吗`}
                        onConfirm={item.method}
                        okText="确定"
                        cancelText="取消"
                      >
                        {item.icon}
                      </Popconfirm>
                    )
                    : (
                      <span style={{ cursor: 'pointer' }} onClick={item.method}>{item.icon}</span>
                    )
                }

              </Tooltip>
            );
          })
        }
      </Stack>
    );
  }, [block?.name, sidebarList]);
};

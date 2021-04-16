import React, {
  useMemo
} from 'react';

import { Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UpSquareOutlined, DownSquareOutlined, CopyOutlined, CloseOutlined, BorderOuterOutlined, AndroidOutlined } from '@ant-design/icons';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { findBlockByType, getPageIdx, getParentIdx, getSiblingIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType } from '@/constants';

type SideBarItem = {
  icon: React.ReactNode;
  title: string;
  method: () => void;
  confirm?: boolean;
  toolTip?: React.ReactNode;
};

export const BlockToolbar = () => {

  const { moveByIdx, focusBlock, copyBlock, removeBlock, focusIdx, setFocusIdx } = useBlock();
  const block = focusBlock && findBlockByType(focusBlock.type);
  const sidebarList = useMemo(() => {
    if (!focusBlock) return [];
    const hasChildren = focusBlock.children.length > 0;
    const isPage = focusBlock.type === BasicType.PAGE;
    if (isPage) {
      return [
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
      ].filter(Boolean) as SideBarItem[];
    }
    return [
      {
        icon: <ArrowUpOutlined />,
        title: 'Move up',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, -1));
        }
      },
      {
        icon: <ArrowDownOutlined />,
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
        icon: <AndroidOutlined />,
        title: 'Page block',
        method() {
          setFocusIdx(getPageIdx());
        }
      },
      {
        icon: <CloseOutlined />,
        title: 'Remove',
        method() {
          removeBlock(focusIdx);
        }
      }
    ].filter(Boolean) as SideBarItem[];
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

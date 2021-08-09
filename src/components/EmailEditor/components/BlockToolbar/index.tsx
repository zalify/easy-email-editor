import React, { useContext, useMemo, useState } from 'react';

import { Tooltip } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  CopyOutlined,
  CloseOutlined,
  BorderOuterOutlined,
  AndroidOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import {
  findBlockByType,
  getPageIdx,
  getParentIdx,
  getSiblingIdx,
} from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType } from '@/constants';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { Modal } from 'antd';
import { Form } from 'react-final-form';
import { v4 as uuidv4 } from 'uuid';
import { TextAreaField, TextField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

type SideBarItem = {
  icon: React.ReactNode;
  title: string;
  method: () => void;
  confirm?: boolean;
  toolTip?: React.ReactNode;
};

export const BlockToolbar = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { onAddCollection } = useContext(EditorPropsContext);
  const { moveByIdx, focusBlock, copyBlock, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
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
            <Stack>
              {' '}
              {focusBlock.children.map((item, index) => {
                return (
                  <Tooltip
                    key={index}
                    placement='topLeft'
                    title={`Select child node ${findBlockByType(item.type)?.name
                      }`}
                  >
                    <BorderOuterOutlined
                      onClick={() =>
                        setFocusIdx(`${focusIdx}.children.[${index}]`)
                      }
                    />
                  </Tooltip>
                );
              })}
            </Stack>
          ),
          method() { },
        },
      ].filter(Boolean) as SideBarItem[];
    }
    return [
      {
        icon: <AndroidOutlined />,
        title: 'Page block',
        method() {
          setFocusIdx(getPageIdx());
        },
      },
      {
        icon: <UpSquareOutlined />,
        title: 'Select parent',
        method() {
          const parentIdx = getParentIdx(focusIdx);
          if (parentIdx) {
            setFocusIdx(parentIdx);
          }
        },
      },
      {
        icon: <DownSquareOutlined />,
        title: 'Select child',
        toolTip: hasChildren && (
          <Stack>
            {focusBlock.children.map((item, index) => {
              return (
                <Tooltip
                  key={index}
                  placement='topLeft'
                  title={`Select child node ${findBlockByType(item.type)?.name
                    }`}
                >
                  <BorderOuterOutlined
                    onClick={() =>
                      setFocusIdx(`${focusIdx}.children.[${index}]`)
                    }
                  />
                </Tooltip>
              );
            })}
          </Stack>
        ),
        method() { },
      },
      {
        icon: <ArrowUpOutlined />,
        title: 'Move up',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, -1));
        },
      },
      {
        icon: <ArrowDownOutlined />,
        title: 'Move down',
        method() {
          moveByIdx(focusIdx, getSiblingIdx(focusIdx, 1));
        },
      },
      {
        icon: <CopyOutlined />,
        title: 'Copy',
        method() {
          copyBlock(focusIdx);
        },
      },
      {
        icon: <FolderAddOutlined />,
        title: 'Add to collection',
        method() {
          setModalVisible(true);
        },
      },
      {
        icon: <CloseOutlined />,
        title: 'Remove',
        method() {
          removeBlock(focusIdx);
        },
      },
    ].filter(Boolean) as SideBarItem[];
  }, [copyBlock, focusBlock, focusIdx, moveByIdx, removeBlock, setFocusIdx]);

  return useMemo(() => {
    const onSubmit = (values: { label: string; helpText: string; }) => {
      if (!values.label) return;
      const uuid = uuidv4();
      onAddCollection?.({
        label: values.label,
        helpText: values.helpText,
        data: focusBlock!,
        id: uuid,
      });
      setModalVisible(false);
    };

    return (
      <Stack>
        <TextStyle>{block?.name}</TextStyle>
        {sidebarList.map((item) => {
          return (
            <Tooltip
              key={item.title}
              placement='topRight'
              title={item.toolTip || item.title}
            >
              <span style={{ cursor: 'pointer' }} onClick={item.method}>
                {item.icon}
              </span>
            </Tooltip>
          );
        })}
        <Form initialValues={{ label: '', helpText: '' }} onSubmit={onSubmit}>
          {({ handleSubmit }) => (
            <Modal
              zIndex={2000}
              visible={modalVisible}
              title='Add to collection'
              onOk={() => handleSubmit()}
              onCancel={() => setModalVisible(false)}
            >
              <Stack vertical>
                <Stack.Item />
                <TextField
                  label='Title'
                  name='label'
                  validate={(val: string) => {
                    if (!val) return 'Title required!';
                    return undefined;
                  }}
                />
                <TextAreaField label='Description' name='helpText' />
              </Stack>
            </Modal>
          )}
        </Form>
      </Stack>
    );
  }, [block?.name, focusBlock, modalVisible, onAddCollection, sidebarList]);
};

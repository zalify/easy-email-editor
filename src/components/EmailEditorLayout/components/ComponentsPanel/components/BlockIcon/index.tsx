import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { EditorPropsContext } from '@/components/PropsProvider';
import { BlockType } from '@/constants';
import { IBlockData } from '@/typings';
import { classnames } from '@/utils/classnames';
import { Popconfirm, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import styles from './index.module.scss';
import { Help } from '@/components/Help';

type BlockIconProps = {
  id?: string;
  icon?: React.ReactElement;
  text: string;
  helpText?: React.ReactNode;
  type: BlockType;
  payload?: Partial<IBlockData>;
};

export function BlockIcon(props: BlockIconProps) {
  const { onRemoveCollection } = useContext(EditorPropsContext);

  const removeable = Boolean(props.id);

  const onConfirm = () => {
    props.id && onRemoveCollection?.({ id: props.id });
  };

  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
      <div className={styles.baseComponent}>
        {props.icon}
        <h3
          className={classnames(styles.title, !props.icon && styles.largeTitle)}
        >
          {props.text}
          {props.helpText && (
            <>
              &nbsp;
              <Help style={{ fontSize: 12 }} title={props.helpText} />
            </>
          )}
        </h3>
        {removeable && (
          <Popconfirm
            title={`Are you want to remove "${props.text}"`}
            onConfirm={onConfirm}
            okText='Yes'
            cancelText='No'
          >
            <div className={styles.closeBtn}>
              <CloseOutlined style={{ color: '#333' }} />
            </div>
          </Popconfirm>
        )}
      </div>
    </BlockAvatarWrapper>
  );
}

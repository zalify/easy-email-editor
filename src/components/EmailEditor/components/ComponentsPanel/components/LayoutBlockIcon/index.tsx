import { BlockAvatarWrapper } from '@/components/core/wrapper/BlockAvatarWrapper';
import { BlockType } from '@/constants';
import { IBlockData } from '@/typings';
import { classnames } from '@/utils/classnames';
import React from 'react';
import styles from './index.module.scss';
import { Help } from '@/components/UI/Help';
import { TextStyle } from '@/components/UI/TextStyle';

type LayoutBlockIconProps = {
  id?: string;
  icon?: React.ReactElement;
  text: string;
  thumbnail?: string;
  helpText?: React.ReactNode;
  type: BlockType | string;
  payload?: Partial<IBlockData>;
};

export function LayoutBlockIcon(props: LayoutBlockIconProps) {
  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
      <div className={styles.baseComponent}>
        <div className={styles.icon}>{props.icon}</div>
        <h3
          title={props.text}
          className={classnames(styles.title, !props.icon && styles.largeTitle)}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            width: '100%',
            margin: 0,
          }}
        >
          <TextStyle>
            {props.text}
            {props.helpText && (
              <>
                &nbsp;
                <Help style={{ fontSize: 12 }} title={props.helpText} />
              </>
            )}
          </TextStyle>
        </h3>
      </div>
    </BlockAvatarWrapper>
  );
}

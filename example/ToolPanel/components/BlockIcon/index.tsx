import { BlockAvatorWrapper } from '@/components/core/wrapper/BlockAvatorWrapper';
import { BlockType } from '@/constants';
import React, {

} from 'react';
import styles from './index.module.scss';

type BlockIconProps = {
  icon: JSX.Element;
  text: string;
  type: BlockType;
};

export function BlockIcon(props: BlockIconProps) {

  return (
    <BlockAvatorWrapper type={props.type}>
      <div
        className={styles.baseComponent}
      >
        {props.icon}
        <h3 className={styles.title}>{props.text}</h3>
      </div>
    </BlockAvatorWrapper>
  );
}

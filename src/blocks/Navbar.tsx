import { omit } from 'lodash';
import { BasicType } from '@/constants';
import { RecursivePartial } from '@/typings';
import React from 'react';
import { INavbar } from '@/components/core/blocks/basic/Navbar';
import MjmlBlock from '@/components/core/MjmlBlock';

export type NavbarProps = RecursivePartial<INavbar['data']> &
  RecursivePartial<INavbar['attributes']> & {
    children?: JSX.Element | JSX.Element[] | string;
  };

export function Navbar(props: NavbarProps) {
  return (
    <MjmlBlock
      attributes={omit(props, ['data', 'children'])}
      value={props.value}
      type={BasicType.NAVBAR}
    >
      {props.children}
    </MjmlBlock>
  );
}

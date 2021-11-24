import { omit } from 'lodash';
import { BasicType } from '@core/constants';
import { RecursivePartial } from '@core/typings';
import React from 'react';
import { INavbar } from '@core/blocks/Navbar';
import MjmlBlock from '@core/components/MjmlBlock';

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

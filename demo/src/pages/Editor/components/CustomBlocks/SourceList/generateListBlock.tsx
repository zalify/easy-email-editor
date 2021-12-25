import {
  IBlockData,
  components,
  createCustomBlock,
  getNodeIdxClassName,
  getNodeTypeClassName,
} from 'easy-email-core';
import React from 'react';
import { merge, get, flatMap } from 'lodash';
import { classnames } from '@demo/utils/classnames';

const { Column, Section, Wrapper, Text, Button, Image, Raw, Template } =
  components;

export type ISourceList = IBlockData<
  {},
  {
    dataSource: {};
    maxSize: number;
    mockSize: number;
  }
>;

export const generateListBlock = (params: {
  name: string;
  type: string;
  validParentType: string[];
  dataSourceTag: string;
}) => {
  return createCustomBlock<ISourceList>({
    name: params.name,
    type: params.type,
    validParentType: params.validParentType,
    create: (payload) => {
      const defaultData: ISourceList = {
        type: params.type,
        data: {
          value: {
            dataSource: {
              [params.dataSourceTag]: '',
            },
            maxSize: 9999,
            mockSize: 1,
          },
        },
        attributes: {},
        children: [],
      };
      return merge(defaultData, payload);
    },
    render: (data, idx, mode, context, mergeTags) => {
      const listKey = get(data.data.value.dataSource, params.dataSourceTag)
        .replace(/{{([^}}]+)}}/g, '$1')
        .replace(/\.0$/, '');
      const list = Array.isArray(get(mergeTags, listKey) as Array<{}>)
        ? (get(mergeTags, listKey) as Array<{}>)
        : [];
      const renderList = list.slice(0, data.data.value.maxSize);
      const contentWithMergeTags = flatMap(
        renderList.map((listItem, listIndex) => {
          const stringifyWithValue = JSON.stringify(data.children).replace(
            new RegExp(`\\{\\{(\\${params.dataSourceTag}(\.\\w+)+)\\}\\}`, 'g'),
            (item, $1: string) => {
              const replaceKey = $1.replace(
                `${params.dataSourceTag}`,
                `${listKey}.${listIndex}`
              );
              const replaceWithValue = get(mergeTags, replaceKey);
              if (replaceWithValue && typeof replaceWithValue === 'object') {
                return replaceKey;
              }
              return replaceWithValue;
            }
          );

          return JSON.parse(stringifyWithValue);
        })
      );

      if (mode === 'testing') {
        return (
          <Template>
            <Wrapper
              padding={data.children.length > 0 ? '0px' : '20px 20px 20px 20px'}
              css-class={classnames(
                'email-block',
                getNodeIdxClassName(idx!),
                getNodeTypeClassName(data.type)
              )}
            >
              <Template value={{ idx }}>{data.children}</Template>
              <Template>
                {new Array(data.data.value.mockSize - 1)
                  .fill(1)
                  .map((_, index) => {
                    return data.children;
                  })}
              </Template>
            </Wrapper>
          </Template>
        );
      }
      return <Template value={{ idx }}>{contentWithMergeTags}</Template>;
    },
  });
};

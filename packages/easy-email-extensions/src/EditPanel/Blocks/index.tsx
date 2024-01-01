import { Collapse, Space, Typography } from '@arco-design/web-react';
import Collapsible from '@extensions/AttributePanel/components/UI/Collapsible';
import { useExtensionProps } from '@extensions/components/Providers/ExtensionProvider';
import { getIconNameByBlockType } from '@extensions/utils/getIconNameByBlockType';
import {
  BlockStack,
  Box,
  Icon,
  InlineGrid,
  Collapsible as PolarisCollapsible,
} from '@shopify/polaris';
import { ChevronRightMinor, ChevronUpMinor } from '@shopify/polaris-icons';
import { AdvancedType, BlockManager, IBlockData } from 'easy-email-core';
import { BlockAvatarWrapper, IconFont } from 'easy-email-editor';
import React, { useMemo, useState } from 'react';

export function Blocks() {
  const { categories } = useExtensionProps();

  const defaultActiveKey = useMemo(
    () => [...categories.filter(item => item.active).map(item => item.label)],
    [categories],
  );
  return (
    <Collapse
      defaultActiveKey={defaultActiveKey}
      style={{ paddingBottom: 30, minHeight: '100%' }}
    >
      {categories.map((cat, index) => {
        if (cat.displayType === 'column') {
          return (
            <Box
              paddingInline='500'
              key={index}
            >
              <Collapsible title={cat.label}>
                <Space direction='vertical'>
                  <div />
                </Space>
                {cat.blocks.map(item => (
                  <LayoutItem
                    key={item.title}
                    title={item.title || ''}
                    columns={item.payload}
                  />
                ))}

                <Space direction='vertical'>
                  <div />
                </Space>
              </Collapsible>
            </Box>
          );
        }

        // if (cat.displayType === 'custom') {
        //   return (
        //     <Collapse.Item
        //       key={index}
        //       contentStyle={{ padding: 0, paddingBottom: 0, paddingTop: 20 }}
        //       name={cat.label}
        //       header={cat.label}
        //     >
        //       <Grid.Row>
        //         {cat.blocks.map((item, index) => {
        //           return <React.Fragment key={index}>{item}</React.Fragment>;
        //         })}
        //       </Grid.Row>
        //     </Collapse.Item>
        //   );
        // }
        return (
          <Box
            key={index}
            paddingInline='500'
          >
            <Collapsible title={cat.label}>
              <InlineGrid
                columns={3}
                gap='200'
              >
                {cat.blocks.map((item, index) => {
                  return (
                    <BlockItem
                      key={index}
                      {...(item as any)}
                    />
                  );
                })}
              </InlineGrid>
            </Collapsible>
          </Box>
        );
      })}
    </Collapse>
  );
}

function BlockItem({
  type,
  payload,
  title,
  filterType,
}: {
  type: string;
  payload?: Partial<IBlockData>;
  title?: string;
  filterType: string | undefined;
}) {
  const block = BlockManager.getBlockByType(type);

  return (
    <BlockAvatarWrapper
      type={type}
      payload={payload}
    >
      <Box
        width='100%'
        borderWidth='025'
        borderColor='border-brand'
        paddingBlock='200'
      >
        <BlockStack
          inlineAlign='center'
          gap='0'
        >
          <IconFont
            style={{ fontSize: 20 }}
            iconName={getIconNameByBlockType(type)}
          />
          <Typography.Text style={{ marginTop: 10 }}>
            {title || block?.name}
          </Typography.Text>
        </BlockStack>
      </Box>
    </BlockAvatarWrapper>
  );
}

function LayoutItem({ columns, title }: { columns: string[][]; title: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <p
        onClick={() => setVisible(v => !v)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <span>{title}</span>
        {columns.length > 1 && (
          <span>
            {!visible ? (
              <Icon source={ChevronRightMinor} />
            ) : (
              <Icon source={ChevronUpMinor} />
            )}
          </span>
        )}
      </p>
      {columns.map((item, index) => {
        const hide = !visible && index !== 0;
        const payload = {
          type: AdvancedType.SECTION,
          attributes: {},
          children: item.map(col => ({
            type: AdvancedType.COLUMN,
            attributes: {
              width: col,
            },
            data: {
              value: {},
            },
            children: [],
          })),
        };

        return (
          <div
            key={index}
            style={{
              marginBottom: hide ? 0 : 20,
            }}
          >
            <PolarisCollapsible
              open={!hide}
              id='layout-item'
            >
              <BlockAvatarWrapper
                type={AdvancedType.SECTION}
                payload={payload}
              >
                <div
                  style={{
                    border: '1px solid rgb(229, 229, 229)',
                    width: '100%',
                    padding: 10,
                  }}
                >
                  <div
                    style={{
                      height: 16,
                      border: '1px solid rgb(85, 85, 85)',
                      borderRadius: 3,
                      display: 'flex',
                    }}
                  >
                    {item.map((column, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            borderRight:
                              index === item.length - 1
                                ? undefined
                                : '1px solid rgb(85, 85, 85)',
                            height: '100%',
                            width: column,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </BlockAvatarWrapper>
            </PolarisCollapsible>
          </div>
        );
      })}
    </div>
  );
}

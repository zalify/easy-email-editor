import { CommercialBanner } from '@/client/components/CommercialBanner';
import {
  useCreateEmailTemplateMutation,
  useDeleteEmailTemplateMutation,
  useGetEmailTemplatesQuery,
} from '@/client/hooks';
import { useShowCommercialEditor } from '@/client/hooks/useShowCommercialEditor';
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Grid,
  Layout,
  Menu,
  Message,
  PageHeader,
  Space,
  Table,
  TableColumnProps,
} from '@arco-design/web-react';
import { IconMoreVertical } from '@arco-design/web-react/icon';
import { EmailTemplate } from '@prisma/client';
import Link from 'next/link';

function Index() {
  const { featureEnabled } = useShowCommercialEditor();
  const { fetching, data, getEmailTemplatesQuery } = useGetEmailTemplatesQuery();

  const { fetching: deleteLoading, deleteEmailTemplateMutation } =
    useDeleteEmailTemplateMutation();

  const { fetching: createFetching, createEmailTemplateMutation } =
    useCreateEmailTemplateMutation();

  const onCreate = async (item: EmailTemplate) => {
    try {
      const data = await createEmailTemplateMutation({
        subject: item.subject + '-Copy',
        thumbnail: item.thumbnail,
        content: item.content as any,
      });
      if (data.id) {
        getEmailTemplatesQuery();
      }
    } catch (error) {
      Message.error(String(error));
    }
  };

  const onDeleteItem = async (id: string) => {
    try {
      await deleteEmailTemplateMutation({ id });
      getEmailTemplatesQuery();
    } catch (error) {}
  };

  const columns: TableColumnProps[] = [
    {
      title: 'Name',
      width: 150,
      render(col, item, index) {
        return (
          <Grid.Row align='center'>
            <Link href={`/emails/editor/${item.id}`}>
              <span
                style={{
                  marginLeft: 8,
                  color: 'rgb(var(--link-6))',
                  cursor: 'pointer',
                }}
              >
                {item.subject}
              </span>
            </Link>
          </Grid.Row>
        );
      },
    },
    {
      title: 'Thumbnail',
      render(col, item, index) {
        return (
          <Grid.Row align='center'>
            <div
              style={{
                width: 64,
                height: 82,
                backgroundImage: `url(${item.thumbnail})`,
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                border: '1px solid #ccc',
              }}
            />
          </Grid.Row>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render(col, item, index) {
        return <div>{new Date(col).toLocaleString()}</div>;
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      render(col, item, index) {
        return <div>{new Date(col).toLocaleString()}</div>;
      },
    },
    {
      title: '',
      render(col, item, index) {
        const droplist = (
          <Menu style={{ width: 120 }}>
            <Menu.Item
              key='Edit'
              style={{ fontSize: 16 }}
            >
              <Link href={`/emails/editor/${item.id}`}>Edit</Link>
            </Menu.Item>
            <Menu.Item
              key='Clone'
              style={{ fontSize: 16 }}
              onClick={() => {
                onCreate(item);
              }}
            >
              Clone
            </Menu.Item>
            <Divider style={{ margin: 0 }} />
            <Menu.Item
              style={{ fontSize: 16, color: 'rgb(var(--danger-7))' }}
              key='Delete'
              onClick={() => {
                onDeleteItem(item.id);
              }}
            >
              Delete
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown
            droplist={droplist}
            trigger='click'
            position='bl'
          >
            <Button icon={<IconMoreVertical style={{ fontSize: 24 }} />}></Button>
          </Dropdown>
        );
      },
    },
  ];

  const list = data || [];

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <CommercialBanner page='HOME' />
      </div>
      <Card>
        <Layout>
          <Layout.Header>
            <PageHeader
              title='Emails'
              extra={
                <Space>
                  <Button
                    status='success'
                    type='primary'
                    href={`/emails/create`}
                  >
                    Create Template
                  </Button>
                  {featureEnabled && (
                    <Button
                      type='primary'
                      href='https://demo.easyemail.pro?utm_source=trypro'
                    >
                      Try commercial version
                    </Button>
                  )}
                </Space>
              }
            />
          </Layout.Header>

          <Layout.Content>
            <Table
              rowKey={record => record.id}
              columns={columns}
              data={list}
              loading={deleteLoading || fetching}
            />
          </Layout.Content>
        </Layout>
      </Card>
    </>
  );
}

export default Index;

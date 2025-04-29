import { Button, Grid, List, Message, Modal, Space } from '@arco-design/web-react';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import iphoneFrame from '@/client/assets/images/iphone.png';
import { IframeComponent } from '@/client/components/IframeComponent';
import mjml from 'mjml-browser';
import { IconDesktop, IconMobile } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import { IEmailTemplate } from 'easy-email-editor';
import { JsonToMjml } from 'easy-email-core';
import { useCreateEmailTemplateMutation } from '@/client/hooks';
import { Liquid } from 'liquidjs';

const grid = '2vw';
const MOBILE_WIDTH = 375;
const MOBILE_Height = 700;

export const EmailPreviewModal: React.FC<{
  children: React.ReactNode;
  item: IEmailTemplate & { thumbnail: string };
  wrapClassName?: string;
}> = ({ children, item, wrapClassName }) => {
  const [isMobile, setIsMobile] = useState(false);

  const [visible, setVisible] = React.useState(false);

  const router = useRouter();

  const { fetching, createEmailTemplateMutation } = useCreateEmailTemplateMutation();

  const onCreate = async () => {
    try {
      const data = await createEmailTemplateMutation({
        subject: item.subject,
        thumbnail: item.thumbnail,
        content: item.content,
      });
      if (data.id) {
        router.replace(`/emails/editor/${data.id}`);
      }
    } catch (error) {
      Message.error(String(error));
    }
  };

  return (
    <>
      <Modal
        alignCenter
        style={{
          minWidth: 800,
          padding: 0,
        }}
        wrapClassName={styles.emailPreviewModal}
        visible={visible}
        okText={'Use Template'}
        cancelText='Cancel'
        onOk={onCreate}
        onCancel={() => setVisible(false)}
        okButtonProps={{ loading: fetching }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Grid.Row justify='center'>
            <Button.Group>
              <Button
                style={{ paddingLeft: grid, paddingRight: grid }}
                type={!isMobile ? 'outline' : 'secondary'}
                onClick={() => setIsMobile(false)}
              >
                <Space>
                  <IconDesktop /> {`Desktop`}
                </Space>
              </Button>
              <Button
                style={{ paddingLeft: grid, paddingRight: grid }}
                type={isMobile ? 'outline' : 'secondary'}
                onClick={() => setIsMobile(true)}
              >
                <Space>
                  <IconMobile />
                  {`Mobile`}
                </Space>
              </Button>
            </Button.Group>
          </Grid.Row>
          <div style={{ position: 'absolute', right: 0 }}></div>
        </div>
        <br />
        <div style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <EmailItem
            item={item}
            isMobile={isMobile}
          />
        </div>
      </Modal>
      <div
        className={wrapClassName}
        onClick={() => setVisible(true)}
      >
        {children}
      </div>
    </>
  );
};

function EmailItem({ item, isMobile }: { item: IEmailTemplate; isMobile: boolean }) {
  const [height, setHeight] = useState(600);

  const [html, setHtml] = useState('');

  useEffect(() => {
    const mjmlStr = JsonToMjml({
      data: item.content,
      mode: 'production',
    });

    const engine = new Liquid();
    const tpl = engine.parse(mjml(mjmlStr).html);

    setHtml(engine.renderSync(tpl, {}));
  }, [item.content]);

  return (
    <List>
      <List.Item>
        <Space>
          <div
            style={{
              width: 80,
              textAlign: 'right',
              color: '#AEAEBD',
            }}
          >
            {`Subject`}
          </div>
          <div>{item.subject}</div>
        </Space>
      </List.Item>
      <List.Item>
        <div
          style={{
            margin: 'auto',
            position: 'relative',
            width: isMobile ? MOBILE_WIDTH : '100%',
            padding: '6px 6.8px 2px 6.8px',
            overflow: 'hidden',
            marginTop: isMobile ? 30 : undefined,
            boxSizing: 'border-box',
          }}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div
            style={{
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              position: 'absolute',
              padding: '6px 6.8px 2px 6.8px',
              backgroundImage: `url(${iphoneFrame.src})`,
              backgroundSize: '100% 100%',
              zIndex: 10,
              pointerEvents: 'none',
              display: isMobile ? undefined : 'none',
              boxSizing: 'border-box',
            }}
          />

          <IframeComponent
            onChangeHeight={setHeight}
            style={{
              height: isMobile ? MOBILE_Height : height,
              width: '100%',
              boxSizing: 'content-box',
              borderRadius: isMobile ? 30 : 0,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: html }}></div>
            <style>{`
                  *::-webkit-scrollbar {
                    -webkit-appearance: none;
                    width: 0px;
                    height: 0px;
                  }
                  `}</style>
          </IframeComponent>
        </div>
      </List.Item>
    </List>
  );
}

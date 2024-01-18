import { Card, Layout, PageHeader, Typography } from '@arco-design/web-react';
import { useRouter } from 'next/router';
import { EmailPreviewModal } from './EmailPreviewModal';
import styles from './index.module.css';
import template1 from './templates/template1.json';
import template2 from './templates/template2.json';
import template4 from './templates/template4.json';
import template5 from './templates/template5.json';
import template6 from './templates/template6.json';
import template7 from './templates/template7.json';
import template8 from './templates/template8.json';

const list = [
  template1,
  template2,
  template4,
  template5,
  template6,
  template7,
  template8,
];

function Index() {
  const router = useRouter();

  return (
    <Card>
      <Layout>
        <Layout.Header>
          <PageHeader
            title='Select a template to start'
            backIcon
            onBack={e => {
              router.push(`/emails`);
            }}
          />
        </Layout.Header>

        <Layout.Content>
          <div className={styles.container}>
            {list.map((item, index) => {
              return (
                <EmailPreviewModal
                  wrapClassName={styles.wrap}
                  key={index}
                  item={item as any}
                >
                  <div
                    className={styles.wrapItem}
                    style={{
                      backgroundImage: `url(${item.thumbnail})`,
                      backgroundSize: '100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'top center',
                    }}
                  >
                    <div className={styles.bottom}>
                      <Typography.Title
                        heading={6}
                        ellipsis={{ wrapper: 'span' }}
                        style={{ marginBottom: 5 }}
                      >
                        {item.subject}
                      </Typography.Title>
                    </div>
                  </div>
                </EmailPreviewModal>
              );
            })}
          </div>
        </Layout.Content>
      </Layout>
    </Card>
  );
}

export default Index;

import { Alert } from '@arco-design/web-react';
import { pushEvent } from '@demo/utils/pushEvent';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

export const CommercialEmailEditorBanner = ({ page }: { page: 'HOME' | 'EDITOR' }) => {
  const [visible, setVisible] = useLocalStorage(
    'commercialEmailEditorBannerVisible',
    true,
  );

  useEffect(() => {
    pushEvent({ event: `Show_Banner_at_${page}` });
  }, [page]);

  if (!visible) return null;
  return (
    <Alert
      onClose={() => setVisible(false)}
      style={{
        alignItems: 'flex-start',
      }}
      banner
      content={
        <div>
          <div>
            Is the current Easy Email not meeting <strong>your requirements</strong>?
            Interested in trying out our more powerful <strong>commercial version</strong>{' '}
            of the email editor?
          </div>
          <div>
            Reach out to us now to learn more details. Contact us at{' '}
            <a
              onClick={() => {
                pushEvent({ event: `Contact_at_${page}` });
              }}
              target='_blank'
              href='mailto:962491243@qq.com'
            >
              <strong>962491243@qq.com</strong>
            </a>
            .
          </div>
        </div>
      }
    ></Alert>
  );
};

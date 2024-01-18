import { useShowCommercialEditor } from '@/client/hooks/useShowCommercialEditor';
import { useShowLiveChat } from '@/client/hooks/useShowLiveChat';
import { pushEvent } from '@/client/utils/pushEvent';
import { Alert } from '@arco-design/web-react';

import React, { useEffect } from 'react';
import { useSessionStorage } from 'react-use';

export const CommercialBanner = ({ page }: { page: 'HOME' | 'EDITOR' }) => {
  const [visible, setVisible] = useSessionStorage(
    'commercialEmailEditorBannerVisible',
    true,
  );

  const { featureEnabled } = useShowCommercialEditor();

  const { showLiveChat } = useShowLiveChat();

  useEffect(() => {
    pushEvent({ event: `Show_Banner_at_${page}` });
  }, [page]);

  if (!visible || !featureEnabled) return null;
  return (
    <Alert
      closable
      onClose={() => setVisible(false)}
      style={{
        alignItems: 'flex-start',
      }}
      banner
      content={
        <div>
          <div>
            Is the current Easy Email not meeting <strong>your requirements</strong>?
            <span>
              {showLiveChat ? (
                <>
                  <a
                    onClick={() => {
                      pushEvent({ event: `view_at_${page}` });
                    }}
                    target='_blank'
                    href='https://www.easyemail.pro?utm_source=easyemail'
                    style={{ fontSize: 16 }}
                  >
                    <strong> Check commercial version</strong>
                  </a>
                </>
              ) : (
                <>
                  &nbsp;Contact us for more information. Email:{' '}
                  <a
                    onClick={() => {
                      pushEvent({ event: `Contact_at_${page}` });
                    }}
                    target='_blank'
                    href='mailto:ch.mao@qq.com'
                    style={{ fontSize: 16 }}
                  >
                    <strong>ch.mao@qq.com</strong>
                  </a>
                  .
                </>
              )}
            </span>
          </div>
        </div>
      }
    ></Alert>
  );
};

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

  const { showLiveChat } = useShowLiveChat();

  useEffect(() => {
    pushEvent({ event: `Show_Banner_at_${page}` });
  }, [page]);

  if (!visible) return null;
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
            Is the current Easy Email not meeting <strong>your requirements</strong> ?
            It's time to try our more powerful commercial version of the email editor.{' '}
            <span>
              {showLiveChat ? (
                <>
                  <a
                    href='#'
                    onClick={() => {
                      pushEvent({ event: `Contact_at_${page}` });
                      (window as any).$crisp?.push(['do', 'chat:open']);
                    }}
                    target='_blank'
                    style={{ fontSize: 16 }}
                  >
                    <strong>Open Live Chat</strong>
                  </a>
                </>
              ) : (
                <>
                  Contact us for more information. Email:{' '}
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

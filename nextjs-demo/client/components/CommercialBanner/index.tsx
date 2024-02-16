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
            <strong>
              Celebrate the Spring Festival with us! Business Edition Email Editor on sale
              - Enjoy 50% off Premium and Enterprise plans. Don't miss out on this
              limited-time offer!&nbsp;
              <a
                onClick={() => {
                  pushEvent({ event: `view_at_${page}` });
                }}
                target='_blank'
                href='https://www.easyemail.pro?utm_source=easyemail'
                style={{ fontSize: 16 }}
              >
                Get Started Now!
              </a>
            </strong>
          </div>
        </div>
      }
    ></Alert>
  );
};

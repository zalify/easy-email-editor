import { posthog } from '@demo/utils/posthog';
import { useEffect, useState } from 'react';

export const useShowLiveChat = () => {
  const [featureEnabled, setFeatureEnabled] = useState(false);

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      console.log('posthog.show_live_chat', posthog.isFeatureEnabled('show_live_chat'));
      if (posthog.isFeatureEnabled('show_live_chat')) {
        setFeatureEnabled(true);
      }
    });
  }, []);

  return { showLiveChat: featureEnabled };
};

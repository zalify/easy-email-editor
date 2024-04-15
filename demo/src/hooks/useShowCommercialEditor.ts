import { posthog } from '@demo/utils/posthog';
import { useEffect, useState } from 'react';

export const useShowCommercialEditor = () => {
  const [featureEnabled, setFeatureEnabled] = useState(false);

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      console.log(
        'posthog.show_advanced_editor',
        posthog.isFeatureEnabled('show_advanced_editor'),
      );
      if (posthog.isFeatureEnabled('show_advanced_editor')) {
        setFeatureEnabled(true);
      }
    });
  }, []);

  return { featureEnabled: featureEnabled || process.env.NODE_ENV === 'development' };
};

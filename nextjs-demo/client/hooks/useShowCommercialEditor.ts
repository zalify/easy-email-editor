import { useEffect, useState } from 'react';
import { posthog } from '../utils/posthog';

export const useShowCommercialEditor = () => {
  const [featureEnabled, setFeatureEnabled] = useState(false);

  useEffect(() => {
    posthog.onFeatureFlags(function () {
      if (posthog.isFeatureEnabled('show_advanced_editor')) {
        setFeatureEnabled(true);
      }
    });
  }, []);

  return { featureEnabled: featureEnabled || process.env.NODE_ENV === 'development' };
};

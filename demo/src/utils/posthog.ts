import posthog from 'posthog-js';
import { isDevelopment } from './isDevelopment';

if (!isDevelopment) {
  posthog.init('phc_RSmDefyNq21bbg6QZ4GzxfkbF5Aso1YqG5yUQvPaxBV', {
    api_host: 'https://app.posthog.com',
    session_recording: {},
  });
}

export { posthog };

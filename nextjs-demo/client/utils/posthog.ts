import posthog from 'posthog-js';
import { isDevelopment } from './isDevelopment';

if (!isDevelopment) {
  posthog.init('phc_Yn1dsJedTJquMn5XSDrahqAn0etHoRbUMoUP3y0GumU', {
    api_host: 'https://app.posthog.com',
    session_recording: {},
  });
}

export { posthog };

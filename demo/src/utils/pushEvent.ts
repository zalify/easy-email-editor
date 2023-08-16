import posthog from 'posthog-js';

posthog.init('phc_RSmDefyNq21bbg6QZ4GzxfkbF5Aso1YqG5yUQvPaxBV', {
  api_host: 'https://app.posthog.com',
});

export function pushEvent(params: { event: string; payload?: Record<string, any> }) {
  const dataLayer = (window as any).dataLayer as any[];
  if (!dataLayer) return;

  dataLayer.push({
    event: params.event,
    payload: params.payload,
  });
  posthog.capture(params.event, params.payload);
}

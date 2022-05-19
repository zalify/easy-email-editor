export function pushEvent(params: {
  name: string;
  action?: string;
  payload?: Record<string, any>;
}) {
  (window as any).gtag &&
    (window as any).gtag('event', 'custom', {
      name: params.name,
      payload: params.payload,
    });
}

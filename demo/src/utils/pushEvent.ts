export function pushEvent(params: {
  name: string;
  action?: string;
  payload?: Record<string, any>;
}) {
  const gtag = (window as any).gtag;
  if (!gtag) return;

  gtag('event', 'custom', {
    name: params.name,
    payload: params.payload,
  });

  gtag('event', params.name, {
    name: params.name,
    payload: params.payload,
  });
}

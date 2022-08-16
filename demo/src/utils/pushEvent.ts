export function pushEvent(params: {
  event: string;
  payload?: Record<string, any>;
}) {
  const dataLayer = (window as any).dataLayer as any[];
  if (!dataLayer) return;

  dataLayer.push({
    event: params.event,
    payload: params.payload,
  });
}

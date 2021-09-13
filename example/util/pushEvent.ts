/* eslint-disable @typescript-eslint/no-unsafe-call */
export function pushEvent(params: {
  page?: string;
  action?: string;
  name: string;
  label?: string;
}) {
  (window as any)._czc &&
    (window as any)._czc.push([
      '_trackEvent',
      params.page || 'common',
      params.action || 'click',
      params.name || '',
      params.label || 1,
    ]);
}

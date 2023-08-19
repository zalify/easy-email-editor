import { Message } from '@arco-design/web-react';
import { saveAs } from 'file-saver';
import mjml from 'mjml-browser';

import { JsonToMjml } from '../../../packages/easy-email-core/src/utils';
import { IEmailTemplate } from '../../../packages/easy-email-editor/src/typings';
import { pushEvent } from './pushEvent';

export const onExportMJML = (values: IEmailTemplate, mergeTags: Record<string, any>) => {
  const mjmlString = JsonToMjml({
    data: values.content,
    mode: 'production',
    context: values.content,
    dataSource: mergeTags,
  });

  pushEvent({ event: 'MJMLExport', payload: { values, mergeTags } });
  navigator.clipboard.writeText(mjmlString);
  saveAs(new Blob([mjmlString], { type: 'text/mjml' }), 'easy-email.mjml');

  return mjmlString;
};

export const onExportHTML = (values: IEmailTemplate, mergeTags: Record<string, any>) => {
  const mjmlString = JsonToMjml({
    data: values.content,
    mode: 'production',
    context: values.content,
    dataSource: mergeTags,
  });

  const html = mjml(mjmlString, {}).html;

  pushEvent({ event: 'HTMLExport', payload: { values, mergeTags } });
  navigator.clipboard.writeText(html);

  saveAs(new Blob([html], { type: 'text/html' }), 'easy-email.html');

  return html;
};

export const onExportJSON = (values: IEmailTemplate) => {
  navigator.clipboard.writeText(JSON.stringify(values, null, 2));

  return values;
};

export const onExportImage = async (values: IEmailTemplate, mergeTags: Record<string, any>) => {
  Message.loading('Loading...',);
  const html2canvas = (await import('html2canvas')).default;
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  const mjmlString = JsonToMjml({
    data: values.content,
    mode: 'production',
    context: values.content,
    dataSource: mergeTags,
  });

  const html = mjml(mjmlString, {}).html;

  container.innerHTML = html;
  document.body.appendChild(container);

  const blob = await new Promise<any>(resolve => {
    html2canvas(container, { useCORS: true }).then(canvas => {
      return canvas.toBlob(resolve, 'png', 0.1);
    });
  });

  Message.clear();
  saveAs(blob, 'demo.png');
  return blob;
};
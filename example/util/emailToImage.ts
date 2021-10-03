import { transformToMjml, IBlockData } from 'easy-email-editor';
import html2canvas from 'html2canvas';
import services from '@example/services';
window.html2canvas = html2canvas;
export async function emailToImage(content: IBlockData) {
  const mjml = (await import('mjml-browser')).default;
  const html2canvas = (await import('html2canvas')).default;
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.innerHTML = mjml(
    transformToMjml({
      data: content,
      mode: 'production',
      context: content,
    }),
    {
      beautify: true,
      validationLevel: 'soft',
    }
  ).html;
  document.body.appendChild(container);

  const blob = await new Promise<any>((resolve) => {
    html2canvas(container, { useCORS: true }).then((canvas) =>
      canvas.toBlob(resolve, 'png', 0.1)
    );
  });

  document.body.removeChild(container);

  const picture = await services.common.uploadByQiniu(blob);
  return picture;
}

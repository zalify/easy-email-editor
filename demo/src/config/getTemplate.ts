import templates from '@demo/config/templates.json';

export async function getTemplate(id: string | number) {
  const item = templates.find(item => item.article_id === +id);
  if (!item) return null;
  let data: any = null;
  switch (item.path) {
    case 'Arturia - Newsletter.json':
      data = (await import('@demo/templates/Arturia - Newsletter.json')).default;
      break;

    case 'DynamicData.json':
      data = (await import('@demo/templates/DynamicData.json')).default;
      break;

    case 'Food.json':
      data = (await import('@demo/templates/Food.json')).default;
      break;

    case 'MJML Code - Newsletter.json':
      data = (await import('@demo/templates/MJML Code - Newsletter.json')).default;
      break;
  }
  return data;
}

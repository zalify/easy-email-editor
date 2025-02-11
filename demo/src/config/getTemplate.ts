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

    case 'Racoon - Ecommerce.json':
      data = (await import('@demo/templates/Racoon - Ecommerce.json')).default;
      break;

    case 'Real Estate.json':
      data = (await import('@demo/templates/Real Estate.json')).default;
      break;

    case 'Shop - Newsletter.json':
      data = (await import('@demo/templates/Shop - Newsletter.json')).default;
      break;

    case 'Sphero - Newsletter.json':
      data = (await import('@demo/templates/Sphero - Newsletter.json')).default;
      break;

    case 'Star Wars.json':
      data = (await import('@demo/templates/Star Wars.json')).default;
      break;

    case 'Stay Updated On Our Shopping.json':
      data = (await import('@demo/templates/Stay Updated On Our Shopping.json')).default;
      break;

    case 'We Serve Healthy & Delicious Foods.json':
      data = (await import('@demo/templates/We Serve Healthy & Delicious Foods.json'))
        .default;
      break;

    case `St. Patrick's Day - Newsletter.json`:
      data = (await import(`@demo/templates/St. Patrick Day - Newsletter.json`)).default;
      break;
  }
  return data;
}

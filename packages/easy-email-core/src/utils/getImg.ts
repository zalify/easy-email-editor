import { ImageManager } from './ImageManager';

const defaultImagesMap = {
  IMAGE_01:
    'https://assets.maocanhua.cn/ffddc3db-3aae-4d73-ac9c-e1263641f7b4-03c89c34-49a4-4d45-b289-4d2261158cbe.png',
  IMAGE_02:
    'https://assets.maocanhua.cn/acbae5eb-efa4-4eb6-866c-f421e740b713-ad3c92b1-9cdb-4a7b-aad3-75ad809db8a3.png',
  IMAGE_03:
    'https://assets.maocanhua.cn/98520d6c-5cef-449e-bcbf-6316ccec2088-e8780361-0deb-4896-895e-e690c886cdf0.png',
  IMAGE_04:
    'https://assets.maocanhua.cn/b064f705-34ba-4400-975e-9dd0cec21c30-cc9aa158-56bd-4bf1-b532-72390d25c864.png',
};

ImageManager.add(defaultImagesMap);
export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}

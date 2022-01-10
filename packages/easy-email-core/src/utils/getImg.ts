import { ImageManager } from './ImageManager';

const defaultImagesMap = {
  IMAGE_01:
    'https://easy-email-m-ryan.vercel.app/images/ffddc3db-3aae-4d73-ac9c-e1263641f7b4-03c89c34-49a4-4d45-b289-4d2261158cbe.png',
  IMAGE_02:
    'https://easy-email-m-ryan.vercel.app/images/acbae5eb-efa4-4eb6-866c-f421e740b713-ad3c92b1-9cdb-4a7b-aad3-75ad809db8a3.png',
  IMAGE_03:
    'https://easy-email-m-ryan.vercel.app/images/98520d6c-5cef-449e-bcbf-6316ccec2088-e8780361-0deb-4896-895e-e690c886cdf0.png',
  IMAGE_04:
    'https://easy-email-m-ryan.vercel.app/images/b064f705-34ba-4400-975e-9dd0cec21c30-cc9aa158-56bd-4bf1-b532-72390d25c864.png',
  IMAGE_59:
    'https://easy-email-m-ryan.vercel.app/images/8e0e07e2-3f84-4426-84c1-2add355c558b-image.png',
};

ImageManager.add(defaultImagesMap);
export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}

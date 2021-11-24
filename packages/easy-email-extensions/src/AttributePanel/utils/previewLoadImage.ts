
export function previewLoadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.setAttribute('crossOrigin', 'Anonymous');
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
  });
}

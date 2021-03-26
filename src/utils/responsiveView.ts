const PAGE_MAX_WIDTH = 480;
export function responsiveView() {

  function setViewSize() {
    if (window.innerWidth > PAGE_MAX_WIDTH) {
      // document.documentElement.style.fontSize = 100 * 100 * (window.innerWidth / 375) * PAGE_MAX_WIDTH / window.innerWidth + 'vw';
      document.documentElement.style.fontSize = 100 * 100 / 375 * PAGE_MAX_WIDTH + 'vw';
    } else {
      document.documentElement.style.fontSize = 100 * 100 / 375 + 'vw';
    }
    document.documentElement.setAttribute('data-view-size', getViewSizeType());
  }

  setViewSize()
  window.addEventListener('resize', () => {
    setViewSize();
  })
}

export enum ViewSizeType {
  LARGE = 'large',
  NORMAL = 'normal',
  SMALL = 'small',
  XSMALL = 'x-small'
}

export function getViewSizeType() {
  const width = window.innerWidth > PAGE_MAX_WIDTH ? PAGE_MAX_WIDTH : window.innerWidth;
  const scale = window.innerHeight / width;
  const lagre = 2.16; // phoneX 812/375
  const normal = 1.7; //
  const small = 1.6; // iphone7 557/375
  if (scale > lagre) {
    return ViewSizeType.LARGE;
  } else if (scale > normal) {
    return ViewSizeType.NORMAL;
  } else if (scale > small) {
    return ViewSizeType.SMALL;
  } else {
    return ViewSizeType.XSMALL;
  }
}

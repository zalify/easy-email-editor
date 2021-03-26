import { useEffect } from 'react';

const pageWidth = 375;
const pageMaxWidth = 480;

export function useResponsiveSize() {
  // 设置响应式
  useEffect(() => {
    const standard = (100 * 100) / pageWidth;
    if (window.innerWidth > pageMaxWidth) {
      document.documentElement.style.fontSize =
        (standard * pageMaxWidth) / window.innerWidth + 'vw';
    } else {
      document.documentElement.style.fontSize = standard + 'vw';
    }

    return () => {
      document.documentElement.style.fontSize = 'normal';
    };
  }, []);
}

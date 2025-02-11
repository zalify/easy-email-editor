import { useCallback } from 'react';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dwkp0e1yo/image/upload';

export function useUpload() {
  const upload = useCallback(async (file: Blob) => {
    if (!file) {
      throw new Error('Missing file');
    }
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'easy-email-test');

    const res = await axios.post<{ url: string }>(CLOUDINARY_URL, data);
    return res.data.url;
  }, []);

  return {
    upload,
  };
}

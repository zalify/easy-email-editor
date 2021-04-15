import React, { useEffect, useState } from 'react';
import { createQrcode } from '@example/util/utils';
import { Loading } from '../loading';

export function QrCode({ url, logo }: { url: string, logo?: string; }) {

  const [codeImg, setCodeImg] = useState('');
  useEffect(() => {

    const crateCode = async () => {
      const img = await createQrcode(url, logo);
      setCodeImg(img);
    };
    crateCode();
  }, [url, logo]);

  return (
    <Loading loading={!codeImg}>
      <img style={{ height: '100%', width: '100%' }} src={codeImg} />
    </Loading>
  );
}
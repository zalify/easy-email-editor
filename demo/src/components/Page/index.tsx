import React, { useEffect } from 'react';
import { message } from 'antd';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import toast from '@demo/store/common/toast';

export default function Page({ children }: { children: React.ReactNode; }) {
  const errToast = useAppSelector('toast');

  useEffect(() => {
    const current = errToast[0];
    if (current) {
      console.error(current);
      message.error(current.message, current.duration, () => {
        toast.actions.remove(current);
      });
    }
  }, [errToast]);

  return <>{children}</>;
}

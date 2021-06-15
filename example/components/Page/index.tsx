import React, { useEffect } from 'react';
import { message } from 'antd';
import { useAppSelector } from '@example/hooks/useAppSelector';
import toast from '@example/store/common/toast';

export default function Page({ children }: { children: React.ReactNode; }) {
  const errToast = useAppSelector('toast');

  useEffect(() => {
    const current = errToast[0];
    if (current) {
      message.error(current.message, current.duration, () => {
        toast.actions.remove(current);
      });
    }
  }, [errToast]);

  return <>{children}</>;
}

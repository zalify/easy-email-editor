import React, { useEffect } from 'react';
import { Message } from '@arco-design/web-react';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import toast from '@demo/store/common/toast';

export default function Page({ children }: { children: React.ReactNode; }) {
  const errToast = useAppSelector('toast');

  useEffect(() => {
    const current = errToast[0];
    if (current) {
      console.error(current);
      Message.error({
        content: current.message,
        duration: current.duration,
        onClose: () => {
          toast.actions.remove(current);
        },
      });
    }
  }, [errToast]);

  return <>{children}</>;
}

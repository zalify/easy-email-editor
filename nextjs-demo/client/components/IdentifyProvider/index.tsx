import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const IdentifyProvider = () => {
  const { data } = useSession();
  const user = data?.user;

  useEffect(() => {
    const crisp = (window as any).$crisp;
    if (crisp && user) {
      try {
        if (user.email) crisp.push(['set', 'user:email', [user.email]]);
        if (user.name) crisp.push(['set', 'user:nickname', [user.name]]);
      } catch (error) {
        console.error(error);
      }
    }
  }, [user]);

  useEffect(() => {
    const userEmail = user?.email;
    if (userEmail) {
      import('@/client/utils/posthog')
        .then(d => d.posthog)
        .then(posthog => {
          posthog.identify(userEmail, {
            email: user?.name,
          });
        });
    }
  }, [user]);

  return <></>;
};

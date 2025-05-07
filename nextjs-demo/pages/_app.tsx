import { SessionProvider, useSession } from 'next-auth/react';

import './global.less'; // 注意顺序，放后面可能会覆盖组件样式
import '@arco-themes/react-easy-email-theme/css/arco.css';
import type { AppProps } from 'next/app';
import Layout from '../client/components/Layout';
import { useRouter } from 'next/router';
import Script from 'next/script';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { ConfigProvider } from '@arco-design/web-react';
import Head from 'next/head';
import { useEffect } from 'react';
import { IdentifyProvider } from '@/client/components/IdentifyProvider';

const publicPages = ['/login'];

function CustomApp({
  Component,
  pageProps,
}: AppProps & {
  pageProps: any;
  Component: React.FC<any> & {
    hideSidebar?: boolean;
    hideNavbar?: boolean;
    hideLayout?: boolean;
  };
}) {
  const router = useRouter();
  const pathname = router.pathname;

  const isPublicPage = publicPages.includes(pathname);

  return (
    <SessionProvider session={pageProps.session}>
      <IdentifyProvider />
      <Head>
        <meta
          name='google-site-verification'
          content='xcYzldqBuGlnoxha4nizNwbH3m9bEXYJq4_Rk_x3O28'
        />
      </Head>

      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          {Component?.hideLayout ? (
            <Component {...pageProps} />
          ) : (
            <Layout
              hideNavbar={Component.hideNavbar}
              hideSidebar={Component.hideSidebar}
            >
              <Component {...pageProps} />
            </Layout>
          )}
        </>
      )}
      <Script>
        {`
        window.$crisp=[];window.CRISP_WEBSITE_ID="ad250a60-45f2-46a6-ae87-1df4100d6df4";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
        `}
      </Script>
    </SessionProvider>
  );
}

// CustomApp.getInitialProps = async (appContext: AppContext) => {
//   return { props: { ...appContext.Component.getInitialProps } };
// };

export default CustomApp;

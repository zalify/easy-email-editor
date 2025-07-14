import type { AppProps } from 'next/app';
import Head from 'next/head';
import './globals.css';
import { useEffect } from 'react';
import Script from 'next/script';
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('@/utils/posthog').then(d => d.posthog).then(posthog => {});
  }, []);

  return (
    <>
      <Head>
        <title>Easy Email Editor - Visual Email Template Builder</title>
        <meta
          name='description'
          content='A powerful drag-and-drop email editor based on MJML and React. Create responsive email templates easily with our open-source email builder.'
        />

        {/* Open Graph / Facebook */}
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:title'
          content='Easy Email Editor - Visual Email Template Builder'
        />
        <meta
          property='og:description'
          content='Create responsive email templates easily with our drag-and-drop email builder based on MJML and React.'
        />
        <meta
          property='og:site_name'
          content='Easy Email Editor'
        />

        {/* Twitter */}
        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content='Easy Email Editor - Visual Email Template Builder'
        />
        <meta
          name='twitter:description'
          content='Create responsive email templates easily with our drag-and-drop email builder based on MJML and React.'
        />

        {/* Additional SEO tags */}
        <meta
          name='keywords'
          content='email editor, email builder, MJML, React, email template, drag and drop, responsive email'
        />
        <meta
          name='robots'
          content='index, follow'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <meta
          httpEquiv='Content-Type'
          content='text/html; charset=utf-8'
        />
        <link
          rel='canonical'
          href='https://open-source.easyemail.pro'
        />
        <script>
          {`
        window.$crisp=[];window.CRISP_WEBSITE_ID="ad250a60-45f2-46a6-ae87-1df4100d6df4";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
        `}
        </script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

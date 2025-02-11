import React, { useEffect } from 'react';
import styleText from '!!raw-loader!./index.css';
import { getProviders, signIn, ClientSafeProvider, useSession } from 'next-auth/react';

export default function Login() {
  const { data, status } = useSession();

  console.log(status === 'authenticated' && data.user);

  useEffect(() => {
    if (status === 'authenticated' && data.user) {
      window.location.href = '/';
    }
  }, [status]);

  if (status === 'authenticated' && data.user) return null;

  return (
    <>
      <style>{styleText}</style>
      <div
        style={{
          backgroundImage:
            'url(https://assets.maocanhua.cn/b17646b5-4142-4bb5-93e0-e9c00707f89e-image.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% ',
        }}
      >
        <div className='container-login100'>
          <div className='wrap-login100'>
            <form className='login100-form validate-form'>
              <span className='login100-form-title p-b-49'>Login</span>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 50,
                }}
              >
                <a
                  data-type='github'
                  className='login-btn login100-social-item bg1'
                  onClick={() => signIn('github')}
                >
                  <i className='fa fa-github'></i>
                </a>
                <span>&emsp;</span>
                <a
                  onClick={() => signIn('google')}
                  data-type='google'
                  className='login-btn login100-social-item bg3'
                >
                  <i className='fa fa-google'></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

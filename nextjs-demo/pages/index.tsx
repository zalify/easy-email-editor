import dynamic from 'next/dynamic';

const PageComponent = dynamic(
  () => import('@/client/pages/Emails/Templates').then(lib => lib.default) as any,
  { ssr: false },
);

const Index = () => {
  return <PageComponent />;
};

export default Index;

import dynamic from "next/dynamic";

const PageComponent = dynamic(
  () =>
    import("@/client/pages/Emails/Editor").then((lib) => lib.default) as any,
  { ssr: false }
);

const Index = () => {
  return <PageComponent />;
};

Index.hideLayout = true;

export default Index;

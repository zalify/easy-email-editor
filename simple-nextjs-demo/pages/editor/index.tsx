import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Editor = dynamic(() => import('../../components/editor'), {
  ssr: false, // 添加这个选项来禁用服务端渲染
});

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Editor />
    </Suspense>
  );
}

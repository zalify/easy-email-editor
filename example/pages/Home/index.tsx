import { useAppSelector } from '@example/hooks/useAppSelector';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoading } from '@example/hooks/useLoading';
import Frame from '@example/components/Frame';
import templateList from '@example/store/templateList';
import { Button } from 'antd';
import { CardItem } from './components/CardItem';
import { Stack } from '@example/components/Stack';
import { Loading } from '@example/components/loading';

export default function Home() {
  const dispatch = useDispatch();
  const list = useAppSelector('templateList');
  const loading = useLoading(templateList.loadings.fetch);

  useEffect(() => {
    dispatch(templateList.actions.fetch(undefined));
  }, [dispatch]);

  return (
    <Frame
      title='数据模板'
      primaryAction={<Button href='/editor'>新建</Button>}
    >
      <div style={{ minHeight: 400 }}>
        <Loading loading={loading}>
          <Stack>
            {list.map((item) => (
              <CardItem data={item} key={item.article_id} />
            ))}
          </Stack>
        </Loading>
      </div>
    </Frame>
  );
}

import { Picture } from '@example/components/Picture';
import { IArticle } from '@example/services/article';
import React, { useCallback } from 'react';
import {
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { QrCode } from '@example/components/qrcode';
import { Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import template from '@example/store/template';
import { useDispatch } from 'react-redux';
import templateList from '@example/store/templateList';

interface CardItemProps {
  data: IArticle;
}

export function CardItem(props: CardItemProps) {
  const { data } = props;
  const dispatch = useDispatch();

  const onDelete = useCallback(() => {
    dispatch(
      template.actions.removeById({
        id: data.article_id,
        success() {
          dispatch(templateList.actions.fetch(undefined));
        },
      })
    );
  }, [data, dispatch]);

  return (
    <div key={data.article_id} className={styles.templeteItem}>
      <Picture className={styles.previewImg} src={data.picture} />
      <div className={styles.bottom}>
        <div className={styles.title}>标题：{data.title}</div>
        <div className={styles.title}>
          创建时间：{dayjs().format('YYYY-MM-DD')}
        </div>
      </div>
      <div className={styles.mask}>
        <div className={styles.qrcode}>
          <QrCode
            url={`${location.protocol}//${location.host}/template?id=${data.article_id}`}
            logo={'https://assets.maocanhua.cn/FuPYsNk512cqHpUPqGCLdJMflZEz'}
          />
        </div>
        <div className={styles.listBottom}>
          <div className={styles.listItem}>
            <Link to={`/editor?id=${data.article_id}`}>
              <EditOutlined />
              &nbsp;编辑
            </Link>
          </div>
          <div className={styles.listItem}>
            <CopyOutlined />
            &nbsp;复制
          </div>
          <div className={styles.listItem}>
            <Link to={`/template?id=${data.article_id}`} target='_blank'>
              <EyeOutlined />
              &nbsp;预览
            </Link>
          </div>
          <div className={styles.listItem}>
            <Popconfirm
              title='您确定要删除吗?'
              onConfirm={onDelete}
              okText='确定'
              cancelText='取消'
            >
              <DeleteOutlined />
              &nbsp;删除
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
}

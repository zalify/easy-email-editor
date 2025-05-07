import { IArticle } from '@demo/services/article';
import React, { useCallback } from 'react';
import { IconEdit, IconDelete } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { Popconfirm } from '@arco-design/web-react';
import { Link, useHistory } from 'react-router-dom';
import template from '@demo/store/template';
import { useDispatch } from 'react-redux';
import templateList from '@demo/store/templateList';
import { pushEvent } from '@demo/utils/pushEvent';
import { getLoadingByKey, useLoading } from '@demo/hooks/useLoading';
import { Loading } from '@demo/components/loading';

interface CardItemProps {
  data: IArticle;
}

export function CardItem(props: CardItemProps) {
  const { data } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useLoading([
    getLoadingByKey(template.loadings.duplicate, data.article_id),
    getLoadingByKey(template.loadings.removeById, data.article_id),
  ]);

  const onDelete = useCallback(() => {
    dispatch(
      template.actions.removeById({
        id: data.article_id,
        _actionKey: data.article_id,
        success() {
          dispatch(templateList.actions.fetch(undefined));
        },
      })
    );
  }, [data, dispatch]);

  const onDuplicate: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
    (ev) => {
      ev.preventDefault();
      dispatch(
        template.actions.duplicate({
          article: data,
          _actionKey: data.article_id,
          success(id) {
            history.push(`/editor?id=${id}`);
          },
        })
      );
    },
    [data, dispatch, history]
  );

  return (
    <div
      key={data.article_id}
      className={styles.templeteItem}
      style={{ backgroundImage: `url(${data.picture})` }}
    >
      <div className={styles.bottom}>
        <div className={styles.title}>Title: {data.title}</div>
        <div className={styles.title}>
          Date {dayjs(data.created_at * 1000).format('YYYY-MM-DD')}
        </div>
      </div>
      <div className={styles.mask}>
        {loading ? (
          <div className={styles.listBottom}>
            <Loading loading color='#ffffff' />
          </div>
        ) : (
          <div className={styles.listBottom}>
            <div className={styles.listItem}>
              <Popconfirm
                title='Are you want to delete it?'
                onConfirm={onDelete}
                okText='Ok'
                cancelText='Cancel'
              >
                <IconDelete />
                &nbsp;Delete
              </Popconfirm>
            </div>
            <div className={styles.listItem}>
              <Link
                to={`/editor?id=${data.article_id}&userId=${data.user_id}`}
                onClick={() =>
                  pushEvent({
                    event: 'Edit',
                    payload: { article_id: data.article_id, title: data.title },
                  })
                }
              >
                <IconEdit />
                &nbsp;Edit
              </Link>
            </div>
            <div className={styles.listItem}>
              <Link to='javascript:void(0)' onClick={onDuplicate}>
                Duplicate
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

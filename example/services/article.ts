import { request } from './axios.config';
import { IUser } from './user';
import { CATEGORY_ID } from '@example/constants';

export const article = {
  async getArticle(id: number | string): Promise<IArticle> {
    return request.get<IArticle>('/article/user/detail', {
      params: {
        article_id: id,
      },
    });
  },
  async getArticleList(
    page: number,
    size: number,
    categoryId: number = CATEGORY_ID
  ): Promise<ListResponse<IArticle>> {
    return request.get<ListResponse<IArticle>>('/article/user/list', {
      params: {
        page,
        size,
        category_id: categoryId,
      },
    });
  },
  async addArticle(data: {
    title: string;
    content: string;
    picture: string;
    summary: string;
  }): Promise<IArticle> {
    return request.post<IArticle>('/article/user/create-article', {
      ...data,
      category_id: CATEGORY_ID,
      tags: [74],
      secret: 0,
    });
  },
  async updateArticle(
    id: number,
    options: {
      title?: string;
      content?: string;
      picture?: string;
      summary?: string;
    }
  ): Promise<IArticle> {
    return request.post<IArticle>('/article/user/update-article', {
      ...options,
      article_id: id,
      tags: [74],
    });
  },
  async deleteArticle(id: number): Promise<string> {
    return request.get('/article/user/delete', {
      params: {
        article_id: id,
      },
    });
  },
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

interface content {
  article_id: number;
  content: string;
}

export interface IArticle {
  article_id: number;
  writer_id: number;
  category_id: number;
  tags: { tag_id: number }[]; // 由于懒得写接口，这个接口是拿之前的，其实不需要数组
  picture: string;
  writer: IUser;
  title: string;
  summary: string;
  secret: number;
  readcount: number;
  updated_at: number;
  created_at: number;
  level: number;
  content: content;
}

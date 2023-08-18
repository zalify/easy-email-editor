import axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
});

export const request = {
  async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.get<T>(url, config).then((data) => data.data);
  },
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    return axiosInstance.post<T>(url, data, config).then((data) => data.data);
  },
  async put<T>(url: string, data: any, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.put<T>(url, data, config).then((data) => data.data);
  },
  async delete<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.delete<T>(url, config).then((data) => data.data);
  },
};

export const component = {
  async getComponent(id: number | string, userId: number): Promise<IComponent> {
    return request.get<IComponent>('/components/' + id, {
      params: {
        user_id: userId,
      },
    });
  },
  async getTemplateList(): Promise<ITemplate[]> {
    return request.get<Array<ITemplate>>('/templates');
  },
  async getComponentList({
    size,
    page,
    categoryId,
  }: {
    page?: number;
    size?: number;
    categoryId?: string;
  }): Promise<Array<IComponent>> {
    return request.get<Array<IComponent>>('/components', {
      params: {
        page,
        size,
        category_type: categoryId,
      },
    });
  },
  async generateTemplate(data: {
    templateId: string;
    userId: string;
  }): Promise<IComponent> {
    return request.post<IComponent>('/components/user/create-template', {
      ...data,
    });
  },
  async updateTemplate(
    id: number,
    data: {
      templateHtml: any;
      templateMjml: any;
      templateJson: ITemplateJson;
      attributeJson: IAttributeJson;
      categoryId?: string;
      userId: string;
    }
  ): Promise<IComponent> {
    return request.put<IComponent>('/components/user/template/' + id, {
      ...data,
    });
  },
  async deleteTemplate(id: number): Promise<string> {
    return request.delete('/components/user/template/' + id);
  },
};

export interface ListResponse<T> {
  list: T[];
  count: number;
}

export interface ITemplate {
  name: string;
  useCase: string;
  category: string;
  templatehtml?: any;
  templateJson?: ITemplateJson;
  templateMjml?: any;
  imagePreview?: string;
  createdAt: string;
  updatedAt: string;
}

interface IChildrenJson {
  type: string;
  data: {
    value: any;
  },
  attributes: Record<string, string>;
  children: IChildrenJson;
}

interface ITemplateJson {
  tag: string;
  name: string;
  type: string;
  defaultData: {
    type: string;
    data: {
      value: any;
    },
    attributes: Record<string, string>;
    children: IChildrenJson;
  };
  validParentType: Array<string>;
}

interface IAttributeJson {
  component: string;
  label: string;
  name: string;
  attribute: string;
}

export interface IComponent {
  type: string;
  templateJson: ITemplateJson;
  attributeJson: Array<IAttributeJson>;
}

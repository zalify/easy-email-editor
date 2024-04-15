import { EmailTemplate } from '@prisma/client';
import { IEmailTemplate } from 'easy-email-editor';
import { useCallback, useEffect, useState } from 'react';
import { api } from './api';

export const useGetEmailTemplateQuery = ({ id }: { id: string }) => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<EmailTemplate | null>(null);

  const getEmailTemplateQuery = useCallback(
    async (id: string): Promise<EmailTemplate> => {
      setFetching(true);
      try {
        const { data } = await api.get(`/api/email-template/${id}`);
        setData(data);
        setFetching(false);
        return data;
      } catch (error) {
        setFetching(false);
        throw error;
      }
    },
    [],
  );

  useEffect(() => {
    if (!id) return;
    getEmailTemplateQuery(id);
  }, [id]);

  return { fetching: fetching, data: data, getEmailTemplateQuery };
};

export const useGetEmailTemplatesQuery = () => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<EmailTemplate[] | null>(null);

  const getEmailTemplatesQuery = useCallback(async (): Promise<EmailTemplate[]> => {
    setFetching(true);
    try {
      const { data } = await api.get('/api/email-template');
      setData(data);
      setFetching(false);
      return data;
    } catch (error) {
      setFetching(false);
      throw error;
    }
  }, []);

  useEffect(() => {
    getEmailTemplatesQuery();
  }, []);

  return { fetching: fetching, data: data, getEmailTemplatesQuery };
};

export const useDeleteEmailTemplateMutation = () => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<EmailTemplate | null>(null);

  const deleteEmailTemplateMutation = async (payload: {
    id: string;
  }): Promise<string> => {
    setFetching(true);
    try {
      const { data } = await api.delete(`/api/email-template/${payload.id}`);
      setData(data);
      setFetching(false);
      return data;
    } catch (error) {
      setFetching(false);
      throw error;
    }
  };

  return { fetching: fetching, data: data, deleteEmailTemplateMutation };
};

export const useCreateEmailTemplateMutation = () => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<EmailTemplate | null>(null);

  const createEmailTemplateMutation = async (payload: {
    subject: string;
    content: IEmailTemplate['content'];
    thumbnail: string;
  }): Promise<EmailTemplate> => {
    setFetching(true);
    try {
      const { data } = await api.post('/api/email-template', payload);
      setData(data);
      setFetching(false);
      return data;
    } catch (error) {
      setFetching(false);
      throw error;
    }
  };

  return { fetching: fetching, data: data, createEmailTemplateMutation };
};

export const useUpdateEmailTemplateMutation = () => {
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState<EmailTemplate | null>(null);

  const updateEmailTemplateMutation = async (payload: {
    id: string;
    data: {
      subject: string;
      content: IEmailTemplate['content'];
      thumbnail: string;
    };
  }): Promise<EmailTemplate> => {
    setFetching(true);
    try {
      const { data } = await api.patch(`/api/email-template/${payload.id}`, payload.data);
      setData(data);
      setFetching(false);
      return data;
    } catch (error) {
      setFetching(false);
      throw error;
    }
  };

  return { fetching: fetching, data: data, updateEmailTemplateMutation };
};

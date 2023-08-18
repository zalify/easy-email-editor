import { IEmailTemplate } from '@';
import { Button, Card, Divider } from '@arco-design/web-react';
import Meta from '@arco-design/web-react/es/Card/meta';
import { cards } from '@extensions/utils/templates';
import React from 'react';
import { useForm } from 'react-final-form';

export const TemplateUi = () => {
  const form = useForm();

  const onSubmit = (values: IEmailTemplate) => {
    form.restart(values);
  };
  return (
    <>
      {
        cards.map((card: any, index: any) => {
          return (
            <><Card
              hoverable
              key={index}
              style={{ width: 360, padding: '10px' }}
              cover={<div style={{ height: 204, overflow: 'hidden' }}>
                <img
                  style={{ width: '100%', transform: 'translateY(-20px)' }}
                  alt='dessert'
                  src={card.src}
                />
              </div>}
            >
              <Meta
                title={card.title}
                key={index} />
                <br/>
              <Button onClick={() => onSubmit(card.values)}>Use This Template</Button>
            </Card><Divider style={{ border: '5px solid rgb(var(--gray-3))' }} /></>
          );
        })
      }
    </>
  );
};



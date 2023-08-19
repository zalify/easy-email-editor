import { IEmailTemplate } from '../../../packages/easy-email-editor/src/typings';
import { MjmlToJson } from '../../../packages/easy-email-extensions/src/utils/MjmlToJson';
import { Uploader } from './Uploader';

export const onImportMJML = async ({
  restart,
}: {
  restart: (val: IEmailTemplate) => void;
}) => {
  const uploader = new Uploader(() => Promise.resolve(''), {
    accept: 'text/mjml',
    limit: 1,
  });

  const [file] = await uploader.chooseFile();
  const reader = new FileReader();
  const pageData = await new Promise<[string, IEmailTemplate['content']]>(
    (resolve, reject) => {
      reader.onload = function (evt) {
        if (!evt.target) {
          reject();
          return;
        }
        try {
          const pageData = MjmlToJson(evt.target.result as any);
          resolve([file.name, pageData]);
        } catch (error) {
          reject();
        }
      };
      reader.readAsText(file);
    },
  );

  restart({
    subject: pageData[0],
    content: pageData[1],
    subTitle: '',
  });
};

export const onImportJSON = async ({
  restart,
}: {
  restart: (val: IEmailTemplate) => void;
}) => {
  const uploader = new Uploader(() => Promise.resolve(''), {
    accept: 'application/json',
    limit: 1,
  });

  const [file] = await uploader.chooseFile();
  const reader = new FileReader();
  const emailTemplate = await new Promise<IEmailTemplate>((resolve, reject) => {
    reader.onload = function (evt) {
      if (!evt.target) {
        reject();
        return;
      }
      try {
        const template = JSON.parse(evt.target.result as any) as IEmailTemplate;
        resolve(template);
      } catch (error) {
        reject();
      }
    };
    reader.readAsText(file);
  });

  restart({
    subject: emailTemplate.subject,
    content: emailTemplate.content,
    subTitle: emailTemplate.subTitle,
  });
};
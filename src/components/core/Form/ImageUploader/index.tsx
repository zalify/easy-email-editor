import React, { useState, useCallback, useEffect, useRef } from 'react';
import { message, Modal } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { Uploader, UploadItem } from '@/utils/Uploader';
import { useFormikContext, withFormik } from 'formik';
import { uniqueId, isEqual } from 'lodash';
import { classnames } from '@/utils/classnames';

const ERROR_ICON = 'https://assets.maocanhua.cn/FvIaPNdMk32QDYBmaVJF1S6Q0MAW';
const LOADING_ICON = 'https://assets.maocanhua.cn/Fi_vI4vyLhTM-Tp6ivq4dR_ieGHk';

export interface ImageUploaderProps {
  value?: string | string[];
  limit?: number;
  onChange?: (url: string | string[]) => void;
  uploadHandler: (file: File) => Promise<string>;
  multiple?: boolean;
}

function ImageUploader({
  limit = 1,
  onChange,
  uploadHandler,
  multiple,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { values, setFormikState, touched } = useFormikContext<UploadItem[]>();

  const ref = useRef<string[]>([]);

  useEffect(() => {
    const newVals = values.map((item) => item.url).filter((url) => !!url);
    if (!isEqual(ref.current, newVals)) {
      ref.current = newVals;
      if (touched && onChange) {
        if (multiple) {
          onChange(ref.current);
        } else {
          onChange(ref.current[0] || '');
        }
      }
    }
  }, [touched, values, onChange, multiple]);

  const onUpload = () => {
    if (isUploading) {
      return message.warning('正在上传中，请等待上传完成');
    }

    const uploader = new Uploader(uploadHandler, {
      limit,
      accept: 'image/*',
    });

    uploader.on('start', (photos) => {
      setIsUploading(true);
      setFormikState((formikState) => {
        formikState.values = [...formikState.values, ...photos];
        return { ...formikState };
      });

      uploader.on('progress', (photos) => {
        setFormikState((formikState) => {
          formikState.values = formikState.values.map((item) => {
            const photo = photos.find((p) => p.idx === item.idx);
            return photo || item;
          });
          return { ...formikState };
        });
      });

      uploader.on('end', () => {
        setIsUploading(false);
      });
    });

    uploader.chooseFile();
  };

  const onPaste = useCallback(
    async (e: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData = e.clipboardData!;

      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.kind == 'file') {
          const blob = item.getAsFile();

          if (!blob || blob.size === 0) {
            return;
          }
          message.loading('正在上传粘贴图片');
          setIsUploading(true);
          const pastePicture: UploadItem = {
            url: '',
            status: 'pending',
            idx: `paste-${uniqueId()}`,
          };
          setFormikState((formikState) => {
            formikState.values = [...formikState.values, pastePicture];
            return { ...formikState };
          });
          try {
            const url = await uploadHandler(blob);
            setFormikState((formikState) => {
              formikState.values = formikState.values.map((item) => {
                if (pastePicture.idx === item.idx) {
                  return {
                    ...item,
                    url,
                    status: 'done',
                  };
                }
                return item;
              });

              return { ...formikState };
            });
          } catch (error) {
            setFormikState((formikState) => {
              formikState.values = formikState.values.map((item) => {
                if (pastePicture.idx === item.idx) {
                  return {
                    ...item,
                    status: 'error',
                  };
                }
                return item;
              });
              return { ...formikState };
            });
          }
          setIsUploading(false);
          message.destroy();
        }
      }
    },
    [setFormikState, uploadHandler]
  );

  const onRemove = (index: number) => {
    setFormikState((formikState) => {
      formikState.values = values.filter((item, idx) => idx !== index);
      return { ...formikState };
    });
  };

  const showUploader = values.length < limit;

  return (
    <div onPaste={onPaste} className={styles.wrap}>
      <div className={styles['container']}>
        {values.map((item, index) => (
          <ImageUploaderItem
            key={index}
            index={index}
            value={item}
            remove={onRemove}
          />
        ))}
        {showUploader && (
          <div className={styles['upload']} onClick={onUpload}>
            <PlusOutlined />
            <div className='ant-upload-text'>Upload</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ImageUploaderItemProps {
  index: number;
  value: UploadItem;
  remove: (index: number) => void;
}

function ImageUploaderItem(props: ImageUploaderItemProps) {
  const { remove, index, value } = props;

  const [preview, setPreview] = useState(false);

  if (value.status === 'pending') {
    return (
      <div className={styles['item']}>
        <div className={classnames(styles['info'])}>
          <img src={LOADING_ICON} alt='加载中' />
          <div className={styles['btn-wrap']} />
        </div>
      </div>
    );
  } else if (value.status === 'error') {
    return (
      <div className={classnames(styles['item'], styles.error)}>
        <div className={classnames(styles['info'])}>
          <img src={ERROR_ICON} alt='上传失败' />
          <div className={styles['btn-wrap']}>
            <a title='移除' onClick={() => remove(index)}>
              <DeleteOutlined />
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles['item']}>
        <div className={classnames(styles['info'])}>
          <img
            src={value.status === 'done' ? value.url : ERROR_ICON}
            alt='标题图：'
          />
          <div className={styles['btn-wrap']}>
            <a title='预览' onClick={() => setPreview(true)}>
              <EyeOutlined />
            </a>
            <a title='移除' onClick={() => remove(index)}>
              <DeleteOutlined />
            </a>
          </div>
        </div>

        <Modal
          visible={preview}
          footer={null}
          onCancel={() => setPreview(false)}
        >
          <img alt='预览图' style={{ width: '100%' }} src={value.url} />
        </Modal>
      </div>
    );
  }
}

export default withFormik<ImageUploaderProps, UploadItem[]>({
  handleSubmit: () => {},
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const value = props.value
      ? Array.isArray(props.value)
        ? props.value.filter((item) => !!item)
        : [props.value]
      : [];
    return value.map((item) => ({ url: item, status: 'done', idx: '' }));
  },
})(ImageUploader);

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Input, message, Modal } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { Uploader, UploaderServer } from '@/utils/Uploader';
import { classnames } from '@/utils/classnames';
import { previewLoadImage } from '@/utils/previewLoadImage';
const LOADING_ICON = 'https://assets.maocanhua.cn/Fi_vI4vyLhTM-Tp6ivq4dR_ieGHk';

export interface ImageUploaderProps {
  onChange: (val: string) => void;
  value: string;
  label: string;
  uploadHandler?: UploaderServer;
}

export function ImageUploader(props: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(false);
  const uploadHandlerRef = useRef<UploaderServer | null | undefined>(props.uploadHandler);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  useEffect(() => {
    props.onChange(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onUpload = useCallback(() => {
    if (isUploading) {
      return message.warning('Uploading...');
    }
    if (!uploadHandlerRef.current) return;

    const uploader = new Uploader(uploadHandlerRef.current, {
      limit: 1,
      accept: 'image/*',
    });

    uploader.on('start', (photos) => {
      setIsUploading(true);

      uploader.on('end', (data) => {
        const url = data[0]?.url;
        if (url) {
          setValue(url);
        }
        setIsUploading(false);
      });
    });

    uploader.chooseFile();
  }, [isUploading]);

  const onPaste = useCallback(
    async (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!uploadHandlerRef.current) return;
      const clipboardData = e.clipboardData!;

      for (let i = 0; i < clipboardData.items.length; i++) {
        const item = clipboardData.items[i];
        if (item.kind == 'file') {
          const blob = item.getAsFile();

          if (!blob || blob.size === 0) {
            return;
          }
          try {
            setIsUploading(true);
            const picture = await uploadHandlerRef.current(blob);
            await previewLoadImage(picture);
            props.onChange(picture);
            setIsUploading(false);
          } catch (error) {
            setIsUploading(false);
          }
        }
      }
    },
    [props]
  );

  const onRemove = useCallback(() => {
    props.onChange('');
  }, [props]);

  const content = useMemo(() => {
    if (isUploading) {
      return (
        <div className={styles['item']}>
          <div className={classnames(styles['info'])}>
            <img src={LOADING_ICON} alt='Loading...' />
            <div className={styles['btn-wrap']} />
          </div>
        </div>
      );
    }

    if (!props.value) {
      return (
        <div className={styles['upload']} onClick={onUpload}>
          <PlusOutlined />
          <div className='ant-upload-text'>Upload</div>
        </div>
      );
    }

    return (
      <div className={styles['item']}>
        <div className={classnames(styles['info'])}>
          <img
            src={value}
          />
          <div className={styles['btn-wrap']}>
            <a title='Preview' onClick={() => setPreview(true)}>
              <EyeOutlined />
            </a>
            <a title='Remove' onClick={() => onRemove()}>
              <DeleteOutlined />
            </a>
          </div>
        </div>
      </div>
    );

  }, [isUploading, onRemove, onUpload, props.value, value]);

  if (!props.uploadHandler) {
    return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['container']}>
        {content}
        <Input onPaste={onPaste} value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <Modal
        visible={preview}
        footer={null}
        onCancel={() => setPreview(false)}
      >
        <img alt='Preview' style={{ width: '100%' }} src={value} />
      </Modal>
    </div>
  );
}

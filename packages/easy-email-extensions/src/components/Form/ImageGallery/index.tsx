import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Grid,
  Spin,
  Message,
  Button,
  Space,
  Image,
  Popconfirm,
  Pagination,
} from '@arco-design/web-react';
import { IconPlus, IconDelete, IconEye } from '@arco-design/web-react/icon';
import { useEditorProps } from '@jupitermail/easy-email-editor';
import { Uploader, UploaderServer } from '@extensions/AttributePanel/utils/Uploader';
import styles from './index.module.scss';

export interface ImageGalleryProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (imageUrl: string) => void;
}

interface UserImage {
  id: string;
  filename: string;
  blob_link: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

interface ImageGalleryData {
  total_count: number;
  page_number: number;
  page_size: number;
  data: UserImage[];
}

export function ImageGallery({ visible, onClose, onSelect }: ImageGalleryProps) {
  const { onUploadImage, onGetUserImages, onDeleteUserImage } = useEditorProps();
  const [images, setImages] = useState<UserImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  const loadImages = useCallback(
    async (page = 1, pageSize = 12) => {
      if (!onGetUserImages) return;

      try {
        setLoading(true);
        const response: ImageGalleryData = await onGetUserImages(page, pageSize);
        setImages(response.data);
        setPagination(prev => ({
          ...prev,
          current: response.page_number,
          total: response.total_count,
          pageSize: response.page_size,
        }));
      } catch (error) {
        Message.error(t('Failed to load images'));
      } finally {
        setLoading(false);
      }
    },
    [onGetUserImages],
  );

  useEffect(() => {
    if (visible) {
      loadImages(1, pagination.pageSize);
    }
  }, [visible, loadImages, pagination.pageSize]);

  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      loadImages(page, pageSize);
    },
    [loadImages],
  );

  const handleUpload = useCallback(() => {
    if (!onUploadImage) return;

    const uploader = new Uploader(onUploadImage, {
      limit: 1,
      accept: 'image/*',
    });

    uploader.on('start', () => {
      setUploading(true);
    });

    uploader.on('end', async data => {
      const url = data[0]?.url;
      if (url) {
        // Refresh the image list after upload
        await loadImages(1, pagination.pageSize);
      }
      setUploading(false);
    });

    uploader.chooseFile();
  }, [onUploadImage, loadImages, pagination.pageSize]);

  const handleDelete = useCallback(
    async (imageId: string) => {
      if (!onDeleteUserImage) return;

      try {
        const success = await onDeleteUserImage(imageId);
        if (success) {
          // Refresh current page after deletion
          await loadImages(pagination.current, pagination.pageSize);
          Message.success(t('Image deleted successfully'));
        } else {
          Message.error(t('Failed to delete image'));
        }
      } catch (error) {
        Message.error(t('Failed to delete image'));
      }
    },
    [onDeleteUserImage, loadImages, pagination.current, pagination.pageSize],
  );

  const handleSelect = useCallback(
    (imageUrl: string) => {
      onSelect(imageUrl);
      onClose();
    },
    [onSelect, onClose],
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onClose}
        title={t('Image Gallery')}
        style={{ width: 900 }}
        footer={null}
      >
        <div className={styles.galleryContainer}>
          <div className={styles.header}>
            <Space>
              <Button
                type='primary'
                icon={<IconPlus />}
                onClick={handleUpload}
                loading={uploading}
              >
                {t('Upload New Image')}
              </Button>
            </Space>
          </div>

          <div className={styles.content}>
            {loading ? (
              <div className={styles.loading}>
                <Spin size={40} />
                <div>{t('Loading images...')}</div>
              </div>
            ) : images.length === 0 ? (
              <div className={styles.empty}>
                <div>{t('No images uploaded yet')}</div>
                <Button
                  type='primary'
                  loading={uploading}
                  onClick={handleUpload}
                >
                  {t('Upload Your First Image')}
                </Button>
              </div>
            ) : (
              <>
                <Grid.Row gutter={[16, 16]}>
                  {images.map(image => (
                    <Grid.Col
                      span={6}
                      key={image.id}
                    >
                      <div className={styles.imageCard}>
                        <div className={styles.imageWrapper}>
                          <Image
                            src={image.blob_link}
                            alt={image.filename}
                            width='100%'
                            height={160}
                            style={{ objectFit: 'cover' }}
                          />
                          <div className={styles.imageOverlay}>
                            <Space>
                              <Button
                                size='small'
                                icon={<IconEye />}
                                onClick={() => setPreviewImage(image.blob_link)}
                              />
                              <Popconfirm
                                title={t('Are you sure you want to delete this image?')}
                                onOk={() => handleDelete(image.id)}
                              >
                                <Button
                                  size='small'
                                  status='danger'
                                  icon={<IconDelete />}
                                />
                              </Popconfirm>
                            </Space>
                          </div>
                        </div>
                        <div className={styles.imageInfo}>
                          <div className={styles.imageDetails}>
                            <div
                              className={styles.imageName}
                              title={image.filename}
                            >
                              {image.filename}
                            </div>
                            <div className={styles.imageDate}>
                              {formatDate(image.created_at)}
                            </div>
                          </div>
                          <Button
                            size='small'
                            type='primary'
                            onClick={() => handleSelect(image.blob_link)}
                          >
                            {t('Select')}
                          </Button>
                        </div>
                      </div>
                    </Grid.Col>
                  ))}
                </Grid.Row>

                {pagination.total > pagination.pageSize && (
                  <div className={styles.pagination}>
                    <Pagination
                      current={pagination.current}
                      pageSize={pagination.pageSize}
                      total={pagination.total}
                      onChange={handlePageChange}
                      showTotal
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        visible={!!previewImage}
        onCancel={() => setPreviewImage(null)}
        footer={null}
        title={t('Image Preview')}
      >
        {previewImage && (
          <Image
            src={previewImage}
            alt={t('Preview')}
            width='100%'
            style={{ objectFit: 'contain' }}
          />
        )}
      </Modal>
    </>
  );
}

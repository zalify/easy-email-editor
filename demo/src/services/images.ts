import axios from 'axios';

export interface UserImage {
  id: string;
  filename: string;
  blob_link: string;
  file_path: string;
  created_at: string;
  updated_at: string;
}

export interface ImageGalleryResponse {
  total_count: number;
  page_number: number;
  page_size: number;
  data: UserImage[];
}

const API_URL = 'https://jupiter.kianbot.com/api/v1';

const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTIzMjE3NTUsInN1YiI6InRlc3RtYWlsMzgyOEBnbWFpbC5jb20iLCJpYXQiOjE3NTE2MzA1NTUsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJlbWFpbCI6InRlc3RtYWlsMzgyOEBnbWFpbC5jb20iLCJyb2xlX25hbWUiOiJzdXBlcnVzZXIiLCJjb21wYW55X2lkIjoiMGZiNGI0OTAtMWE5OC00ZTYxLWIzNjYtMDAzZjJhMjg1NGM2In0.UPkQgpB1xrgXSZOnTIfiRG5m2IZKn3EY-TVPqvAPMrI',
};
export const images = {
  // Get user's uploaded images with pagination
  async getUserImages(page = 1, pageSize = 12): Promise<ImageGalleryResponse> {
    const response = await axios.get<ImageGalleryResponse>(`${API_URL}/files/list`, {
      params: {
        page_number: page,
        page_size: pageSize,
      },
      headers,
    });
    return response.data;
  },

  // Delete an image
  async deleteImage(imageId: string): Promise<boolean> {
    const response = await axios.delete(`${API_URL}/files/delete/${imageId}`, {
      headers,
    });
    return response.status === 200;
  },

  // Save image metadata after upload
  async uploadImage(data: { file: Blob }): Promise<UserImage> {
    const formData = new FormData();
    formData.append('file', data.file);
    const response = await axios.post<UserImage>(`${API_URL}/files/upload/`, formData, {
      headers,
    });
    return response.data;
  },
};

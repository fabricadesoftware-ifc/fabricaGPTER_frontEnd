import axios from 'axios';

export default class UploaderService {
  async uploadImage(image) {
    const formData = new FormData();
    formData.append('file', image);
    const response = await axios.post('/media/images/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}
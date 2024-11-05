import { defineStore } from 'pinia';

import UploaderService from '@/services/uploader';
const uploaderService = new UploaderService();

export const useUploaderStore = defineStore('uploader', () => {
  async function uploadImage(image) {
    const { attachment_key } = await uploaderService.uploadImage(image);
    return attachment_key;
  }

  return { uploadImage };
});

import api from '@/services/apis/api';
import { PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { useCallback, useEffect, useState } from 'react';

function useImages(initialImageUrls: string[] = []) {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(initialImageUrls);
  const [presignedUrls, setPresignedUrls] = useState<PresignUrlResponse[]>([]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const files = Array.from(event.target.files);

    // 중복 파일 제거
    const filteredFiles = files.filter(
      (file) =>
        !imageFiles.some(
          (item) => item.name === file.name && item.lastModified === file.lastModified
        )
    );
    const newFiles = filteredFiles.slice(0, 3 - imageFiles.length);
    if (newFiles.length === 0) return; // 없으면 종료

    try {
      const newPresignedUrls = await Promise.all(
        newFiles.map((file) => api.register.getPresignUrl({ originalFile: file.name }))
      );
      setImageFiles((prev) => [...prev, ...newFiles]);
      setPresignedUrls((prev) => [...prev, ...newPresignedUrls]);
    } catch (error) {
      console.log('Presigned URL 가져오기 실패:', error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setPresignedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = useCallback(async () => {
    if (!imageFiles.length || !presignedUrls.length) return;

    const formDataArr = imageFiles.map((imageFile, idx) => {
      const formData = new FormData();
      formData.append(imageFile?.name, imageFile);

      return { ...formData, presignedUrl: presignedUrls[idx].preSignedUrl };
    });

    try {
      await Promise.all(
        formDataArr.map((formData) =>
          api.register.uploadImageWithPresignUrl(formData.presignedUrl, formData)
        )
      );
    } catch (err) {
      console.log('s3 이미지 업로드 실패');
    }
  }, [imageFiles, presignedUrls]);

  useEffect(() => {
    if (imageFiles.length) {
      const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(newPreviews);
      uploadImages();
      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url)); // 메모리 해제
      };
    }
  }, [imageFiles, uploadImages]);

  return { imageFiles, imagePreviews, handleFileChange, handleRemoveImage, presignedUrls };
}

export default useImages;

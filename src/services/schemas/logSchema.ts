import { z } from 'zod';

export const PresignUrlSchema = z.object({
  preSignedUrl: z.string(),
  uuid: z.string(),
  originalFile: z.string(),
});

export const PlaceSchema = z.object({
  photos: z.array(PresignUrlSchema).min(1, '사진은 최소 1개 이상이어야 합니다.'),
  placeDescription: z.string().optional(),
});

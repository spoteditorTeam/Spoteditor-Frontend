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

export const ImageSchema = z.object({
  imageId: z.number(),
  originalFile: z.string(),
  storedFile: z.string(),
});

export const LogWriteFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목은 최소 1자 이상 입력해야 합니다.')
    .max(30, '제목은 30자를 초과할 수 없습니다.'),
  description: z
    .string()
    .min(1, '설명은 최소 1자 이상 입력해야 합니다.')
    .max(500, '설명은 500자를 초과할 수 없습니다.'),
  coverImgSrc: PresignUrlSchema,
  places: z.array(PlaceSchema).min(1, '장소는 최소 1개 이상 입력해야 합니다.'),
  status: z.enum(['public', 'private']).optional(),
});

export const LogEditFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목은 최소 1자 이상 입력해야 합니다.')
    .max(30, '제목은 30자를 초과할 수 없습니다.'),
  description: z
    .string()
    .min(1, '설명은 최소 1자 이상 입력해야 합니다.')
    .max(500, '설명은 500자를 초과할 수 없습니다.'),
  coverImgSrc: z.union([PresignUrlSchema, ImageSchema]),
  places: z.record(
    z.object({
      placeId: z.number(),
      placeDescription: z.string().optional(),
      photos: z.array(z.union([ImageSchema, PresignUrlSchema])).default([]),
    })
  ),
  status: z.enum(['public', 'private']).optional(),
});

import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';
import ModifyDrawer from '@/components/Drawer/ModifyDrawer';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LogCoverImgInput from '@/features/registerpage/LogCoverImgInput';
import LogWriteBar from '@/features/registerpage/LogWriteBar';
import PlaceFormItem from '@/features/registerpage/PlaceFormItem';
import api from '@/services/apis/api';
import { Log, Place, PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { useRegisterStore } from '@/store/registerStore';
import { formatAddress } from '@/utils/formatLogForm';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
export interface LogWriteFormData {
  title: string;
  description: string;
  coverImgSrc: PresignUrlResponse | null;
  places: { photos: PresignUrlResponse[] | null; placeDescription?: '' }[];
}

const PlaceSchema = z.object({
  photo: z.array(z.string()).nullable(),
  placeDescription: z.string().optional(),
});

// PresignUrlResponse;
const PresignUrlSchema = z.object({
  preSignedUrl: z.string(),
  uuid: z.string(),
  originalFile: z.string(),
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
  places: PlaceSchema,
});

const LogWritePage = () => {
  const navi = useNavigate();
  // const form = useForm<LogWriteFormData>({
  const form = useForm({
    // resolver: zodResolver(LogWriteFormSchema),
    defaultValues: {
      title: '',
      description: '',
      coverImgSrc: {},
      places: [],
    },
  });

  /* states */
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const resetSelectedPlaces = useRegisterStore((state) => state.resetSelectedPlaces);
  const [sido, , bname] = selectedPlaces[0].address_name.split(' ');
  const [presignedUrlList, setPresignUrlList] = useState<{ [key: string]: PresignUrlResponse[] }>(
    {}
  );
  const [modifyTarget, setModifyTarget] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null); // 선택한 타켓 장소

  /* handlers */
  const handlePostLog = async () => {
    const formatedLog = formatLog(selectedPlaces);
    if (!formatedLog) return;
    const result = await api.register.createLog(formatedLog);
    if (result) {
      resetSelectedPlaces();
      navi(`/log/${result.placeLogId}`, { replace: true });
    }
  };

  // 제출 형식에 맞춰 포맷
  const formatPlace = (place: kakao.maps.services.PlacesSearchResultItem): Place | null => {
    const placeImages = presignedUrlList[place.place_name];
    if (!placeImages || placeImages.length === 0) {
      alert(`${place.place_name} 이미지가 비어있습니다.`);
      return null;
    }

    return {
      name: place.place_name,
      description: textRefs.current[place.id],
      address: formatAddress(place),
      category: 'TOUR',
      originalFiles: presignedUrlList[place.place_name].map((item) => item.originalFile),
      uuids: presignedUrlList[place.place_name].map((item) => item.uuid),
    };
  };
  const formatLog = (places: kakao.maps.services.PlacesSearchResult): Log | null => {
    if (!logTitle || !logDescripTextAreaRef.current?.value || !presignedUrlObj?.originalFile) {
      alert('로그 제목 / 설명 / 커버 이미지를 작성해주세요');
      return null;
    }

    const formattedPlaces = places.map((place) => formatPlace(place));

    if (formattedPlaces.some((place) => place === null)) return null;

    // 로그 정보
    return {
      name: logTitle,
      description: logDescripTextAreaRef.current.value,
      originalFile: presignedUrlObj?.originalFile,
      uuid: presignedUrlObj?.uuid,
      status: 'public',
      tags: [],
      places: formattedPlaces as Place[],
    };
  };

  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <LogWriteBar sido={sido} bname={bname} />

      <Form {...form}>
        <form
          className="flex flex-col items-center grow min-h-0 overflow-y-auto scrollbar-hide "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center w-full border-b px-4 relative">
                <Input
                  {...field}
                  placeholder="제목을 입력해주세요. (최대 30자) *"
                  className=" placeholder:text-primary-300 placeholder:after:content-['*'] font-medium px-0"
                />
                {field.value && (
                  <CircleX
                    className="stroke-white fill-primary-100 absolute stroke-1 top-2 right-4  cursor-pointer hover:fill-slate-50/50"
                    size={24}
                    onClick={() => console.log('모두 비우기')}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 커버 이미지 */}
          <LogCoverImgInput name="coverImgSrc" control={form.control} setValue={form.setValue} />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="px-4 w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm  placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="내용을 입력해주세요. (최대 500자)"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 장소 */}
          <div className="flex flex-col w-full mt-3 px-4">
            {selectedPlaces.map((place, idx) => (
              <PlaceFormItem
                name={`places[${idx}]`}
                control={form.control}
                place={place}
                key={place.id}
                idx={idx + 1}
                setModifyTarget={setModifyTarget}
                setValue={form.setValue}
              />
            ))}
          </div>

          <Button type="submit">Test</Button>
        </form>
      </Form>

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4 ">
        <ModifyDrawer
          isOpen={!!modifyTarget}
          setIsOpen={() => setModifyTarget(null)}
          modifyTarget={modifyTarget}
        />
        <ConfirmDialog
          title="로그를 등록하시겠어요?"
          showCheckbox={true}
          checkboxLabel="비공개"
          onConfirm={handlePostLog}
        />
      </div>
    </div>
  );
};

export default LogWritePage;

import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';
import ModifyDrawer from '@/components/Drawer/ModifyDrawer';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LogCoverImgInput from '@/features/registerpage/LogCoverImgInput';
import LogWriteBar from '@/features/registerpage/LogWriteBar';
import PlaceFormItem from '@/features/registerpage/PlaceFormItem';
import { cn } from '@/lib/utils';
import api from '@/services/apis/api';
import { Log, PresignUrlResponse } from '@/services/apis/types/registerAPI.type';
import { PlaceSchema, PresignUrlSchema } from '@/services/schemas/logSchema';
import { useRegisterStore } from '@/store/registerStore';
import { formatAddress } from '@/utils/formatLogForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

export interface LogWriteFormData {
  title: string;
  description: string;
  coverImgSrc: PresignUrlResponse | null;
  places: { photos: PresignUrlResponse[]; placeDescription?: string }[];
}

export const LogWriteFormSchema = z.object({
  title: z.string().min(1, '제목은 최소 1자 이상 입력해야 합니다.'),
  description: z
    .string()
    .min(1, '설명은 최소 1자 이상 입력해야 합니다.')
    .max(500, '설명은 500자를 초과할 수 없습니다.'),
  coverImgSrc: PresignUrlSchema,
  places: z.array(PlaceSchema).min(1, '장소는 최소 1개 이상 입력해야 합니다.'),
});

const LogWritePage = () => {
  const navi = useNavigate();
  const form = useForm<LogWriteFormData>({
    resolver: zodResolver(LogWriteFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      coverImgSrc: null,
      places: [],
    },
  });

  /* states */
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const resetSelectedPlaces = useRegisterStore((state) => state.resetSelectedPlaces);
  const [sido = '', , bname = ''] = selectedPlaces[0]?.address_name?.split(' ') || [];
  const [modifyTarget, setModifyTarget] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null); // 선택한 타켓 장소

  /* handlers */
  const formatLog = ({ title, description, coverImgSrc, places }: LogWriteFormData): Log => {
    return {
      name: title,
      description: description,
      originalFile: coverImgSrc?.originalFile || '',
      uuid: coverImgSrc?.uuid || '',
      status: 'public',
      tags: [],
      places: places.map((place, idx) => {
        return {
          name: selectedPlaces[idx].place_name,
          description: place.placeDescription || '',
          address: formatAddress(selectedPlaces[idx]),
          category: 'TOUR',
          originalFiles: place?.photos.map((item) => item.originalFile),
          uuids: place?.photos.map((item) => item.uuid),
        };
      }),
    };
  };

  const onSubmit = async (values: LogWriteFormData) => {
    const formatedLog = formatLog(values);
    if (!formatedLog) return;
    const result = await api.register.createLog(formatedLog);
    if (result) {
      resetSelectedPlaces();
      navi(`/log/${result.placeLogId}`, { replace: true });
    }
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
              <FormItem className="flex flex-col items-center w-full border-b px-4 relative">
                <Input
                  {...field}
                  placeholder="제목을 입력해주세요. (최대 30자) *"
                  className={cn(
                    "placeholder:text-primary-300 placeholder:after:content-['*'] font-medium px-0",
                    form.formState.errors.title && 'placeholder:text-error-500'
                  )}
                />
                {field.value && (
                  <CircleX
                    className="stroke-white fill-primary-100 absolute stroke-1 top-2 right-4  cursor-pointer hover:fill-slate-50/50"
                    size={24}
                    onClick={() => form.setValue(field.name, '')}
                  />
                )}
              </FormItem>
            )}
          />

          {/* 커버 이미지 */}
          <LogCoverImgInput
            name="coverImgSrc"
            control={form.control}
            setValue={form.setValue}
            trigger={form.trigger}
          />
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
                control={form.control}
                place={place}
                key={place.id}
                idx={idx}
                setModifyTarget={setModifyTarget}
                setValue={form.setValue}
                trigger={form.trigger}
              />
            ))}
          </div>
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
          onConfirm={form.handleSubmit(onSubmit)}
          disabled={!!Object.keys(form.formState.errors).length}
        />
      </div>
    </div>
  );
};

export default LogWritePage;

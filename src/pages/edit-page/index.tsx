import { ConfirmDialog } from '@/components/Dialog/ConfirmDialog';
import ModifyDrawer from '@/components/Drawer/ModifyDrawer';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LogEditBar from '@/features/edit-page/LogEditBar';
import PlaceEditFormItem from '@/features/edit-page/PlacEditFormItem';
import LogCoverImgInput from '@/features/register-page/LogCoverImgInput';
import OptionEditSection from '@/features/register-page/OptionEditSection';
import useUpdateLogMutation from '@/hooks/mutations/log/useUpdateLogMutation';
import useLog from '@/hooks/queries/log/useLog';
import { cn } from '@/lib/utils';
import {
  Image,
  PresignUrlResponse,
  Tag,
  UpdateRequest,
} from '@/services/apis/types/registerAPI.type';
import { LogEditFormSchema } from '@/services/schemas/logSchema';
import { useEditLogStore } from '@/store/editLogStore';
import { useRegisterStore } from '@/store/registerStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleX } from 'lucide-react';
import { useEffect } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export interface LogEditFormData {
  title: string;
  description: string;
  coverImgSrc: Image | PresignUrlResponse | null;
  places: { [placeName: string]: PlaceItem } | null;
  tags: TagsItem | null;
}

export interface TagsItem {
  defaultTags: string[];
  addTags?: Tag[];
  deleteTags?: Tag[];
}

export interface PlaceItem {
  placeId: number;
  placeDescription?: string;
  photos?: Image[]; // 이미지 관련 정보를 객체로 관리
}

const EditPage = () => {
  const navi = useNavigate();
  const { placeLogId } = useParams();
  const { data: logData, isPending: isLogPending } = useLog(Number(placeLogId));
  const places = useEditLogStore((state) => state.places); // 장소 클라이언트로 관리하기 위해
  const setInitialPlaces = useEditLogStore((state) => state.setInitialPlaces);
  const deletePlaceIds = useEditLogStore((state) => state.deletePlaceIds);
  const setWhom = useRegisterStore((state) => state.setWhom);
  const setMood = useRegisterStore((state) => state.setMood);
  const clearSelections = useRegisterStore((state) => state.clearAllSelections);

  const { mutate } = useUpdateLogMutation();

  const form = useForm<LogEditFormData>({
    resolver: zodResolver(LogEditFormSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      coverImgSrc: null,
      places: {},
      tags: null,
    },
  });

  useEffect(() => {
    if (!isLogPending && logData?.places) {
      setInitialPlaces(logData?.places);
      setWhom(
        logData.tags.filter((item) => item.category === 'WITH_WHOM').map((item) => item.name)
      );
      setMood(logData.tags.filter((item) => item.category === 'MOOD').map((item) => item.name));

      const placesData = logData?.places.reduce((acc, item) => {
        acc[item.name] = {
          placeId: item.placeId,
          placeDescription: item.description || '',
          photos: item.images,
        };
        return acc;
      }, {} as { [placeId: string]: PlaceItem });

      form.reset({
        title: logData?.name,
        description: logData?.description,
        coverImgSrc: logData?.image,
        places: placesData,
        tags: { defaultTags: logData?.tags.map((tag) => tag.name), addTags: [], deleteTags: [] },
      });

      return () => {
        form.reset({
          title: '',
          description: '',
          coverImgSrc: null,
          places: {},
          tags: null,
        });
        setInitialPlaces([]);
        clearSelections();
      };
    }
  }, [isLogPending, logData?.places]);

  const onSubmit = async (values: FieldValues) => {
    const { dirtyFields } = form.formState;
    const numbericPlaceLogId = Number(placeLogId);
    const updateData: UpdateRequest = {};

    if (dirtyFields.title) {
      updateData.name = values.title;
    }
    if (dirtyFields.description) {
      updateData.description = values.description;
    }
    if (dirtyFields.coverImgSrc) {
      const newCover = values.coverImgSrc as PresignUrlResponse;
      updateData.originalFile = newCover?.originalFile;
      updateData.uuid = newCover?.uuid;
    }
    if (dirtyFields.places) {
      const changedPlaces = Object.keys(dirtyFields.places).reduce((acc, placeName) => {
        acc[placeName] = {
          name: placeName,
          ...values.places[placeName],
        };
        return acc;
      }, {} as { [placeName: string]: PlaceItem });

      const updatedPlaces = Object.values(changedPlaces).map((place) => {
        return {
          id: place.placeId, // 해당 장소의 ID
          description: place.placeDescription, // 장소 설명
        };
      });
      if (updatedPlaces.length > 0) updateData.updatePlaces = updatedPlaces;
    }
    if (deletePlaceIds.length > 0) updateData.deletePlaceIds = deletePlaceIds;
    if (dirtyFields.tags) {
      const addTags = form.getValues('tags.addTags');
      const deleteTags = form.getValues('tags.deleteTags');

      if (addTags?.length) updateData.addTags = addTags;
      if (deleteTags?.length) updateData.deleteTags = deleteTags;
    }
    // updateData에 데이터가 있으면 한 번에 API 호출
    if (Object.keys(updateData).length > 0) {
      try {
        await mutate({
          placeLogId: numbericPlaceLogId,
          data: updateData,
        });
      } catch (error) {
        console.error('수정 중 오류 발생:', error);
      }
    }
  };
  return (
    <div className="h-full flex flex-col">
      <LogEditBar logTitle={form.watch('title')} />

      <FormProvider {...form}>
        <form
          className="flex flex-col items-center grow min-h-0 overflow-y-auto scrollbar-hide "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* 로그 제목 */}
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full px-4">
                <Input
                  {...field}
                  placeholder="제목을 입력해주세요. (최대 30자) *"
                  className={cn(
                    "placeholder:text-primary-300 placeholder:after:content-['*'] font-medium px-0 border-b border-gray-100",
                    form.formState.errors.title && 'placeholder:text-error-500'
                  )}
                />
                {field.value && (
                  <CircleX
                    className="h-full stroke-white fill-light-100  stroke-1 top-2  cursor-pointer"
                    size={24}
                    onClick={() => form.setValue(field.name, '')}
                  />
                )}
              </FormItem>
            )}
          />
          {/* 커버 이미지 */}
          <LogCoverImgInput isEditMode />
          {/* 로그 설명 */}
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    variant={'ghost'}
                    size={'lg'}
                    placeholder="내용을 입력해주세요. (최대 500자)"
                    className={cn(
                      form.formState.errors.description && 'placeholder:text-error-500'
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 장소 */}
          <div className="flex flex-col w-full mt-3 px-4">
            {places.map((place, idx) => (
              <PlaceEditFormItem key={place.placeId} place={place} idx={idx} />
            ))}
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-5 grow px-4">
            <OptionEditSection title="누구와" storeKey="selectedWhom" form={form} />
            <OptionEditSection title="하루 스타일" storeKey="selectedMoods" form={form} />
          </div>
        </form>
      </FormProvider>

      {/* 버튼 */}
      <div className="pt-2 pb-3 px-4 ">
        <ModifyDrawer />
        <div className="grid grid-cols-2 gap-2.5">
          <Button variant={'outline'} onClick={() => navi(-1)}>
            취소
          </Button>

          <ConfirmDialog
            title="로그를 등록하시겠어요?"
            showCheckbox={true}
            checkboxLabel="비공개"
            onConfirm={form.handleSubmit(onSubmit)}
            disabled={
              Object.values(form.formState.errors).length > 0 || // 에러가 있을때
              (!form.formState.isDirty && deletePlaceIds.length === 0) // 폼이 변경되지 않았고 삭제된 것이 없을 때
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditPage;

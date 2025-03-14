import { Textarea } from '@/components/ui/textarea';
import { LogWriteFormData } from '@/pages/register/LogWritePage';
import { ChevronRight, Circle, CircleCheck, Clock, MapPin } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import PlaceImagesInput from './PlaceImagesInput';

interface PlaceFormItemProps {
  name: string;
  control: Control<LogWriteFormData>;
  place: kakao.maps.services.PlacesSearchResultItem;
  idx: number;
  setModifyTarget?: Dispatch<SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>>;
  setValue: UseFormSetValue<LogWriteFormData>;
}

const PlaceFormItem = ({
  name,
  place,
  idx,
  setModifyTarget,
  control,
  setValue,
}: PlaceFormItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChecked = () => {
    if (!setModifyTarget) return;
    setIsChecked((prev) => {
      const newChcked = !prev;
      if (newChcked) setModifyTarget(place);
      else setModifyTarget(null);
      return newChcked;
    });
  };

  return (
    <div className="py-[5px]">
      {/* 장소 설명 */}
      <section className="flex flex-col gap-2">
        <div className="text-text-lg font-bold">
          <div className="flex justify-between">
            <p>{String(idx).padStart(2, '0')}</p>
            {isChecked ? (
              <CircleCheck className="fill-black stroke-white" onClick={handleChecked} />
            ) : (
              <Circle className="stroke-neutral-200" onClick={handleChecked} />
            )}
          </div>
          <p className="flex items-center">
            {place.place_name} <ChevronRight className="w-[1.2em] h-[1.2em]" />
          </p>
        </div>

        <div className="flex flex-col text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5">{place.category_group_name}</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">
              {place.road_address_name.split(' ')[0]}
            </p>
            <p>{place.road_address_name}</p>
          </div>
        </div>
      </section>

      {/* 사진 첨부 */}
      <PlaceImagesInput name={`${name}.photos`} control={control} setValue={setValue} />

      {/* 내용 */}
      <Controller
        name={`${name}.placeDescription`}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            value={(field.value as string) ?? ''}
            className="bg-primary-50 min-h-[85px] px-[18px] py-2.5 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="내용을 입력해주세요. (최대 500자)"
          />
        )}
      />
    </div>
  );
};

export default PlaceFormItem;

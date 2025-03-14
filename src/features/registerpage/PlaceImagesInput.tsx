import { CameraIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useImages from '@/hooks/useImages';
import { LogWriteFormData } from '@/pages/register/LogWritePage';
import { Image } from '@/services/apis/types/registerAPI.type';
import { CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
interface PlaceImagesInputProps {
  name: string;
  control: Control<LogWriteFormData>;
  defaultplaceImgs?: Image[];
  setValue: UseFormSetValue<LogWriteFormData>;
}

const PlaceImagesInput = ({ name, control, setValue }: PlaceImagesInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imagePreviews, handleFileChange, handleRemoveImage, isUploading, presignedUrlObjs } =
    useImages();

  useEffect(() => {
    if (presignedUrlObjs) setValue(name, presignedUrlObjs);
  }, [presignedUrlObjs]);

  return (
    <>
      <Button
        variant={'outline'}
        className="border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 mt-[15px] mb-2.5"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <CameraIcon className="stroke-primary-600" />
        <span className="text-text-sm font-bold">
          사진첨부<span className="text-error-600"> * </span>(최대 3장)
        </span>
      </Button>

      <Controller
        name={name} //{`${name}.photo`}
        control={control}
        render={({ field }) => (
          <div className="flex overflow-x-auto mb-2.5">
            {imagePreviews.map((previewURL, idx) => (
              <div className="relative m-1 shrink-0" key={idx}>
                <Input
                  {...field}
                  type="image"
                  src={previewURL}
                  alt="장소 이미지"
                  className="h-[300px] object-cover p-0 "
                />
                <CircleX
                  className="stroke-primary-300 fill-slate-100 stroke-1 absolute top-2 right-2  cursor-pointer hover:fill-slate-50/50"
                  onClick={() => handleRemoveImage(idx)}
                />
              </div>
            ))}

            <Input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                await handleFileChange(e);
                field.onChange(presignedUrlObjs);
              }}
              ref={fileInputRef}
              className="hidden"
              multiple
            />
          </div>
        )}
      />
    </>
  );
};

export default PlaceImagesInput;

import { CameraIcon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import { useRef } from 'react';

interface CoverImageInputProps {
  imagePreview: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleClearImage: () => void;
}

const CoverImageInput = ({
  imagePreview,
  handleFileChange,
  handleClearImage,
}: CoverImageInputProps) => {
  const coverUploadInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      {imagePreview && (
        /* 커버 이미지  */
        <div className="relative mb-3">
          <Input
            type="image"
            src={imagePreview}
            alt="커버 이미지"
            className="w-full aspect-[2/1] p-0 object-cover"
          />
          <CircleX
            className="stroke-primary-100 absolute top-4 right-4 cursor-pointer hover:fill-slate-50/50"
            onClick={handleClearImage}
          />
        </div>
      )}
      {/* 커버 이미지 업로드 버튼 */}
      <div className="px-4 w-full">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={coverUploadInputRef}
          className="hidden"
        />
        <Button
          variant={'outline'}
          className={cn(
            'border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3 my-3',
            imagePreview && 'hidden'
          )}
          onClick={() => coverUploadInputRef.current?.click()}
        >
          <CameraIcon className="stroke-primary-600" />
          <span className="text-text-sm font-bold">
            커버이미지<span className="text-error-600 m-1">*</span>
          </span>
        </Button>
      </div>
    </>
  );
};

export default CoverImageInput;

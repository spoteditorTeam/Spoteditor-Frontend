import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { REGISTER_SEARCH } from '@/constants/pathname';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import useImagePreview from '@/hooks/useImagePreview';
import { cn } from '@/lib/utils';
import { useRegisterStore } from '@/store/registerStore';
import { ArrowLeft, Camera, CircleX } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 스크롤 수정 필요
const DetailsPage = () => {
  const navi = useNavigate();
  const selectedPlaces = useRegisterStore((state) => state.selectedPlaces);
  const { imagePreview, handleFileChange, handleClearImage } = useImagePreview();
  const coverUploadInputRef = useRef<HTMLInputElement>(null);

  const logTitleInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log(isDialogOpen);
  return (
    <div className="h-full flex flex-col">
      <header className="flex items-center py-3 justify-between">
        <div className="flex gap-2.5">
          <ArrowLeft size={24} onClick={() => navi(-1)} className="cursor-pointer" />
          {/* 첫번째 위치한 장소 주소 */}
          <h3 className="text-text-2xl font-bold">서울 · 종로구</h3>
        </div>
        <Button
          variant={'transparent'}
          className="text-primary-300 !text-text-md"
          onClick={() => navi(REGISTER_SEARCH)}
        >
          장소 추가
        </Button>
      </header>
      <main className="flex flex-col items-center grow gap-3 min-h-0 overflow-y-auto scrollbar-hide">
        {/* 로그 제목, 설명 */}
        <Input
          placeholder="제목을 입력해주세요. (최대 30자) *"
          className="border-b px-0 placeholder:text-primary-300 placeholder:after:content-['*'] placeholder:after:text-red-500"
          ref={logTitleInputRef}
        />
        {/* 이미지 보여주기 */}
        {imagePreview && (
          <div className="relative">
            <Input
              id="coverImg"
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
        {/* 파일 입력 */}
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
            'border w-full border-dashed gap-[5px] text-primary-600 px-2.5 py-3',
            imagePreview && 'hidden'
          )}
          onClick={() => coverUploadInputRef.current?.click()}
        >
          <Camera />
          <span className="text-text-sm font-bold">
            커버이미지<span className="text-error-600 m-1">*</span>
          </span>
        </Button>
        <Textarea
          className="bg-primary-50 text-primary-300 text-text-sm placeholder:text-primary-300 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="내용을 입력해주세요. (최대 500자)"
        />
        <div className="flex flex-col w-full">
          {selectedPlaces.map((place, idx) => (
            <PlaceDetailFormItem place={place} key={place.id} idx={idx + 1} />
          ))}
        </div>
      </main>
      {/* 버튼 */}
      {/* {isChecked ? (
        <div className="bg-black grid grid-cols-3 pt-2 pb-3">
          <Button>
            <ArrowUp />
            위로
          </Button>
          <Button>
            <ArrowDown />
            아래로
          </Button>
          <Button>
            <Trash />
            삭제하기
          </Button>
        </div>
      ) : ( */}
      <div className="pt-2 pb-3 px-4">
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button className="w-full" size={'xl'}>
              선택
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                <span className="text-info-500">{logTitleInputRef.current?.value}</span> 로그를
                등록하시겠어요?
              </AlertDialogTitle>
              <AlertDialogDescription>
                <Label htmlFor="secret" className="flex items-center gap-3">
                  <Input type="checkbox" id="secret" className="w-fit" />
                  <span className="text-black text-text-sm">비공개</span>
                </Label>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {/* )} */}
    </div>
  );
};

export default DetailsPage;

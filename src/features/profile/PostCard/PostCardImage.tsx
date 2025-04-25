import { cn } from '@/lib/utils';
interface PostCardImageProps {
  imageUrl?: string;
  lable?: boolean;
  author: string;
  className?: string;
}

function PostCardImage({ imageUrl, lable, author, className }: PostCardImageProps) {
  return (
    <div
      className={cn(
        'relative flex-1 w-full web:mb-[10px] mobile:mb-[6px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_74.97%,rgba(0,0,0,0.7)_94.58%)] rounded-t-md',
        className,
        'aspect-[324/218] overflow-hidden'
      )}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Post Thumbnail"
          className="object-cover object-center w-full h-full"
        />
      )}
      {lable && (
        <div className="flex items-center gap-[3px] absolute left-[10px] bottom-[10px] text-white">
          <span className="text-[11px] font-semibold leading-[130%] tracking-[-0.22px]">
            {author}
          </span>
        </div>
      )}
      <div className="absolute inset-0 transition-colors group-hover:bg-black/25" />
    </div>
  );
}

export default PostCardImage;

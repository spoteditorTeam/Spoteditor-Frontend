import { cn } from '@/lib/utils';

interface CaptionTitleProps {
  title: string;
  subTitle: string;
  boldTarget?: 'title' | 'subTitle';
}

const CaptionTitle = ({ title, subTitle, boldTarget }: CaptionTitleProps) => {
  return (
    <header className="w-full text-lg font-medium web:text-2xl !leading-[120%] font-untitled">
      <p className={cn('text-light-300', boldTarget === 'title' && 'font-bold')}>{title}</p>
      <p className={cn('text-primary-950', boldTarget === 'subTitle' && 'font-bold')}>{subTitle}</p>
    </header>
  );
};

export default CaptionTitle;

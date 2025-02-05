import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  labelText?: string;
  queryText: string;
  bottomLine?: boolean;
}

function SectionHeader({
  labelText = 'Sort by',
  queryText,
  bottomLine = false,
}: SectionHeaderProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-2 w-full pb-[60px] ',
        bottomLine ? 'border-b border-b-[#E5E6E8]' : ''
      )}
    >
      <span
        style={{ fontWeight: 500 }}
        className="text-32 leading-[38.4px] font-medium text-primarySlate"
      >
        {labelText}
      </span>
      <span className="text-32 leading-[41.6px] font-bold">{queryText}</span>
    </section>
  );
}

export default SectionHeader;

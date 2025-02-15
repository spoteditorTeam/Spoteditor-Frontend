import NoticeHeader from '@/features/notice/NoticeHeader';

function Notice() {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[724px] w-full">
        <NoticeHeader title="공지사항" />
        <section className="flex flex-col w-full">
          {Array.from({ length: 7 }).map((_, idx) => (
            <article
              key={idx}
              className="w-full px-4 py-5 gap-[3px] flex flex-col border-b-[1px] border-b-primary-50 hover:cursor-pointer"
            >
              <h3 className="font-medium text-text-sm">
                스팟에디터 ‘서비스 이용약관’ 변경에 대한 안내
              </h3>
              <time className="text-text-xs text-primary-400">2025.03.15</time>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Notice;

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageContentLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col items-center web:gap-[50px] mobile:gap-[40px] self-stretch web:p-[60px_50px_140px_50px] mobile:p-[40px_16px_50px_16px]">
      {children}
    </div>
  );
}

export default PageContentLayout;

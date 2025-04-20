import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MAPS } from '@/constants/pathname';
import { ArrowLeft, Search } from 'lucide-react';
import React, { FormEvent, ForwardedRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface RegisterSearchBarProps {
  to?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const RegisterSearchBar = forwardRef(
  ({ to, onSubmit }: RegisterSearchBarProps, ref?: ForwardedRef<HTMLInputElement>) => {
    const navi = useNavigate();
    const handleGoBack = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (to) navi(to);
      else navi(-1);
    };

    return (
      <form
        className="border-b border-light-100 flex items-center w-full px-4 web:pl-0 py-[7px]"
        onSubmit={onSubmit}
        onClick={() => navi(MAPS)}
      >
        <Button
          type="button"
          className="p-0 [&_svg]:size-auto"
          variant={'transparent'}
          onClick={handleGoBack}
        >
          <ArrowLeft size={24} />
        </Button>

        <Input
          ref={ref}
          name="장소 검색"
          placeholder="장소를 검색해보세요."
          className="h-full placeholder:text-primary-300 text-text-lg font-medium "
        />

        <Button type="submit" className="p-0 [&_svg]:size-auto" variant={'transparent'}>
          <Search size={20} />
        </Button>
      </form>
    );
  }
);

export default RegisterSearchBar;

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MAPS } from '@/constants/pathname';
import { ArrowLeft, Search } from 'lucide-react';
import React, { FormEvent, ForwardedRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterSearchBar = forwardRef(
  (
    { onSubmit }: { onSubmit?: (e: FormEvent<HTMLFormElement>) => void },
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const navi = useNavigate();
    const handleGoBack = (e: React.MouseEvent) => {
      e.stopPropagation();
      navi(-1);
    };

    return (
      <form
        className="border-b flex items-center mt-3"
        onSubmit={onSubmit}
        onClick={() => navi(MAPS)}
      >
        <Button
          type="submit"
          className="px-4 [&_svg]:size-auto"
          variant={'transparent'}
          onClick={handleGoBack}
        >
          <ArrowLeft />
        </Button>

        <Input
          ref={ref}
          placeholder="장소를 검색해보세요."
          className="placeholder:text-primary-300 text-text-lg font-medium"
        />

        <Button type="submit" className="px-4 [&_svg]:size-auto" variant={'transparent'}>
          <Search />
        </Button>
      </form>
    );
  }
);

export default RegisterSearchBar;

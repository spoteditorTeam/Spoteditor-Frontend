import GeoConsentModal from '@/components/GeoConsentModal';
import { Button } from '@/components/ui/button';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import { useState } from 'react';
import CitySearchDropbox from './CitySearchDropbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { citySearchSchema } from '@/services/schemas/searchSchema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useLocationToAddress from '@/hooks/useLocationToAddress';

function CitySearchForm() {
  const [open, setOpen] = useState(false);
  const { permission, position } = useGeolocationPermission();
  const {address} = useLocationToAddress(Number(position?.latitude), Number(position?.longitude))
  console.log('position', position);
  
  console.log('address', address);
  
  const form = useForm({
    resolver: zodResolver(citySearchSchema),
    defaultValues: {
      sido: '서울',
      sidogu: '송파구'
    },
    });

  const onSearchSubmit = (data: z.infer<typeof citySearchSchema>) => {
    if (permission === 'prompt') {
      setOpen(true);
    }
    /* 추후 모달창 닫혔을 경우 검색할 수 있는 기능 추가 */
  };
  return (
    <>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearchSubmit)} className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] relative bottom-0">
          <div className="grid grid-cols-2 gap-1.5">
            <FormField
              control={form.control}
              name="sido"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="text-primary-400 text-text-sm">어디로 놀러갈까요?</FormLabel>
                  <FormControl>
                    <Input placeholder="서울" {...field} className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sidogu"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="text-primary-400 text-text-sm">더 상세히 검색!</FormLabel>
                  <FormControl>
                    <Input placeholder="송파구" {...field} className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="h-full font-medium text-white rounded-none bg-primary-950 text-text-sm hover:bg-primary-900"
          >
            검색
          </Button>
          <CitySearchDropbox />
        </form>
      </Form>
      {open ? <GeoConsentModal /> : null}
    </>
  );
}

export default CitySearchForm;

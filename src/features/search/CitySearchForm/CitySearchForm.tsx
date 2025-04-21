import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { citySearchSchema } from '@/services/schemas/searchSchema';
import { useCitySearchStore } from '@/store/searchStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useMotionTemplate, Variants } from 'motion/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import CitySearchDropbox from './CitySearchDropbox';

const dropboxVar: Variants = {
  start: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  end: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};
function CitySearchForm() {
  const nav = useNavigate();
  const { isDropBox, sido, bname, toggleSidoDropBox, toggleBnameDropBox } = useCitySearchStore();

  /* 드롭박스 마운트, 언마운트 시 transformOrigin 값 변경 */
  const transformOrigin = useMotionTemplate`top ${isDropBox ? 'left' : 'right'} `;

  const defaultValues = {
    sido: '서울',
    bname: '송파구',
  };

  const form = useForm({
    resolver: zodResolver(citySearchSchema),
    defaultValues,
  });

  // 쥬스탄드 값이 변경되었을 때 form 상태 업데이트
  useEffect(() => {
    if (sido) {
      form.setValue('sido', sido);
    }
    if (bname) {
      form.setValue('bname', bname);
    }
  }, [sido, bname, form]);

  const onSearchSubmit = async ({ sido, bname }: z.infer<typeof citySearchSchema>) => {
    /* 추후 모달창 닫혔을 경우 검색할 수 있는 기능 추가 */
    nav('/search', {
      state: { sido, bname },
    });
  };

  const openSidoDropBoxClick = () => {
    toggleSidoDropBox();
  };

  const openBnameDropBoxClick = () => {
    toggleBnameDropBox();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSearchSubmit)}
          className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] relative bottom-0 web:z-30"
        >
          <div className="grid grid-cols-2 gap-1.5">
            <FormField
              control={form.control}
              name="sido"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="!text-light-400 text-text-sm">어디로 놀러갈까요?</FormLabel>
                  <FormControl>
                    <Input
                      onClick={openSidoDropBoxClick}
                      placeholder="서울"
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bname"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="!text-light-400 text-text-sm">더 상세히 검색!</FormLabel>
                  <FormControl>
                    <Input
                      onClick={openBnameDropBoxClick}
                      placeholder="송파구"
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="h-full font-medium text-white rounded-none bg-light-950 text-text-sm hover:bg-primary-900"
          >
            검색
          </Button>
          <AnimatePresence>
            {isDropBox ? (
              <motion.section
                className="z-[1111] web:z-10 mobile:fixed mobile:top-0 mobile:left-0 web:absolute web:top-[93px] bg-white w-screen h-screen web:h-auto web:max-w-[calc(100%)] px-4 web:py-5 web:pl-[30px] web:pr-5 flex flex-col gap-[18px] web:gap-2.5"
                key="dropbox"
                variants={dropboxVar}
                initial="start"
                animate="visible"
                exit="end"
                style={{
                  transformOrigin,
                }}
              >
                <CitySearchDropbox />
              </motion.section>
            ) : null}
          </AnimatePresence>
        </form>
      </Form>
    </>
  );
}

export default CitySearchForm;

import XIcon from "@/components/Icons/XIcon";
import { Button } from "@/components/ui/button";

const sidos = [
  { key: "서울", name: "서울특별시" },
  { key: "부산", name: "부산광역시" },
  { key: "대구", name: "대구광역시" },
  { key: "인천", name: "인천광역시" },
  { key: "광주", name: "광주광역시" },
  { key: "대전", name: "대전광역시" },
  { key: "울산", name: "울산광역시" },
  { key: "세종", name: "세종특별자치시" },
  { key: "경기", name: "경기도" },
  { key: "강원", name: "강원도" },
  { key: "충북", name: "충청북도" },
  { key: "충남", name: "충청남도" },
  { key: "전북", name: "전라북도" },
  { key: "전남", name: "전라남도" },
  { key: "경북", name: "경상북도" },
  { key: "경남", name: "경상남도" },
  { key: "제주", name: "제주특별자치도" }
];
export default function CitySearchDropbox() {
    return ( 
      <section className='z-[1111] web:z-10 mobile:fixed mobile:top-0 mobile:left-0 web:absolute web:top-[93px] bg-white w-screen h-screen web:h-auto web:w-[655px] px-4 web:py-5 web:pl-[30px] web:pr-5 flex flex-col gap-[18px] web:gap-2.5'>
        <header className='flex items-center justify-between py-3'>
         <div className='flex justify-start gap-1 web:gap-2.5 mobile:flex-col web:justify-between web:items-center'>
            <h3 className='font-bold text-text-2xl'>도시선택</h3>
            <h4 className='flex-1 text-text-xs text-primary-400'>에디터가 새로운 지역을 추가하면 새로운 지역이 생겨요!</h4>
         </div>
         <div>
          <XIcon className='w-[34px] h-[34px]' />
         </div>
        </header>
        <div className='flex justify-center'>
        <section className='grid grid-cols-2 web:flex web:justify-start web:items-center gap-[5px] flex-wrap'>
          {sidos.map((sido) => (
            <Button key={sido.key} type="button" variant='ghost' className='px-2.5 py-[15px] w-[169px] web:w-[145px] text-primarySlate'>{sido.key}</Button>
          ))}
        </section> 
        </div>   
      </section>
    )
}
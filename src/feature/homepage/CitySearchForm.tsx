function CitySearchForm() {
  return (
    <section className="w-full flex gap-[10px]">
      <form className="flex gap-[10px] flex-1">
        <div className="flex flex-col flex-1 gap-2 px-5 py-3 bg-white">
          <label htmlFor="sido" className="text-[#81858F]">
            어디로 놀러갈까요?
          </label>
          <input
            id="sido"
            type="text"
            placeholder="전체"
            className="placeholder:text-[20px] placeholder:font-bold placeholder:text-black"
          />
        </div>
        <div className="flex flex-col flex-1 gap-2 px-5 py-3 bg-white">
          <label htmlFor="gu" className="text-[#81858F]">
            더 상세히 검색!
          </label>
          <input
            id="gu"
            type="text"
            placeholder="전체"
            className="placeholder:text-[20px] placeholder:font-bold placeholder:text-black"
          />
        </div>
        <button className="p-5 text-16 bg-[#242528] text-white">검색</button>
      </form>
    </section>
  );
}

export default CitySearchForm;

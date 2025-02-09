const MainFooter = () => {
  return (
    <footer className="w-full h-[306px] px-50px pb-14 pt-36 bg-black font-untitled">
      <div
        className="flex justify-between h-[56px] pb-8 text-[#CDCFD4] text-16 font-normal border-b"
        style={{ borderBottom: "1px solid var(--Color-Light-950, #242528)" }}
      >
        <div className="w-[185px]">
          <span className="mr-3">About Us</span>
          Contact Us
        </div>
        <span>Instragram</span>
      </div>
      <div className="h-6 flex justify-between font-pretendard text-16 font-normal text-[#575A63] mt-6">
        <span>©2025 Spoteditor. All Rights are reserved️</span>
        <div className="w-[265px] flex justify-between">
          <span>Privacy Policy</span>
          Terms & Conditions
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;

import React, { useState } from "react";

const LanguageSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="flex cursor-pointer select-none items-center z-10">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          {isChecked ? (
            <>
              <div className="block h-9 w-[72px] rounded-full bg-[#E5E7EB]"></div>
              <div className="dot absolute right-1 top-[2px] h-8 w-8 rounded-full bg-blue-400 transition">
                <p className="pl-[10px] pb-1 font-semibold text-xl">A</p>
              </div>
            </>
          ) : (
            <>
              <div className="block h-9 w-[72px] rounded-full bg-[#E5E7EB]"></div>
              <div className="dot absolute left-1 top-[2px] h-8 w-8 rounded-full bg-gray-400 transition">
                <p className="pl-[7px] pt-[1px] font-semibold text-xl">ଅ</p>
              </div>
            </>
          )}
        </div>
      </label>
    </>
  );
};

export default LanguageSwitch;

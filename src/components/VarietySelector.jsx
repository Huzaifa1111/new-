import React from "react";
import { PiPantsThin } from "react-icons/pi";
import { GiPoloShirt, GiPirateCoat, GiSleevelessJacket, GiClothes, GiLabCoat } from "react-icons/gi";

function VarietySelector({ selectedVariety, handleVarietyClick, scrollToForm }) {
  // Define variety icons
  const varietyIcons = {
    Pant: <PiPantsThin className="w-6 h-6 md:w-8 md:h-8" />,
    Pant_Coat: <GiLabCoat className="w-6 h-6 md:w-8 md:h-8" />,
    Waist_Coat: <GiSleevelessJacket className="w-5 h-6 md:w-7 md:h-8" />,
    Coat: <GiPirateCoat className="w-6 h-6 md:w-8 md:h-8" />,
    Shalwaar_Kameez: <GiClothes className="w-9 h-6 md:w-11 md:h-8" />,
    Shirt: <GiPoloShirt className="w-9 h-6 md:w-11 md:h-8" />,
  };

  return (
    <div className="md:p-[21px] p-[12px] ml-3 md:ml-1 space-x-2 rounded-xl bg-cardBg md:w-[611px] w-[318px] border shadow-xl font-font">
      <h3 className="text-lg font-bold text-left text-heading">Select Variety</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Object.keys(varietyIcons).map((variety) => (
          <button
            key={variety}
            onClick={() => {
              handleVarietyClick(variety);
              scrollToForm();
            }}
            className={`btn w-[8rem] md:w-[9rem] h-[70px] md:h-[99px] flex flex-col items-center justify-center px-2 rounded-3xl ${
              selectedVariety === variety ? "bg-black text-white" : "bg-btnBg text-white"
            } transition-all duration-300`}
          >
            <span className="flex items-center mb-1 md:mb-2">
              {varietyIcons[variety] || <GiClothes className="w-6 h-6 md:w-8 md:h-8" />}
            </span>
            <span className="text-xs md:text-sm text-white truncate">{variety}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default VarietySelector;

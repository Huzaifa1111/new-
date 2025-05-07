import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

function Shalwaar({ subCategoryImages, selectedSubCategory, handleImageClick, formState = {}, updateData }) {
  // Use "Shalwaar" images or fallback
  const images =
    subCategoryImages["Shalwaar"] ||
    [
      "/assets/pent shalwar.svg",
      "/assets/zip shalwar.svg",
      "/assets/pocket shalwar.svg",
      "/assets/shalwaer.svg"
    ];

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(
    formState?.shalwaar?.selectedImage || images[0]
  );

  // State for dropdown: Pancha Chorai
  const [panchaChorai, setPanchaChorai] = useState(
    formState?.shalwaar?.panchaChorai || ""
  );
  const [isPanchaDropdownOpen, setIsPanchaDropdownOpen] = useState(false);

  // Generate options from 0.5 to 2 in increments of 0.25
  const panchaChoraiOptions = [];
  for (let val = 0.5; val <= 2; val += 0.25) {
    let label;
    if (val === 0.5) label = "1/2";
    else if (val === 0.75) label = "3/4";
    else label = val.toString();
    panchaChoraiOptions.push(label);
  }

  // State for multi-select buttons
  const styleLabels = [
    "بغیر بکرم پانچا",
    "پانچا پٹی چمک سلائی",
    "پانچا پٹی ایک سلائی اوپر تین نیچے"
  ];
  const [multiSelect, setMultiSelect] = useState(
    formState?.shalwaar?.styleSelections
      ? styleLabels.map(label => formState.shalwaar.styleSelections.includes(label))
      : [false, false, false]
  );

  // Update parent on state changes
  useEffect(() => {
    if (updateData) {
      const data = {
        selectedImage,
        panchaChorai,
        styleSelections: styleLabels.filter((_, index) => multiSelect[index])
      };
      console.log("Shalwaar updateData:", data);
      updateData("shalwaar", data);
    }
  }, [selectedImage, panchaChorai, multiSelect, updateData]);

  // Handle image selection
  const handleSelectImage = (imgSrc) => {
    setSelectedImage(imgSrc);
    handleImageClick(imgSrc, selectedSubCategory);
  };

  // Toggle multi-select buttons
  const toggleButton = (index) => {
    setMultiSelect((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-2">
        {/* Images grid */}
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Shalwaar ${index + 1}`}
                className={`w-36 h-24 p-3 cursor-pointer border rounded-3xl object-contain transition-all duration-300 bg-white ${
                  selectedImage === imgSrc ? "border-2 border-green-600" : "border"
                }`}
                onClick={() => handleSelectImage(imgSrc)}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="col-span-1 flex flex-col space-y-4">
          {/* Pancha Chorai Dropdown */}
          <div className="relative inline-block w-[135px]">
            <button
              onClick={() => setIsPanchaDropdownOpen((prev) => !prev)}
              className="inline-flex justify-between items-center w-full h-10 px-4 py-1 bg-white text-black text-lg rounded-xl border border-gray-300 hover:shadow-xl"
            >
              <span>{panchaChorai || "پانچا چوڑائی"}</span>
              <HiChevronDown className="h-5 w-4" />
            </button>
            {isPanchaDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-full rounded-xl text-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1">
                  <div className="block w-full text-left px-3 py-2 text-lg font-semibold text-gray-900 border-b border-gray-200">
                    پانچا چوڑائی
                  </div>
                  {panchaChoraiOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setPanchaChorai(option);
                        setIsPanchaDropdownOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-lg text-md text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Multi-select Buttons */}
          <div className="flex flex-col space-y-2">
            {styleLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => toggleButton(index)}
                className={`p-1 w-[135px] h-16 cursor-pointer text-lg border rounded-xl transition-all duration-300 bg-white hover:shadow-xl ${
                  multiSelect[index]
                    ? "border-2 border-green-600"
                    : "border border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Shalwaar.defaultProps = {
  formState: {},
};

export default Shalwaar;
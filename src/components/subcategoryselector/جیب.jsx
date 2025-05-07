import React, { useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";

function جیب({
  subCategoryImages,
  selectedSubCategory,
  handleImageClick,
  formState,
  updateData,
}) {
  // Pocket images
  const pocketImages = subCategoryImages["جیب"] || [
    "/assets/choras jaib.svg",
    "/assets/cut jaib.svg",
    "/assets/flip jaib choras.svg",
    "/assets/flip jaib simple.svg",
    "/assets/flip jaib.svg",
    "/assets/gol jaib.svg",
    "/assets/no jaib.svg",
    "/assets/nok jaib.svg",
  ];

  // Side pocket images
  const sidePocketImages = ["/assets/side jaib 1.svg", "/assets/side jaib 2.svg"];

  // Dropdown Options
  const numberOfPocketsOptions = ["1 جیب", "2 جیب"];
  const pocketSizeOptions = [
    "3* 3 1/2",
    "3 1/4 * 3 3/4",
    "3 1/2 * 4",
    "3 3/4 * 4 1/4",
    "4* 4 1/2",
    "4 1/4 * 4 3/4",
    "4 1/2 * 5",
    "5* 5 1/2",
    "6* 6 1/2",
  ];
  const kandeSeJaibOptions = [
    "6",
    "6 1/4",
    "6 1/2",
    "6 3/4",
    "7",
    "7 1/4",
    "7 1/2",
    "7 3/4",
    "8",
    "8 1/4",
    "8 1/2",
    "8 3/4",
    "9",
    "9 1/4",
    "9 1/2",
    "9 3/4",
    "10",
  ];

  // State for dropdowns with defaults
  const [noOfPockets, setNoOfPockets] = useState(
    formState.pocket?.noOfPockets || numberOfPocketsOptions[0]
  );
  const [pocketSize, setPocketSize] = useState(
    formState.pocket?.pocketSize || pocketSizeOptions[0]
  );
  const [kandeSeJaib, setKandeSeJaib] = useState(
    formState.pocket?.kandeSeJaib || kandeSeJaibOptions[0]
  );

  // State for style buttons
  const [multiSelectButtons, setMultiSelectButtons] = useState(
    formState.pocket?.styleSelections
      ? [
          formState.pocket.styleSelections.includes("کندھے پر شولڈر"),
          formState.pocket.styleSelections.includes("جیب ک نیچے جیب"),
          formState.pocket.styleSelections.includes("جیب پر بٹن"),
        ]
      : [false, false, false]
  );
  const styleLabels = ["کندھے پر شولڈر", "جیب ک نیچے جیب", "جیب پر بٹن"];

  // State for images with defaults
  const [selectedTopImage, setSelectedTopImage] = useState(
    formState.pocket?.pocketImages?.[0]?.imgSrc || pocketImages[0]
  );
  const [selectedRadio, setSelectedRadio] = useState(
    formState.pocket?.pocketImages?.[1]?.imgSrc || sidePocketImages[0]
  );

  // Update parent whenever selections change
  useEffect(() => {
    if (updateData) {
      const pocketImages = [
        { imgSrc: selectedTopImage, buttonName: "جیب (اوپر)" },
        { imgSrc: selectedRadio, buttonName: "جیب (پہلو)" },
      ];

      const data = {
        pocketImages,
        noOfPockets,
        pocketSize,
        kandeSeJaib,
        styleSelections: styleLabels.filter((_, index) => multiSelectButtons[index]),
      };

      // Log data for debugging
      console.log("جیب updateData:", data);

      updateData("pocket", data);
    }
  }, [
    selectedTopImage,
    selectedRadio,
    noOfPockets,
    pocketSize,
    kandeSeJaib,
    multiSelectButtons,
    updateData,
  ]);

  // Handle style button toggle
  const toggleStyleButton = (index) => {
    setMultiSelectButtons((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-4 gap-2">
        {/* Pocket Images Grid */}
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {pocketImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`جیب ${index + 1}`}
                className={`w-36 h-24 p-3 cursor-pointer border rounded-3xl object-contain transition-all duration-300 bg-white ${
                  selectedTopImage === imgSrc ? "border-2 border-blue-600" : "border"
                }`}
                onClick={() => {
                  setSelectedTopImage(imgSrc);
                  handleImageClick(imgSrc, selectedSubCategory);
                }}
              />
            ))}
          </div>
        </div>

        {/* Dropdowns and Style Buttons */}
        <div className="col-span-1 flex flex-col space-y-4 ml-2">
          {/* Number of Pockets Dropdown */}
          <div className="relative inline-block w-[8rem]">
            <select
              value={noOfPockets}
              onChange={(e) => setNoOfPockets(e.target.value)}
              className="block w-[125px] h-[3rem] appearance-none bg-white text-black text-lg font-medium rounded-xl px-2 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="" disabled>
                فرنٹ جیب
              </option>
              {numberOfPocketsOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <HiChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
          </div>

          {/* Pocket Size Dropdown */}
          <div className="relative inline-block w-[8rem]">
            <select
              value={pocketSize}
              onChange={(e) => setPocketSize(e.target.value)}
              className="block w-[125px] h-[3rem] appearance-none bg-white text-black text-lg font-medium rounded-xl px-2 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="" disabled>
                جیب سائز
              </option>
              {pocketSizeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <HiChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
          </div>

          {/* Kande Se Jaib Dropdown */}
          <div className="relative inline-block w-[8rem]">
            <select
              value={kandeSeJaib}
              onChange={(e) => setKandeSeJaib(e.target.value)}
              className="block w-[125px] h-[3rem] appearance-none bg-white text-black text-lg font-medium rounded-xl px-2 py-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                کندھے سے جیب
              </option>
              {kandeSeJaibOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <HiChevronDown className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
          </div>

          {/* Style Buttons */}
          <div className="flex justify-center my-2">
            <h1 className="text-heading text-lg">Select Style</h1>
          </div>
          <div className="flex flex-col space-y-2">
            {styleLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => toggleStyleButton(index)}
                className={`w-[126px] h-10 border rounded-lg text-lg font-medium transition-all duration-200 ${
                  multiSelectButtons[index]
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side Pocket Selection */}
      <div>
        <h4 className="text-base font-semibold mb-2 text-center text-heading">
          Select One
        </h4>
        <div className="flex justify-center space-x-2">
          {sidePocketImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Side Jaib ${index + 1}`}
              className={`w-24 h-24 p-2 bg-white cursor-pointer border rounded-lg object-contain transition-all duration-300 ${
                selectedRadio === imgSrc ? "border-2 border-green-600" : "border"
              }`}
              onClick={() => setSelectedRadio(imgSrc)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default جیب;
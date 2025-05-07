import React, { useEffect, useState } from "react";

function Cuff({
  subCategoryImages = {},
  selectedSubCategory,
  handleImageClick,
  updateData,
  formState,
}) {
  // Default cuff images if subCategoryImages does not have "کف" key
  const cuffImages = subCategoryImages["کف"] || [
    "/assets/choras kaf 2.svg",
    "/assets/choras kaf.svg",
    "/assets/d kaf.svg",
    "/assets/gol kaf.svg",
    "/assets/kat kaf.svg",
    "/assets/kani bazu.svg",
    "/assets/gol bazu 3 button.svg",
    "/assets/gol bazu.svg",
    "/assets/lopi gol bazu.svg",
  ];

  const topImages = cuffImages.slice(0, 5);
  const bottomImages = cuffImages.slice(5, 9);

  const groupOneLabels = [
    "کف پر پلیٹ",
    "کف بغیر پلیٹ",
    "کف ڈبل بکرم",
    "سٹد کاج",
    "ڈبل کف",
    "کف اوپرنیچے",
  ];

  const groupTwoOptions = [
    "1 چاک پٹی گول",
    "2 چاک پٹی گول",
    "1چاک پٹی چورس",
    "2چاک پٹی چورس",
    "1چاک پٹی نوک",
    "2چاک پٹی نوک",
  ];

  const [selectedTopImage, setSelectedTopImage] = useState("");
  const [selectedBottomImage, setSelectedBottomImage] = useState("");
  const [selectedGroupOne, setSelectedGroupOne] = useState(
    new Array(groupOneLabels.length).fill(false)
  );
  const [selectedGroupTwo, setSelectedGroupTwo] = useState("");
  const [lengthValue, setLengthValue] = useState("");
  const [widthValue, setWidthValue] = useState("");

  // Pre-fill from formState if editing
  useEffect(() => {
    if (formState?.cuff) {
      const saved = formState.cuff;
      setSelectedTopImage(saved.topImage || "");
      setSelectedBottomImage(saved.bottomImage || "");
      setSelectedGroupOne(
        groupOneLabels.map((label) => saved.styleSelections?.includes(label) || false)
      );
      setSelectedGroupTwo(saved.styleSelections?.includes(saved.selectedGroupTwo) ? saved.selectedGroupTwo : "");
      setLengthValue(saved.lengthValue || "");
      setWidthValue(saved.selectedDropdownCuff || "");
    }
  }, [formState]);

  // Save all selections to parent in the format expected by SelectedImages
  const syncData = (data = {}) => {
    const selectedCuffImages = [];
    if (selectedTopImage) {
      selectedCuffImages.push({ imgSrc: selectedTopImage, buttonName: "کف (اوپر)" });
    }
    if (selectedBottomImage) {
      selectedCuffImages.push({ imgSrc: selectedBottomImage, buttonName: "کف (نیچے)" });
    }

    const styleSelections = [
      ...groupOneLabels.filter((_, i) => selectedGroupOne[i]),
      ...(selectedGroupTwo ? [selectedGroupTwo] : []),
      ...(lengthValue ? [`لمبائی: ${lengthValue}`] : []),
    ];

    const updatedData = {
      cuffImages: selectedCuffImages.slice(0, 2), // Ensure only up to 2 images
      selectedDropdownCuff: widthValue,
      styleSelections,
      topImage: selectedTopImage,
      bottomImage: selectedBottomImage,
      lengthValue,
      ...data,
    };
    updateData("cuff", updatedData);
  };

  const toggleGroupOne = (index) => {
    setSelectedGroupOne((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      const updated = groupOneLabels.filter((_, i) => newState[i]);
      syncData({ styleSelections: [...updated, ...(selectedGroupTwo ? [selectedGroupTwo] : []), ...(lengthValue ? [`لمبائی: ${lengthValue}`] : [])] });
      return newState;
    });
  };

  const handleTopImageClick = (imgSrc) => {
    setSelectedTopImage(imgSrc);
    handleImageClick(imgSrc, selectedSubCategory);
    syncData({ topImage: imgSrc });
  };

  const handleBottomImageClick = (imgSrc) => {
    setSelectedBottomImage(imgSrc);
    handleImageClick(imgSrc, selectedSubCategory);
    syncData({ bottomImage: imgSrc });
  };

  const selectGroupTwo = (option) => {
    setSelectedGroupTwo(option);
    syncData({ styleSelections: [...groupOneLabels.filter((_, i) => selectedGroupOne[i]), option, ...(lengthValue ? [`لمبائی: ${lengthValue}`] : [])] });
  };

  const handleLengthChange = (e) => {
    const value = e.target.value;
    setLengthValue(value);
    syncData({ lengthValue: value, styleSelections: [...groupOneLabels.filter((_, i) => selectedGroupOne[i]), ...(selectedGroupTwo ? [selectedGroupTwo] : []), ...(value ? [`لمبائی: ${value}`] : [])] });
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    setWidthValue(value);
    syncData({ selectedDropdownCuff: value });
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column: Images */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            {topImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Cuff Top ${index + 1}`}
                className={`w-36 h-20 p-2 cursor-pointer border rounded-3xl object-contain transition-all duration-300 bg-white ${
                  selectedTopImage === imgSrc ? "border-2 border-blue-600" : "border"
                }`}
                onClick={() => handleTopImageClick(imgSrc)}
              />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {bottomImages.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Cuff Bottom ${index + 1}`}
                className={`w-36 h-20 p-2 cursor-pointer border rounded-3xl object-contain transition-all duration-300 bg-white ${
                  selectedBottomImage === imgSrc ? "border-2 border-blue-600" : "border"
                }`}
                onClick={() => handleBottomImageClick(imgSrc)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="flex flex-col space-y-4">
          {/* Dropdowns */}
          <div className="flex gap-2 mb-1">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">لمبائی</label>
              <select
                className="w-[125px] border rounded-xl p-2"
                value={lengthValue}
                onChange={handleLengthChange}
              >
                <option value="">Select</option>
                <option value="6">6</option>
                <option value="6x1/4">6x1/4</option>
                <option value="6x1/2">6x1/2</option>
                <option value="6x3/4">6x3/4</option>
                <option value="7">7</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">چوڑائی</label>
              <select
                className="w-[125px] border rounded-xl p-2"
                value={widthValue}
                onChange={handleWidthChange}
              >
                <option value="">Select</option>
                <option value="1/2">1/2</option>
                <option value="3/4">3/4</option>
                <option value="1">1</option>
                <option value="1x1/4">1x1/4</option>
                <option value="1x1/2">1x1/2</option>
                <option value="1x3/4">1x3/4</option>
                <option value="2">2</option>
                <option value="2x1/4">2x1/4</option>
                <option value="2x1/2">2x1/2</option>
                <option value="2x3/4">2x3/4</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          {/* Group One Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {groupOneLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => toggleGroupOne(index)}
                className={`w-full h-12 border rounded-xl text-lg font-medium transition-all duration-200 ${
                  selectedGroupOne[index]
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Group Two Options */}
          <div className="text-center font-bold text-lg text-gray-800">Select One</div>
          <div className="grid grid-cols-2 gap-2">
            {groupTwoOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => selectGroupTwo(option)}
                className={`w-full h-12 border rounded-xl text-lg font-medium transition-all duration-200 ${
                  selectedGroupTwo === option
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 hover:bg-green-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cuff;
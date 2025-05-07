import React, { useState, useEffect } from "react";

const Silai = ({ selectedSubCategory, handleButtonClick, formState = {}, updateData }) => {
  const silaiButtons = [
    "سادہ سلائی",
    "ڈبل سادہ سلائی",
    "سنگل چمک سلائی",
    "ڈبل چمک سلائی",
    "چمک ٹک پا ٹک سلائی",
    "ٹریپل سلائی",
    "عام ٹریپل سلائی",
    "زنجیر سلائی",
    "ڈبل زنجیر سلائی",
    "چمک پن سلائی",
    "چوکا سلائی",
    "موبائل میں ڈیزائن"
  ];

  // Initialize selectedButton from formState.silai
  const [selectedButton, setSelectedButton] = useState(formState?.silai?.selectedButton || null);

  // Update parent on selection change
  useEffect(() => {
    if (updateData) {
      const data = { selectedButton };
      console.log("Silai updateData:", data);
      updateData("silai", data);
    }
  }, [selectedButton, updateData]);

  // Group buttons into rows
  const rows = [
    silaiButtons.slice(0, 3),
    silaiButtons.slice(3, 6),
    silaiButtons.slice(6, 9),
    silaiButtons.slice(9, 12)
  ];

  // Handle button selection
  const handleSelection = (btnName) => {
    const newSelection = selectedButton === btnName ? null : btnName;
    setSelectedButton(newSelection);
    handleButtonClick(newSelection, selectedSubCategory);
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-4">سلائی Options</h3>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-2 mt-4">
          {row.map((btnName, btnIndex) => (
            <button
              key={btnIndex}
              onClick={() => handleSelection(btnName)}
              className={`w-40 h-13 p-3 cursor-pointer text-lg border rounded-xl transition-all duration-300 hover:shadow-xl whitespace-nowrap overflow-hidden ${
                selectedButton === btnName
                  ? "bg-green-500 text-white"
                  : "border border-gray-300 bg-white"
              }`}
            >
              {btnName}
            </button>
          ))}
        </div>
      ))}
      {selectedButton && (
        <div className="mt-4 text-green-600 font-semibold">
          Selected: {selectedButton}
        </div>
      )}
    </div>
  );
};

Silai.defaultProps = {
  formState: {},
};

export default Silai;
import React, { useState, useEffect } from "react";

function بٹن({ selectedSubCategory, handleButtonClick, formState = {}, updateData }) {
  const buttonNames = [
    "سٹیل بٹن",
    "کپڑا بٹن",
    "رینگ بٹن",
    "واسکٹ بٹن",
    "فینسی بٹن",
    "فینسی رینگ بٹن",
    "اپنے بٹن",
  ];

  // Log incoming formState for debugging
  console.log("بٹن: Incoming formState:", formState);

  // Log if formState is undefined or missing button
  if (!formState) {
    console.warn("بٹن: formState is undefined");
  } else if (!formState.button) {
    console.warn("بٹن: formState.button is undefined", formState);
  }

  // Initialize selectedButton from formState.button with fallback
  const [selectedButton, setSelectedButton] = useState(formState.button?.selectedButton || null);

  // Update parent on selection change
  useEffect(() => {
    if (updateData) {
      const data = { selectedButton };
      console.log("بٹن updateData:", data);
      updateData("button", data);
    }
  }, [selectedButton, updateData]);

  // Handle button selection with deselection support
  const handleSelection = (name) => {
    const newSelection = selectedButton === name ? null : name;
    setSelectedButton(newSelection);
    handleButtonClick(newSelection, selectedSubCategory);
  };

  // Helper function to render a row of buttons
  const renderRow = (buttons) =>
    buttons.map((name) => (
      <button
        key={name}
        onClick={() => handleSelection(name)}
        className={`w-36 h-13 p-3 text-xl cursor-pointer border rounded-xl transition-all duration-300 bg-white ${
          selectedButton === name
            ? "border-2 border-green-600 shadow-lg"
            : "border border-gray-300 hover:shadow-xl"
        }`}
      >
        {name}
      </button>
    ));

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-2xl font-bold text-center">بٹن Options</h3>
      {/* First row: 3 buttons */}
      <div className="flex justify-center space-x-4">
        {renderRow(buttonNames.slice(0, 3))}
      </div>
      {/* Second row: 3 buttons */}
      <div className="flex justify-center space-x-4">
        {renderRow(buttonNames.slice(3, 6))}
      </div>
      {/* Third row: 1 button */}
      <div className="flex justify-center">
        {renderRow(buttonNames.slice(6, 7))}
      </div>
      {/* Display current selection */}
      {selectedButton && (
        <div className="text-center text-green-600 font-semibold">
          Selected: {selectedButton}
        </div>
      )}
    </div>
  );
}

export default بٹن;
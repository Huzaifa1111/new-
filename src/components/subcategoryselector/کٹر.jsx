import React, { useState, useEffect } from "react";

function کٹر({ selectedSubCategory, handleButtonClick, formState = {}, updateData }) {
  const cutterButtonNames = [
    "کرتا بنانا ہے درزو والا",
    "آستین اوپر سے فٹ",
    "آستین اوپر سے زیادہ فٹ",
    "آستین نیچے سے لوز ہو",
    "2 درزی شلوار",
    "6 درزی شلوار",
    "شلوار لوز",
    "شلوار زیادہ لوز",
    "شلوار اوپر سے کم",
    "پینٹ شلوار",
    "شرنک کرنا ہے",
    "لیبل نہیں لگانا",
    "دامن گول",
    "دامن چورس",
  ];

  // Initialize localSelected from formState.cutter
  const initialSelected = cutterButtonNames.map((name) =>
    formState.cutter?.selectedButtons?.includes(name) || false
  );
  const [localSelected, setLocalSelected] = useState(initialSelected);

  // Update parent on selection change
  useEffect(() => {
    if (updateData) {
      const selectedButtons = cutterButtonNames.filter((_, index) => localSelected[index]);
      const data = { selectedButtons };
      console.log("کٹر updateData:", data);
      updateData("cutter", data);
      // Notify parent for compatibility with existing handleButtonClick
      handleButtonClick(selectedButtons.length > 0 ? "selected" : null, selectedSubCategory);
    }
  }, [localSelected, updateData, handleButtonClick, selectedSubCategory, cutterButtonNames]);

  // Toggle the selection status of a button
  const toggleButton = (index) => {
    setLocalSelected((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="mt-8 flex flex-col items-center font-nastaliq">
      <h3 className="text-2xl font-bold text-center">کٹر Options</h3>
      <div className="grid grid-cols-3 gap-2 justify-items-center mt-4">
        {cutterButtonNames.map((name, index) => (
          <button
            key={index}
            onClick={() => toggleButton(index)}
            className={`w-[172px] h-12 cursor-pointer text-lg border rounded-xl transition-all duration-300 bg-white hover:shadow-xl ${
              localSelected[index]
                ? "border-2 border-green-600 bg-green-600 text-black"
                : "border border-gray-300"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      {/* Display current selections */}
      {localSelected.some((selected) => selected) && (
        <div className="text-center text-green-600 font-semibold mt-4">
          Selected: {cutterButtonNames.filter((_, index) => localSelected[index]).join(", ")}
        </div>
      )}
    </div>
  );
}

export default کٹر;
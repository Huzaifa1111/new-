import React from "react";

const Measurements = ({ groupedMeasurements, buttonSelections = [] }) => {
  const getFullCategoryName = (category, fields) => {
    if (category === "Waist" && Object.keys(fields).some(key => key.toLowerCase().includes("coat"))) {
      category = "Waist_Coat";
    }
    const categoryMap = {
      Coat: "Coat Measurements",
      Pant: "Pant Measurements",
      Pant_Coat: "Pant-Coat Measurements",
      Waist_Coat: "Waist-Coat Measurements",
      Shalwaar_Kameez: "Shalwaar Kameez Measurements",
      Shirt: "Shirt Measurements",
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="flex justify-right ">
      <div className="text-black font-medium w-[12rem] " style={{ fontFamily: 'Amiri, serif' }}>
        {Object.entries(groupedMeasurements).map(([category, fields]) => (
          <div key={category} className="mb-4 last:mb-0">
            <h3 className="text-lg font-semibold mb-2">
              {getFullCategoryName(category, fields)}
            </h3>
            <div className="space-y-2 content-right">
              {Object.entries(fields).map(([field, value]) => (
                <div
                  key={`${category}_${field}`}
                  className="bg-white p-2 rounded border border-borderColor text-center flex "
                >
                  <strong className="block text-md text-gray-700 ">{field}:</strong> 
                  <span className="text-md text-gray-900 pl-[12px]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        {Object.keys(groupedMeasurements).length === 0 && (
          <p className="text-gray-500 text-xs">No measurements provided.</p>
        )}
        {buttonSelections.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Options</h3>
            <div className="space-y-2">
              {buttonSelections.map((selection, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={true}
                    readOnly
                    className="h-4 w-4 text-btnBg"
                  />
                  <span className="text-sm">{selection}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Measurements;
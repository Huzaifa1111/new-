import React, { useEffect } from "react";

function کالر({
  selectedImages,
  handleImageClick,
  selectedMeasurement,
  handleMeasurementChange,
  collarPosition,
  handleCollarPosition,
  selectedSubCategory,
  updateViewOrder,
}) {
  const collarImages = [
    "/assets/maghzi gala.svg",
    "/assets/gol colar.svg",
    "/assets/fc1.svg",
    "/assets/full ban gol.svg",
    "/assets/half ben gol.svg",
    "/assets/full ban choras.svg",
    "/assets/half ben choras.svg",
  ];

  const positionOptions = [
    { label: "کالر پر بٹن", value: "above" },
    { label: "کالر پر ڈیزائن", value: "center" },
    { label: "کالر پر کڑھائی", value: "below" },
  ];

  useEffect(() => {
    updateViewOrder({
      selectedMeasurement: selectedMeasurement,
      collarPosition: collarPosition,
    });
  }, [selectedMeasurement, collarPosition, updateViewOrder]);

  const handleSelection = (imgSrc) => {
    handleImageClick(imgSrc, selectedSubCategory);
  };

  const onMeasurementChange = (e) => {
    const val = e.target.value;
    handleMeasurementChange(val);
  };

  const onPositionClick = (option) => {
    handleCollarPosition(option.value);
  };

  return (
    <div className="mt-8 font-nastaliq">
      <div className="flex gap-4">
        {/* Left: Images */}
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-4 w-[23rem]">
            {collarImages.map((imgSrc, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={imgSrc}
                  alt={`کالر ${idx + 1}`}
                  className={`w-32 h-24 p-3 cursor-pointer border rounded-3xl object-contain transition-all duration-300 bg-white ${
                    selectedImages.some((img) => img.imgSrc === imgSrc)
                      ? "border-2 border-green-600"
                      : "border border-white"
                  }`}
                  onClick={() => handleSelection(imgSrc)}
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                    e.target.alt = "تصویر دستیاب نہیں";
                  }}
                />
                {selectedImages.some((img) => img.imgSrc === imgSrc) && (
                  <div className="mt-2 text-center text-sm text-gray-600">
                    {selectedMeasurement && (
                      <p>
                        چوڑائی:  <strong>{selectedMeasurement}</strong>
                      </p>
                    )}
                    {collarPosition && (
                      <p>
                        پوزیشن: <strong>
                          {positionOptions.find((opt) => opt.value === collarPosition)?.label || collarPosition}
                        </strong>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Dropdown + Buttons */}
        <div className="w-[134px] flex flex-col gap-4">
          {/* Measurement Dropdown */}
          <select
            id="measurement"
            value={selectedMeasurement || ""}
            onChange={onMeasurementChange}
            className="w-full h-12 px-3 text-lg bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="" disabled>چوڑائی</option>
            {["1/2", "3/4", "1", "1x1/4", "1x1/2", "1x3/4", "2", "2x1/4", "2x1/2", "2x3/4", "3"].map(
              (val) => (
                <option key={val} value={val}>{val}</option>
              )
            )}
          </select>

          {/* Collar Position Buttons */}
          <div className="grid gap-2">
            {positionOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onPositionClick(opt)}
                className={`h-12 px-4 text-lg rounded-xl bg-white border transition ${
                  collarPosition === opt.value
                    ? "border-green-600 font-semibold bg-green-50"
                    : "border-gray-300 hover:shadow-sm"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default کالر;
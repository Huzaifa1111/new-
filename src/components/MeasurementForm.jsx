// MeasurementForm.jsx
import React from "react";
import MeasurementManager from "./MeasurementManager";

function MeasurementForm({
  selectedVarietyHeading,
  selectedVariety,
  formState,
  setFormState,
  children,
  extraData,         // extraData from SubCategorySelector
  updateExtraData,   // callback to update extraData in the parent (OrderForm)
  currentSubId,      // New prop: the generated sub-ID
}) {
  const measurementFields = {
    Coat: ["Chest", "Shoulder", "Sleeve", "Length", "Waist"],
    Pant: ["Waist", "Length", "Thigh", "Bottom"],
    Pant_Coat: ["Chest", "Shoulder", "Sleeve", "Length"],
    Waist_Coat: ["Chest", "Shoulder", "Waist", "Length"],
    Shalwaar_Kameez: [
      "Chest",
      "Shoulder",
      "Sleeve",
      "Length",
      "Shalwaar Length",
    ],
    Shirt: ["Chest", "Shoulder", "Sleeve", "Length", "Waist"],
  };

  // Helper to generate a unique field id.
  const getUniqueFieldId = (category, field) =>
    `${category}_${field}`.replace(/\s+/g, "");

  // Update only the local measurement state when an input changes.
  const handleInputChange = (uniqueFieldId, value) => {
    setFormState((prevState) => ({
      ...prevState,
      measurement: {
        ...prevState.measurement,
        [uniqueFieldId]: value,
      },
    }));
  };

  // This handler saves (commits) the measurement data into formState.
  // (It can be triggered by OrderForm if needed.)
  const handleMeasurementSave = () => {
    setFormState((prevState) => {
      const baseSubId =
        currentSubId || `${prevState.customerDetails.id}-${selectedVariety.toLowerCase().replace("_", "-")}`;
      const currentMeasurement = prevState.measurement;
      const currentSelectedImages = prevState.selectedImages;
      const currentExtraData = extraData || {};

      const prevHistory = prevState.measurementHistory[baseSubId];

      const createNewVersion = () => ({
        id: `${baseSubId}-${Date.now()}`,
        measurements: currentMeasurement,
        selectedImages: currentSelectedImages,
        extraData: currentExtraData,
        timestamp: Date.now(),
      });

      if (!prevHistory) {
        const newVersion = createNewVersion();
        return {
          ...prevState,
          measurementHistory: {
            ...prevState.measurementHistory,
            [baseSubId]: {
              versions: [newVersion],
              activeVersionIndex: 0,
            },
          },
        };
      } else {
        const lastVersion = prevHistory.versions[prevHistory.versions.length - 1];
        if (
          JSON.stringify(lastVersion.measurements) === JSON.stringify(currentMeasurement) &&
          JSON.stringify(lastVersion.selectedImages) === JSON.stringify(currentSelectedImages) &&
          JSON.stringify(lastVersion.extraData) === JSON.stringify(currentExtraData)
        ) {
          return prevState;
        }
        const newVersion = createNewVersion();
        const newVersions = [...prevHistory.versions, newVersion];
        return {
          ...prevState,
          measurementHistory: {
            ...prevState.measurementHistory,
            [baseSubId]: {
              versions: newVersions,
              activeVersionIndex: newVersions.length - 1,
            },
          },
        };
      }
    });
  };

  return (
    <div className="p-[25px] m-4 md:m-0 rounded-xl bg-cardBg md:w-[611px] w-[20rem] shadow-lg border font-font text-black relative">
      {/* Header with title and Sub ID */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-heading">{selectedVarietyHeading}</h3>
          {currentSubId && (
            <p className="text-xs text-gray-600">Sub ID: {currentSubId}</p>
          )}
        </div>
      </div>

      {formState.customerDetails?.id && (
        <MeasurementManager
          customer={formState.customerDetails}
          selectedVariety={selectedVariety}
          formState={formState}
          onMeasurementSelect={(measurementData, baseSubId, versionIndex) => {
            if (!measurementData) {
              setFormState((prev) => ({
                ...prev,
                measurement: {},
                selectedImages: [],
              }));
              if (updateExtraData) updateExtraData({});
              return;
            }
            setFormState((prev) => {
              const newHistory = { ...prev.measurementHistory };
              if (newHistory[baseSubId]) {
                newHistory[baseSubId].activeVersionIndex = versionIndex;
              }
              return {
                ...prev,
                measurement: measurementData.measurements,
                selectedImages: measurementData.selectedImages || [],
                measurementHistory: newHistory,
              };
            });
            if (updateExtraData && measurementData.extraData) {
              updateExtraData(measurementData.extraData);
            }
          }}
        />
      )}

      <div className="grid md:grid-cols-2 md:gap-8 md:w-[27rem]">
        <div className="p-4 rounded-xl border shadow-lg bg-cardBg">
          {measurementFields[selectedVariety]?.map((field) => {
            const uniqueFieldId = getUniqueFieldId(selectedVariety, field);
            return (
              <div key={uniqueFieldId} className="relative mb-4">
                <input
                  type="number"
                  id={uniqueFieldId}
                  value={formState.measurement?.[uniqueFieldId] ?? ""}
                  onChange={(e) => handleInputChange(uniqueFieldId, e.target.value)}
                  placeholder=" "
                  className="peer w-full px-4 pt-6 pb-2 border rounded-xl bg-inputBg text-black text-sm focus:outline-none focus:ring-blue-500"
                  required
                />
                <label
                  htmlFor={uniqueFieldId}
                  className="absolute left-4 top-3 z-10 bg-cardBg px-1 text-sm transition-all duration-200 
                             peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm 
                             peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs 
                             peer-valid:top-0 peer-valid:left-2 peer-valid:text-xs"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {field}
                </label>
              </div>
            );
          })}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default MeasurementForm;

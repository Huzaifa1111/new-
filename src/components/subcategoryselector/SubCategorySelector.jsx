import React, { useState, useEffect, useCallback, useMemo } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import کالر from "./کالر";
import پٹی from "./پٹی";
import کف from "./کف";
import جیب from "./جیب";
import شلوار from "./شلوار";
import سلائی from "./سلائی";
import کٹر from "./کٹر";
import بٹن from "./بٹن";

function SubCategorySelector({
  subCategoryImages,
  selectedSubCategory,
  handleImageClick,
  setSelectedSubCategory,
  selectedImages,
  updateViewOrder,
  updateViewOrderPatti,
  setFormState,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formState, setLocalFormState] = useState({
    کالر: { measurement: "", collarPosition: "" },
    پٹی: { design: "", length: "", width: "", buttons: "", selectedImage: "" },
    کف: { cuffImages: [], selectedDropdownCuff: "", styleSelections: [] },
    جیب: {
      pocketImages: [],
      noOfPockets: "",
      pocketSize: "",
      kandeSeJaib: "",
      styleSelections: [],
    },
    شلوار: { measurement: "" },
  });
  const [selectedButtons, setSelectedButtons] = useState({});
  const [hoverIndex, setHoverIndex] = useState(null);
  const [completedTabs, setCompletedTabs] = useState({});

  const orderedSubCategories = [
    "کالر",
    "پٹی",
    "کف",
    "جیب",
    "شلوار",
    "سلائی",
    "بٹن",
    "کٹر",
  ];

  // Memoize props to prevent unnecessary re-renders
  const memoizedSelectedImages = useMemo(() => selectedImages || [], [selectedImages]);
  const memoizedUpdateViewOrderPatti = useCallback(
    (data) => {
      console.log("updateViewOrderPatti called with:", data);
      updateViewOrderPatti(data);
    },
    [updateViewOrderPatti]
  );

  // Parent-side updater for all subcategories
  const updateData = useCallback(
    (key, data) => {
      setLocalFormState((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...data },
      }));
      setFormState((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...data },
      }));
    },
    [setFormState]
  );

  // Handlers for collar and measurement
  const handleMeasurementChange = useCallback(
    (subCategory, value) => {
      updateData(subCategory, { measurement: value });
    },
    [updateData]
  );

  const handleCollarPosition = useCallback(
    (position) => {
      updateData("کالر", { collarPosition: position });
    },
    [updateData]
  );

  // Update parent components when formState changes
  useEffect(() => {
    if (selectedSubCategory === "کالر") {
      updateViewOrder({
        selectedMeasurement: formState.کالر.measurement,
        collarPosition: formState.کالر.collarPosition,
      });
    }
  }, [formState.کالر, selectedSubCategory, updateViewOrder]);

  // Track completed tabs
  useEffect(() => {
    if (!selectedSubCategory) return;

    let isCompleted = false;
    if (["سلائی", "بٹن", "کٹر"].includes(selectedSubCategory)) {
      isCompleted = !!selectedButtons[selectedSubCategory];
    } else if (selectedSubCategory === "کف") {
      isCompleted =
        formState.کف.cuffImages.length > 0 &&
        formState.کف.selectedDropdownCuff.trim().length > 0 &&
        formState.کف.styleSelections.length > 0;
    } else if (selectedSubCategory === "جیب") {
      isCompleted =
        formState.جیب.pocketImages.length > 0 &&
        formState.جیب.noOfPockets.trim().length > 0 &&
        formState.جیب.pocketSize.trim().length > 0 &&
        formState.جیب.kandeSeJaib.trim().length > 0;
    } else {
      const hasImage = memoizedSelectedImages.some(
        (img) => img.buttonName === selectedSubCategory
      );
      const hasMeasurement =
        ["کالر", "شلوار"].includes(selectedSubCategory) &&
        formState[selectedSubCategory]?.measurement?.trim().length > 0;
      const hasCollarPosition =
        selectedSubCategory === "کالر" && !!formState.کالر.collarPosition;
      const hasPattiOptions =
        selectedSubCategory === "پٹی" &&
        formState.پٹی.design &&
        formState.پٹی.length &&
        formState.پٹی.width &&
        formState.پٹی.buttons &&
        formState.پٹی.selectedImage;
      isCompleted =
        hasImage || hasMeasurement || hasCollarPosition || hasPattiOptions;
    }

    setCompletedTabs((prev) => ({
      ...prev,
      [selectedSubCategory]: isCompleted,
    }));
  }, [selectedSubCategory, memoizedSelectedImages, formState, selectedButtons]);

  // Slider positions for desktop nav
  const activeIndex = orderedSubCategories.findIndex(
    (cat) => cat === selectedSubCategory
  );
  const sliderIndex =
    hoverIndex !== null ? hoverIndex : activeIndex >= 0 ? activeIndex : 0;
  const col = sliderIndex % 4;
  const row = Math.floor(sliderIndex / 4);
  const sliderX = col * 100;
  const sliderY = row * 52;

  // Handle subcategory selection
  const handleSubCategoryClick = useCallback((category) => {
    console.log("Selected subcategory:", category);
    setSelectedSubCategory(category);
    setDropdownOpen(false);
  }, [setSelectedSubCategory]);

  // Handle special buttons (سلائی, بٹن, کٹر)
  const handleButtonClick = useCallback(
    (buttonName, subCategory) => {
      setSelectedButtons((prev) => ({
        ...prev,
        [subCategory]: buttonName,
      }));
      updateData(subCategory, { [subCategory]: buttonName });
    },
    [updateData]
  );

  return (
    <div className="p-8 rounded-xl bg-cardBg border shadow-lg w-[20rem] ml-3 md:ml-6 md:w-[595px] mx-0 font-nastaliq relative z-10">
      <h3 className="text-lg font-bold text-heading mb-4">
        ذیلی زمرہ منتخب کریں
      </h3>

      {/* Mobile Dropdown */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <button
          className="text-2xl"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <HiMenuAlt3 />
        </button>
        <h4 className="text-lg font-bold">ذیلی زمرہ جات</h4>
      </div>
      {dropdownOpen && (
        <div className="flex flex-col space-y-4 md:hidden z-20">
          {orderedSubCategories.map((category) => (
            <button
              key={category}
              className={`btn px-4 rounded-lg w-full text-right ${
                selectedSubCategory === category
                  ? "bg-black text-white"
                  : "bg-btnBg text-white"
              } transition-all duration-300 transform hover:scale-105`}
              onClick={() => handleSubCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Desktop Grid */}
      <div className="hidden md:block border rounded-xl relative z-10">
        <div className="subcat-grid relative">
          {orderedSubCategories.map((category, idx) => {
            const radioId = `subcategory-${idx}`;
            const isActive = category === selectedSubCategory;
            return (
              <React.Fragment key={category}>
                <input
                  type="radio"
                  id={radioId}
                  name="subcategory"
                  className="hidden"
                  checked={isActive}
                  onChange={() => handleSubCategoryClick(category)}
                />
                <label
                  htmlFor={radioId}
                  className={`subcat-label ${
                    completedTabs[category] ? "subcat-label-completed" : ""
                  } ${isActive ? "animate-borderPulse" : ""}`}
                  onMouseEnter={() => setHoverIndex(idx)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {category}
                </label>
              </React.Fragment>
            );
          })}
          <div
            className="subcat-slidebar border"
            style={{ transform: `translate(${sliderX}%, ${sliderY}px)` }}
          />
        </div>
      </div>

      {/* Render sub-category components */}
      {selectedSubCategory === "کالر" && (
        <کالر
          subCategoryImages={subCategoryImages}
          selectedImages={memoizedSelectedImages}
          handleImageClick={handleImageClick}
          selectedMeasurement={formState.کالر.measurement}
          handleMeasurementChange={(value) =>
            handleMeasurementChange("کالر", value)
          }
          collarPosition={formState.کالر.collarPosition}
          handleCollarPosition={handleCollarPosition}
          selectedSubCategory={selectedSubCategory}
          updateViewOrder={updateViewOrder}
        />
      )}

      {selectedSubCategory === "پٹی" && (
        <پٹی
          selectedImages={memoizedSelectedImages}
          handleImageClick={handleImageClick}
          selectedSubCategory={selectedSubCategory}
          updateViewOrderPatti={memoizedUpdateViewOrderPatti}
        />
      )}

      {selectedSubCategory === "کف" && (
        <کف
          subCategoryImages={subCategoryImages}
          selectedSubCategory={selectedSubCategory}
          handleImageClick={handleImageClick}
          updateData={updateData}
          formState={formState.کف}
        />
      )}

      {selectedSubCategory === "جیب" && (
        <جیب
          subCategoryImages={subCategoryImages}
          selectedSubCategory={selectedSubCategory}
          handleImageClick={handleImageClick}
          formState={formState.جیب}
          updateData={updateData}
        />
      )}

      {selectedSubCategory === "شلوار" && (
        <شلوار
          subCategoryImages={subCategoryImages}
          selectedSubCategory={selectedSubCategory}
          handleImageClick={handleImageClick}
          formState={formState}
          updateData={updateData}
          handleMeasurementChange={(value) =>
            handleMeasurementChange("شلوار", value)
          }
        />
      )}

      {selectedSubCategory === "سلائی" && (
        <سلائی
          selectedSubCategory={selectedSubCategory}
          handleButtonClick={handleButtonClick}
          formState={formState}
          updateData={updateData}
        />
      )}

      {selectedSubCategory === "بٹن" && (
        <بٹن
          selectedSubCategory={selectedSubCategory}
          handleButtonClick={handleButtonClick}
          formState={formState}
          updateData={updateData}
        />
      )}

      {selectedSubCategory === "کٹر" && (
        <کٹر
          selectedSubCategory={selectedSubCategory}
          handleButtonClick={handleButtonClick}
          formState={formState}
          updateData={updateData}
        />
      )}
    </div>
  );
}

export default SubCategorySelector;
import React, { useState, useEffect, useRef, memo } from "react";
import { HiChevronDown } from "react-icons/hi";
import PropTypes from "prop-types";

const translations = {
  imageNotAvailable: "تصویر دستیاب نہیں",
  lengthLabel: "لمبائی",
  widthLabel: "چوڑائی",
  buttonsLabel: "بٹنوں کی تعداد",
};

function پٹی({
  selectedImages = [],
  handleImageClick,
  selectedSubCategory,
  updateViewOrderPatti,
}) {
  const pattiImages = [
    "/assets/gol pati.svg",
    "/assets/gum pati 2.svg",
    "/assets/gum pati 3.svg",
    "/assets/gum pati final.svg",
    "/assets/gum pati.svg",
    "/assets/nok pato.svg",
    "/assets/lopi wai pati.svg",
  ];

  const lengthOptions = [
    "5", "5 1/2", "6", "6 1/2", "7", "7 1/2", "8", "8 1/2", "9", "9 1/2",
    "10", "10 1/2", "11", "11 1/2", "12", "12 1/2", "13", "13 1/2", "14", "14 1/2",
    "15", "15 1/2", "16", "16 1/2", "17", "17 1/2", "18", "18 1/2", "19", "19 1/2", "20"
  ];

  const widthOptions = ["1/2", "3/4", "1", "1 1/4", "1 1/2", "1 3/4", "2"];
  const buttonCountOptions = ["4", "5", "6", "7", "8", "9", "10", "11"];
  const buttonOptions = ["پٹی پر ڈیزائن", "پٹی پر کڑھائی"];

  const [dropdownStates, setDropdownStates] = useState({
    length: false,
    width: false,
    buttons: false,
  });

  const [selectedValues, setSelectedValues] = useState({
    design: "",
    length: "",
    width: "",
    buttons: "",
  });

  const dropdownRefs = {
    length: useRef(null),
    width: useRef(null),
    buttons: useRef(null),
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Outside click detected in پٹی");
      const newStates = { ...dropdownStates };
      let shouldUpdate = false;

      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (dropdownStates[key]) {
            newStates[key] = false;
            shouldUpdate = true;
          }
        }
      });

      if (shouldUpdate) {
        setDropdownStates(newStates);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownStates]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const { design, length, width, buttons } = selectedValues;
      const selectedPattiImage = Array.isArray(selectedImages)
        ? selectedImages.find((img) => img.buttonName === "پٹی")?.imgSrc || ""
        : "";
      console.log("Calling updateViewOrderPatti with:", {
        selectedImage: selectedPattiImage,
        design,
        length,
        width,
        buttons,
      });
      updateViewOrderPatti({
        selectedImage: selectedPattiImage,
        design,
        length,
        width,
        buttons,
      });
    }, 300); // Debounce to reduce re-renders

    return () => clearTimeout(handler);
  }, [selectedValues, selectedImages, updateViewOrderPatti]);

  const toggleDropdown = (dropdown) => {
    console.log(`Toggling dropdown: ${dropdown}`);
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleSelect = (dropdown, value) => {
    console.log(`Selected ${dropdown}: ${value}`);
    setSelectedValues((prev) => ({
      ...prev,
      [dropdown]: value,
    }));
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: false,
    }));
  };

  const handleDesignOptionChange = (option) => {
    console.log(`Design option changed: ${option}`);
    setSelectedValues((prev) => ({
      ...prev,
      design: option,
    }));
  };

  const Dropdown = memo(({ label, options, dropdownKey }) => (
    <div ref={dropdownRefs[dropdownKey]} className="relative w-full z-[100] pointer-events-auto">
      <button
        type="button"
        data-testid={`dropdown-button-${dropdownKey}`}
        onClick={(e) => {
          console.log(`Dropdown button clicked: ${dropdownKey}`);
          toggleDropdown(dropdownKey);
        }}
        aria-expanded={dropdownStates[dropdownKey]}
        aria-controls={`dropdown-${dropdownKey}`}
        aria-haspopup="true"
        className="flex justify-between items-center w-full h-[3.3rem] px-3 bg-white text-black border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus-within:ring-2 focus-within:ring-green-600 pointer-events-auto"
      >
        <span>{selectedValues[dropdownKey] || label}</span>
        <HiChevronDown
          className={`w-4 h-4 transition-transform ${
            dropdownStates[dropdownKey] ? "rotate-180" : ""
          }`}
        />
      </button>

      {dropdownStates[dropdownKey] && (
        <div
          id={`dropdown-${dropdownKey}`}
          className="absolute z-[100] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto pointer-events-auto"
        >
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(dropdownKey, option)}
              className="block w-full px-4 py-2 text-right text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none pointer-events-auto"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  ));

  return (
    <div className="patti-component mt-8 font-nastaliq overflow-visible z-[0]">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {/* Patti Images */}
        <div className="col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full sm:w-96">
            {pattiImages.map((imgSrc, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={imgSrc}
                  alt={`پٹی ڈیزائن ${index + 1}`}
                  className={`w-36 h-24 p-3 cursor-pointer border rounded-3xl object-contain transition-all duration-300 bg-white ${
                    selectedImages.some(
                      (img) => img.imgSrc === imgSrc && img.buttonName === "پٹی"
                    )
                      ? "border-green-600 border-2"
                      : "border-white border"
                  }`}
                  onClick={() => handleImageClick(imgSrc, selectedSubCategory)}
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                    e.target.alt = translations.imageNotAvailable;
                  }}
                />
                {selectedImages.some(
                  (img) => img.imgSrc === imgSrc  === "پٹی"
                ) && (
                  <div className="mt-2 text-center text-sm text-gray-600">
                    {selectedValues.length && (
                      <p>
                        لمبائی: <strong>{selectedValues.length}</strong>
                      </p>
                    )}
                    {selectedValues.width && (
                      <p>
                        چوڑائی: <strong>{selectedValues.width}</strong>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dropdowns and Radio Buttons */}
        <div className="flex flex-col space-y-3 z-[999]">
          <div className="z-[999]">
          <Dropdown
            label={translations.lengthLabel}
            options={lengthOptions}
            dropdownKey="length"
          />
          </div>
          <div className="z-[555]">
          <Dropdown
            label={translations.widthLabel}
            options={widthOptions}
            dropdownKey="width"
          />
          </div>
          <Dropdown
            label={translations.buttonsLabel}
            options={buttonCountOptions}
            dropdownKey="buttons"
          />
          <fieldset>
            <legend className="sr-only">ڈیزائن آپشن</legend>
            <div className="flex flex-col space-y-2 mt-2">
              {buttonOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <input
                    type="radio"
                    name="designOption"
                    value={option}
                    checked={selectedValues.design === option}
                    onChange={() => handleDesignOptionChange(option)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
}

پٹی.propTypes = {
  selectedImages: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string,
      buttonName: PropTypes.string,
    })
  ),
  handleImageClick: PropTypes.func.isRequired,
  selectedSubCategory: PropTypes.string.isRequired,
  updateViewOrderPatti: PropTypes.func.isRequired,
};

export default پٹی;
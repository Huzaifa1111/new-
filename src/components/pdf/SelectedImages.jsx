import React, { useMemo } from "react";

const SelectedImages = ({
  selectedImages = [],
  selectedDropdown = "",
  buttonSelection = "",
  pattiOptions = {},
  selectedDropdownCuff = "",
  cuffLength = "",
  cuffImages = [],
  pocketImages = [],
  pocketDropdowns = {},
  styleSelections = [],
  pattiImages = [],
  shalwaarImage = [],
  shalwaarOptions = {},
  silaiSelection = "غیز منتخب",
  buttonSelectionNew = "غیز منتخب",
  cutterSelections = [],
  pocketButtonSelection = "غیز منتخب",
}) => {
  const groupedImages = useMemo(() => {
    const grouped = {};
    const addToGroup = (img, groupName, extra = {}) => {
      if (!img?.imgSrc || !img?.buttonName) return;
      grouped[groupName] = grouped[groupName] || [];
      grouped[groupName].push({ ...img, ...extra });
    };

    selectedImages.forEach((img) => {
      if (img.buttonName.includes("کالر")) {
        addToGroup(img, "کالر");
      } else if (img.buttonName.includes("پٹی")) {
        addToGroup(img, "پٹی", {
          length: pattiOptions.length,
          width: pattiOptions.width,
        });
      } else if (img.buttonName.includes("کف")) {
        addToGroup(img, "کف");
      } else if (img.buttonName.includes("جیب")) {
        addToGroup(img, "جیب");
      } else if (img.buttonName.includes("شلوار")) {
        addToGroup(img, "شلوار", {
          width: shalwaarOptions.panchaChorai,
        });
      }
    });
    // also include the extra arrays
    cuffImages.forEach((img) => addToGroup(img, "کف"));
    pocketImages.forEach((img) => addToGroup(img, "جیب"));
    pattiImages.forEach((img) =>
      addToGroup(img, "پٹی", {
        length: pattiOptions.length,
        width: pattiOptions.width,
      })
    );
    shalwaarImage.forEach((img) =>
      addToGroup(img, "شلوار", {
        width: shalwaarOptions.panchaChorai,
      })
    );

    return grouped;
  }, [
    selectedImages,
    pattiOptions.length,
    pattiOptions.width,
    cuffImages,
    pocketImages,
    pattiImages,
    shalwaarImage,
    shalwaarOptions.panchaChorai,
  ]);

  return (
    <div className="pl-[4rem] grid grid-cols-5 gap-x-2 gap-y-1">
      {Object.entries(groupedImages).map(([groupName, images]) => (
        <div key={groupName} className="mb-4">
          <div className="space-y-1"> {/* small vertical gap */}
            {images.map((img, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-1">
                <div className="w-16 h-16 overflow-hidden rounded ">
                  <img
                    src={img.imgSrc}
                    alt={img.buttonName}
                    className="object-contain w-full h-full "
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.jpg";
                    }}
                  />
                </div>
                <div className="text-xs text-center">
                  <p>{img.buttonName}</p>
                  {img.length && <p>لَمبائی: {img.length}</p>}
                  {img.width && <p>چوڑائی: {img.width}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Group-specific options */}
          {groupName === "کالر" && selectedDropdown && (
            <p className="mt-1 text-sm">چوڑائی: {selectedDropdown}</p>
          )}
          {groupName === "کف" && (
            <div className="mt-1 text-sm space-y-1">
              {cuffLength && <p>لَمبائی: {cuffLength}</p>}
              {selectedDropdownCuff && (
                <p>چوڑائی: {selectedDropdownCuff}</p>
              )}
            </div>
          )}
          {groupName === "جیب" && (
            <div className="mt-1 text-sm space-y-1">
              {pocketDropdowns.frontJaib && (
                <p>فرنٹ جیب: {pocketDropdowns.frontJaib}</p>
              )}
              {pocketDropdowns.pocketSize && (
                <p>سائز: {pocketDropdowns.pocketSize}</p>
              )}
              {pocketDropdowns.kandeSeJaib && (
                <p>کندھے سے جیب: {pocketDropdowns.kandeSeJaib}</p>
              )}
            </div>
          )}
          {groupName === "شلوار" && (
            <p className="mt-1 text-sm">
              پانچا چوڑائی: {shalwaarOptions.panchaChorai}
            </p>
          )}
        </div>
      ))}

      {/* Styles & other selections */}
      {styleSelections.length > 0 && (
        <div className="mt-2">
          {pattiOptions.design && (
            <p className="text-sm mb-1">ڈیزائن: {pattiOptions.design}</p>
          )}
          {pocketDropdowns.noOfPockets !== "غیز منتخب" && (
            <p className="text-sm mb-1">
              فرنٹ جیب: {pocketDropdowns.noOfPockets}
            </p>
          )}
          <ul className="mt-2 text-sm list-disc list-inside space-y-1">
            {styleSelections.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          {silaiSelection !== "غیز منتخب" && (
            <p className="text-sm mt-1">سلائی: {silaiSelection}</p>
          )}
          {buttonSelectionNew !== "غیز منتخب" && (
            <p className="text-sm">بٹن: {buttonSelectionNew}</p>
          )}
          {cutterSelections.length > 0 && (
            <ul className="text-sm list-disc list-inside mt-1 space-y-1">
              {cutterSelections.map((c, idx) => (
                <li key={idx}>کٹر: {c}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectedImages;

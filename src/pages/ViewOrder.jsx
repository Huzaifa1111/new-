import React, { useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";

// Details1 Component
const Details1 = ({ details }) => {
  return (
    <div className="w-full border border-white shadow-2xl backdrop-blur-md rounded-3xl p-6 text-black font-medium">
      <h2 className="text-2xl font-semibold mb-2 border-b">Details</h2>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(details).length > 0 ? (
          Object.entries(details).map(([key, value]) => (
            <div key={key} className="bg-gray-100 p-[5px] rounded-lg">
              <strong className="block text-sm text-gray-600 mb-1">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </strong>
              <span className="text-gray-800">{value}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center">No details provided</p>
        )}
      </div>
    </div>
  );
};

// CustomerDetails1 Component
const CustomerDetails1 = ({ customerDetails = {}, details = {} }) => {
  const { name = "N/A", phone = "N/A", bookNo = "N/A", id = "N/A" } = customerDetails;
  const { deliveryDate = "N/A", bookingDate = "N/A" } = details;

  return (
    <div className="flex justify-center pt-3">
      <div className="text-black font-medium" style={{ fontFamily: 'Amiri, serif' }}>
        {id && (
          <div className="absolute top-2 right-2 bg-btnBg text-white px-3 py-1 rounded-lg text-sm">
            ID: {id}
          </div>
        )}
        <div className="space-y-4 text-sm">
          <div className="flex items-center border-b border-gray-300 pb-2">
            <div className="w-1/2 flex justify-between pr-4 border-r border-gray-300">
              <strong>Name:</strong>
              <span>{name}</span>
            </div>
            <div className="w-1/2 flex justify-between pl-4">
              <strong>Phone:</strong>
              <span>{phone}</span>
            </div>
          </div>
          <div className="flex flex-nowrap items-center border-b border-gray-300 pb-2">
            <div className="w-1/3 flex justify-between pr-4 border-r border-gray-300 whitespace-nowrap">
              <strong>Delivery Date:</strong>
              <span>{deliveryDate}</span>
            </div>
            <div className="w-1/3 flex justify-between px-4 border-r border-gray-300 whitespace-nowrap">
              <strong>Booking Date:</strong>
              <span>{bookingDate}</span>
            </div>
            <div className="w-1/3 flex justify-between pl-4 whitespace-nowrap">
              <strong>Booking No:</strong>
              <span>{bookNo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Measurements Component
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
    <div className="flex justify-left pt-4">
      <div className="text-black font-medium" style={{ fontFamily: 'Amiri, serif' }}>
        {Object.entries(groupedMeasurements).map(([category, fields]) => (
          <div key={category} className="mb-4 last:mb-0">
            <h3 className="text-lg font-semibold mb-2">
              {getFullCategoryName(category, fields)}
            </h3>
            <div className="space-y-2">
              {Object.entries(fields).map(([field, value]) => (
                <div
                  key={`${category}_${field}`}
                  className="bg-gray-100 p-1 rounded shadow-inner text-center"
                >
                  <strong className="block text-xs text-gray-700">{field}</strong>
                  <span className="text-[10px] text-gray-900">{value}</span>
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

// SelectedImages Component (now lays out 3-per-row)
const SelectedImages = ({
  selectedImages = [],
  selectedDropdown = "",
  buttonSelection = "",
  pattiOptions = {},
  selectedDropdownCuff = "",
  cuffImages = [],
  pocketImages = [],
  pocketDropdowns = {},
  styleSelections = [],
  pattiImages = [],
  shalwaarImage = [],
  shalwaarOptions = {},
  pocketButtonSelection = "غیز منتخب",
}) => {
  const groupedImages = useMemo(() => {
    const groups = {};

    const add = (img, groupName, extra = {}) => {
      if (!img?.imgSrc || !img?.buttonName) return;
      groups[groupName] = groups[groupName] || [];
      groups[groupName].push({ ...img, ...extra });
    };

    selectedImages.forEach(img => {
      if (img.buttonName.includes("کالر")) add(img, "کالر");
      else if (img.buttonName.includes("پٹی")) add(img, "پٹی", {
        length: pattiOptions.length,
        width: pattiOptions.width
      });
      else if (img.buttonName.includes("کف")) add(img, "کف", {
        length: img.length,
        width: img.width
      });
      else if (img.buttonName.includes("جیب")) add(img, "جیب");
      else if (img.buttonName.includes("شلوار")) add(img, "شلوار", {
        width: shalwaarOptions.panchaChorai
      });
    });

    cuffImages.slice(0, 2).forEach(img => add(img, "کف", { length: img.length, width: img.width }));
    pocketImages.forEach(img => add(img, "جیب"));
    pattiImages.forEach(img => add(img, "پٹی", { length: pattiOptions.length, width: pattiOptions.width }));
    shalwaarImage.forEach(img => add(img, "شلوار", { width: shalwaarOptions.panchaChorai }));

    return groups;
  }, [selectedImages, cuffImages, pocketImages, pattiImages, shalwaarImage, pattiOptions, shalwaarOptions]);

  return (
    <div className="pl-4">
      {Object.entries(groupedImages).map(([group, images]) => (
        <div key={group} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{group}</h3>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 overflow-hidden rounded-lg">
                  <img
                    src={img.imgSrc}
                    alt={img.buttonName}
                    className="object-cover w-full h-full"
                    onError={e => {
                      e.currentTarget.src = "/fallback-image.jpg";
                      e.currentTarget.alt = "تصویر دستیاب نہیں";
                    }}
                  />
                </div>
                <div className="mt-1 text-xs text-center space-y-1">
                  <p>{img.buttonName}</p>
                  {img.length && <p>لंबائی: {img.length}</p>}
                  {img.width && <p>چوڑائی: {img.width}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Group-specific options below the grid */}
          {group === "کالر" && selectedDropdown && (
            <p className="mt-2 text-sm">چنیدہ: {selectedDropdown}</p>
          )}
          {group === "کالر" && buttonSelection && (
            <p className="text-sm">آپشن: {buttonSelection}</p>
          )}
          {group === "پٹی" && (
            <div className="mt-2 text-sm space-y-1">
              {pattiOptions.design && <p>ڈیزائن: {pattiOptions.design}</p>}
              {pattiOptions.length && <p>طول: {pattiOptions.length}</p>}
              {pattiOptions.width && <p>چوڑائی: {pattiOptions.width}</p>}
              {pattiOptions.buttons && <p>بٹن: {pattiOptions.buttons}</p>}
            </div>
          )}
          {group === "کف" && selectedDropdownCuff && (
            <p className="mt-2 text-sm">چنیدہ: {selectedDropdownCuff}</p>
          )}
          {group === "جیب" && (
            <div className="mt-2 text-sm space-y-1">
              {pocketDropdowns.noOfPockets && <p>فرنٹ جیب: {pocketDropdowns.noOfPockets}</p>}
              {pocketDropdowns.pocketSize && <p>سائز: {pocketDropdowns.pocketSize}</p>}
              {pocketDropdowns.kandeSeJaib && <p>کندھے سے: {pocketDropdowns.kandeSeJaib}</p>}
            </div>
          )}
          {group === "شلوار" && (
            <p className="mt-2 text-sm">پانچا چوڑائی: {shalwaarOptions.panchaChorai}</p>
          )}
        </div>
      ))}

      {styleSelections.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Style Selections</h3>
          <ul className="mt-2 text-sm list-disc list-inside">
            {styleSelections.map((style, i) => (
              <li key={i}>{style}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// ViewOrder Component
const ViewOrder = () => {
  const location = useLocation();
  const orderData = location.state;

  if (!orderData) {
    return <Navigate to="/orderform" replace />;
  }

  const {
    customerDetails = {},
    bookingNo = "",
    type = "",
    measurement = {},
    selectedImages = [],
    details = {},
    collar = {},
    patti = {},
    cuff = {},
    pocket = {},
    shalwaar = {},
    silai = {},
    button = {},
    cutter = {},
  } = orderData;

  const groupedMeasurements = useMemo(() => {
    return Object.entries(measurement).reduce((acc, [uid, val]) => {
      if (!val) return acc;
      const [cat, ...rest] = uid.split("_");
      acc[cat] = acc[cat] || {};
      acc[cat][rest.join("_")] = val;
      return acc;
    }, {});
  }, [measurement]);

  const collarMeasurement = collar.selectedMeasurement || "";
  const collarPositionLabel = useMemo(() => {
    switch (collar.collarPosition) {
      case "above": return "کالر پر بٹن";
      case "center": return "کالر پر ڈیزائن";
      case "below": return "کالر پر کڑھائی";
      default: return "";
    }
  }, [collar.collarPosition]);

  const pattiOptions = useMemo(() => ({
    design: patti.design || "",
    length: patti.length || "",
    width: patti.width || "",
    buttons: patti.buttons || "",
  }), [patti]);

  const pattiImages = useMemo(() => {
    const src = selectedImages.find(img => img.buttonName === "پٹی")?.imgSrc;
    return src ? [{ imgSrc: src, buttonName: "پٹی" }] : [];
  }, [selectedImages]);

  const cuffImages = useMemo(() =>
    (cuff.cuffImages || []).map(img => ({
      imgSrc: img.imgSrc || "/fallback-cuff.jpg",
      buttonName: img.buttonName || "کف",
      length: img.length,
      width: img.selectedDropdownCuff,
    }))
  , [cuff.cuffImages]);

  const selectedDropdownCuff = cuff.selectedDropdownCuff || "";
  const cuffStyleSelections = cuff.styleSelections || [];

  const pocketImages = useMemo(() => {
    const imgs = (pocket.pocketImages || []).map((img, i) => ({
      imgSrc: img.imgSrc || "/fallback-pocket.jpg",
      buttonName: `جیب${i === 0 ? " (اوپر)" : " (پہلو)"}`,
    }));
    return imgs.length >= 2
      ? imgs.slice(0, 2)
      : [
          imgs[0] || { imgSrc: "/fallback-pocket.jpg", buttonName: "جیب (اوپر)" },
          imgs[1] || { imgSrc: "/fallback-pocket.jpg", buttonName: "جیب (پہلو)" },
        ];
  }, [pocket.pocketImages]);

  const pocketDropdowns = useMemo(() => ({
    noOfPockets: pocket.noOfPockets || "غیز منتخب",
    pocketSize: pocket.pocketSize || "غیز منتخب",
    kandeSeJaib: pocket.kandeSeJaib || "غیز منتخب",
  }), [pocket]);

  const shalwaarImage = useMemo(() => {
    const src = shalwaar.selectedImage;
    return src ? [{ imgSrc: src, buttonName: "شلوار" }] : [];
  }, [shalwaar.selectedImage]);

  const shalwaarOptions = useMemo(() => ({
    panchaChorai: shalwaar.panchaChorai || "غیز منتخب",
  }), [shalwaar]);

  const silaiSelection = silai.selectedButton || "غیز منتخب";
  const buttonSelectionNew = button.selectedButton || "غیز منتخب";
  const cutterSelections = cutter.selectedButtons || [];

  const buttonSelections = useMemo(() => {
    const sels = [];
    if (silaiSelection !== "غیز منتخب") sels.push(`سلائی: ${silaiSelection}`);
    if (buttonSelectionNew !== "غیز منتخب") sels.push(`بٹن: ${buttonSelectionNew}`);
    cutterSelections.forEach(s => sels.push(`کٹر: ${s}`));
    return sels;
  }, [silaiSelection, buttonSelectionNew, cutterSelections]);

  const allStyleSelections = useMemo(() => [
    ...cuffStyleSelections,
    ...pocketDropdowns ? [pocketDropdowns.noOfPockets] : [],
  ], [cuffStyleSelections, pocketDropdowns]);

  const filteredSelectedImages = useMemo(() =>
    selectedImages.filter(img => !["سلائی", "بٹن", "کٹر"].includes(img.buttonName))
  , [selectedImages]);

  return (
    <div className="pt-[12px] pr-[12px] pb-[0px] min-h-screen bg-white font-font">
      <CustomerDetails1
        customerDetails={customerDetails}
        details={{ bookingNo, type }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
        <Measurements
          groupedMeasurements={groupedMeasurements}
          buttonSelections={buttonSelections}
        />
        <SelectedImages
          selectedImages={filteredSelectedImages}
          selectedDropdown={collarMeasurement}
          buttonSelection={collarPositionLabel}
          pattiOptions={pattiOptions}
          selectedDropdownCuff={selectedDropdownCuff}
          cuffImages={cuffImages}
          pocketImages={pocketImages}
          pocketDropdowns={pocketDropdowns}
          styleSelections={allStyleSelections}
          pattiImages={pattiImages}
          shalwaarImage={shalwaarImage}
          shalwaarOptions={shalwaarOptions}
          pocketButtonSelection={pocketDropdowns.noOfPockets}
        />
      </div>

      <Details1 details={details} />
    </div>
  );
};

export default ViewOrder;

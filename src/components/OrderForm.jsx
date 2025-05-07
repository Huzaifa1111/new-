import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import Layout from "../components/Layout";
import CustomerDetails from "../components/CustomerDetails";
import VarietySelector from "../components/VarietySelector";
import SubCategorySelector from "./subcategoryselector/SubCategorySelector";
import MeasurementForm from "../components/MeasurementForm";
import Details from "../components/Details";
import CustomerDetails1 from "../components/pdf/CustomerDetails1";
import Measurements from "../components/pdf/Measurements1";
import SelectedImages from "../components/pdf/SelectedImages";
import Details1 from "../components/pdf/Details1";
import html2pdf from "html2pdf.js";

function OrderForm({
  formState: initialFormState,
  setFormState,
  customers,
  setCustomers,
  onSaveOrder,
  onCreateOrder,
  onAddCustomer,
}) {
  const [formState, setLocalFormState] = useState({
    ...initialFormState,
    shalwaar: initialFormState.shalwaar || {},
    silai: initialFormState.silai || {},
    button: initialFormState.button || {},
    cutter: initialFormState.cutter || {},
    measurement: initialFormState.measurement || {},
    selectedImages: initialFormState.selectedImages || [],
    measurementHistory: initialFormState.measurementHistory || {},
  });
  const [selectedVariety, setSelectedVariety] = useState("Pant");
  const [selectedVarietyHeading, setSelectedVarietyHeading] = useState("Enter Pant Measurements");
  const [selectedSubCategory, setSelectedSubCategory] = useState("کالر");
  const [editCustomer, setEditCustomer] = useState(null);
  const [details, setDetails] = useState({});
  const [currentSubId, setCurrentSubId] = useState("");
  const measurementFormRef = useRef(null);
  const printRef = useRef(null);
  const navigate = useNavigate();

  const updateViewOrder = useCallback((data) => {
    setLocalFormState((prev) => ({
      ...prev,
      collar: { ...prev.collar, ...data },
    }));
  }, []);

  const updateViewOrderPatti = useCallback((data) => {
    setLocalFormState((prev) => ({
      ...prev,
      patti: { ...prev.patti, ...data },
    }));
  }, []);

  const generateSubId = (variety) => `${variety.toLowerCase()}-${Date.now()}`;
  const scrollToForm = () => measurementFormRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleVarietyClick = (variety) => {
    setSelectedVariety(variety);
    setSelectedVarietyHeading(`Enter ${variety} Measurements`);
    const subId = generateSubId(variety);
    setCurrentSubId(subId);
    setDetails({});
    const history = formState.measurementHistory?.[subId];
    if (history?.versions?.length) {
      const active = history.versions[history.activeVersionIndex];
      setLocalFormState((prev) => ({
        ...prev,
        measurement: active.measurements,
        selectedImages: active.selectedImages || [],
      }));
    } else {
      setLocalFormState((prev) => ({
        ...prev,
        measurement: {},
        selectedImages: [],
      }));
    }
    scrollToForm();
  };

  const handleImageClick = useCallback((selection, buttonName) => {
    if (buttonName.includes("کف") || ["جیب", "شلوار", "سلائی", "بٹن", "کٹر"].includes(buttonName)) return;
    setLocalFormState((prev) => {
      // Filter out all images with the same buttonName to ensure single selection
      const filteredImages = prev.selectedImages.filter((i) => i.buttonName !== buttonName);
      const entry = { imgSrc: selection, buttonName };
      const exists = prev.selectedImages.some((i) => i.imgSrc === selection);
      let updatedImages = filteredImages;
      if (!exists) {
        // Add new image only if it doesn't exist
        updatedImages = [...filteredImages, entry];
      }
      console.log("Updated selectedImages:", updatedImages);
      return { ...prev, selectedImages: updatedImages };
    });
  }, []);

  const handleViewOrder = () => {
    console.log("OrderForm navigating to ViewOrder with formState:", formState);
    navigate("/view-order", { state: formState });
  };

  const handlePrintOrder = () => {
    setTimeout(() => {
      const element = printRef.current;
      html2pdf()
        .set({
          margin: 0.5,
          filename: "order.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .from(element)
        .outputPdf("bloburl")
        .then((url) => window.open(url));
    }, 500);
  };

  const printOrderData = useMemo(() => ({
    ...formState,
    details,
  }), [formState, details]);

  const groupedMeasurements = useMemo(() => {
    return Object.entries(printOrderData.measurement || {}).reduce((acc, [k, v]) => {
      if (!v) return acc;
      const [cat, ...rest] = k.split("_");
      acc[cat] = acc[cat] || {};
      acc[cat][rest.join("_")] = v;
      return acc;
    }, {});
  }, [printOrderData.measurement]);

  const selectedDropdown = printOrderData.collar?.selectedMeasurement || "";
  const buttonSelection = useMemo(() => {
    const collarPosition = printOrderData.collar?.collarPosition;
    if (!collarPosition) return "";
    switch (collarPosition) {
      case "above": return "کالر پر بٹن";
      case "center": return "کالر پر ڈیزائن";
      case "below": return "کالر پر کڑھائی";
      default: return "";
    }
  }, [printOrderData.collar?.collarPosition]);

  const pocketButtonSelection = useMemo(() => {
    return (
      printOrderData.pocket?.selectedButton ||
      (printOrderData.pocket?.styleSelections?.[0] &&
      !printOrderData.pocket.styleSelections[0].toLowerCase().includes("لंबائی") &&
      !printOrderData.pocket.styleSelections[0].toLowerCase().includes("چوڑائی")
        ? printOrderData.pocket.styleSelections[0]
        : "غیز منتخب")
    );
  }, [printOrderData.pocket]);

  const pattiOptions = useMemo(() => ({
    design: printOrderData.patti?.design || "",
    length: printOrderData.patti?.length || "",
    width: printOrderData.patti?.width || "",
    buttons: printOrderData.patti?.buttons || "",
  }), [printOrderData.patti]);

  const pattiImages = useMemo(() => {
    const selectedImage = printOrderData.patti?.selectedImage;
    return selectedImage ? [{ imgSrc: selectedImage, buttonName: "پٹی" }] : [];
  }, [printOrderData.patti?.selectedImage]);

  const cuffImages = useMemo(() => {
    const images = (printOrderData.cuff?.cuffImages || []).map((img) => ({
      imgSrc: img.imgSrc || "/fallback-cuff.jpg",
      buttonName: img.buttonName || "کف",
      length: printOrderData.cuff?.lengthValue || "",
      width: printOrderData.cuff?.selectedDropdownCuff || "",
    }));
    return images.slice(0, 2);
  }, [printOrderData.cuff]);

  const selectedDropdownCuff = printOrderData.cuff?.selectedDropdownCuff || "";
  const cuffStyleSelections = useMemo(() => {
    return (printOrderData.cuff?.styleSelections || []).filter(
      (style) =>
        !style.toLowerCase().includes("لंबائی") &&
        !style.toLowerCase().includes("چوڑائی") &&
        !style.toLowerCase().includes("length") &&
        !style.toLowerCase().includes("width")
    );
  }, [printOrderData.cuff?.styleSelections]);

  const pocketImages = useMemo(() => {
    return (printOrderData.pocket?.pocketImages || []).map((img) => ({
      imgSrc: img.imgSrc || "/fallback-pocket.jpg",
      buttonName: img.buttonName || "جیب",
    }));
  }, [printOrderData.pocket?.pocketImages]);

  const pocketDropdowns = useMemo(() => ({
    noOfPockets: printOrderData.pocket?.noOfPockets || "غیز منتخب",
    pocketSize: printOrderData.pocket?.pocketSize || "غیز منتخب",
    kandeSeJaib: printOrderData.pocket?.kandeSeJaib || "غیز منتخب",
  }), [printOrderData.pocket]);

  const pocketStyleSelections = printOrderData.pocket?.styleSelections || [];
  const shalwaarImage = useMemo(() => {
    const selectedImage = printOrderData.shalwaar?.selectedImage;
    return selectedImage ? [{ imgSrc: selectedImage, buttonName: "شلوار" }] : [];
  }, [printOrderData.shalwaar?.selectedImage]);

  const shalwaarOptions = useMemo(() => ({
    panchaChorai: printOrderData.shalwaar?.panchaChorai || "غیز منتخب",
  }), [printOrderData.shalwaar]);

  const shalwaarStyleSelections = printOrderData.shalwaar?.styleSelections || [];
  const silaiSelection = useMemo(() => printOrderData.silai?.selectedButton || "غیز منتخب", [printOrderData.silai]);
  const buttonSelectionNew = useMemo(() => printOrderData.button?.selectedButton || "غیز منتخب", [printOrderData.button]);
  const cutterSelections = printOrderData.cutter?.selectedButtons || [];
  const allStyleSelections = useMemo(() => [], []);

  const buttonSelections = useMemo(() => {
    const selections = [];
    if (buttonSelection) selections.push(buttonSelection);
    if (silaiSelection !== "غیز منتخب") selections.push(`سلائی: ${silaiSelection}`);
    if (buttonSelectionNew !== "غیز منتخب") selections.push(`بٹن: ${buttonSelectionNew}`);
    cutterSelections.forEach((selection) => selections.push(`کٹر: ${selection}`));
    shalwaarStyleSelections.forEach((selection) => selections.push(`شلوار: ${selection}`));
    cuffStyleSelections.forEach((selection) => selections.push(`کف: ${selection}`));
    pocketStyleSelections.forEach((selection) => selections.push(`جیب: ${selection}`));
    return selections;
  }, [
    buttonSelection,
    silaiSelection,
    buttonSelectionNew,
    cutterSelections,
    shalwaarStyleSelections,
    cuffStyleSelections,
    pocketStyleSelections,
  ]);

  const filteredSelectedImages = useMemo(() => {
    return printOrderData.selectedImages.filter(
      (img) => !img.buttonName.includes("کف") && !["سلائی", "بٹن", "کٹر"].includes(img.buttonName)
    );
  }, [printOrderData.selectedImages]);

  return (
    <Layout
      handleVarietyClick={handleVarietyClick}
      selectedVariety={selectedVariety}
      hideSidebar
    >
      <div className="mb-1">
        <Search
          customers={customers}
          onCreateOrder={onCreateOrder}
          onAddCustomer={onAddCustomer}
        />
      </div>
      <div className="md:flex-grow pl-2 md:pl-[69px] space-y-6">
        <div className="md:flex md:pr-6">
          <CustomerDetails
            formState={formState}
            setFormState={setLocalFormState}
            editCustomer={editCustomer}
            setEditCustomer={setEditCustomer}
            handleEditCustomer={() => {}}
            handleEditClick={(id) => {}}
            handleDeleteCustomer={() => {}}
          />
          <VarietySelector
            selectedVariety={selectedVariety}
            handleVarietyClick={handleVarietyClick}
            handleImageClick={handleImageClick}
            scrollToForm={scrollToForm}
            selectedImages={formState.selectedImages}
          />
        </div>
        {selectedVariety && (
          <div ref={measurementFormRef} className="md:flex md:space-x-6 space-x-3">
            <SubCategorySelector
              subCategoryImages={{}}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              handleImageClick={handleImageClick}
              selectedImages={formState.selectedImages}
              updateViewOrder={updateViewOrder}
              updateViewOrderPatti={updateViewOrderPatti}
              setFormState={setLocalFormState}
              formState={formState}
            />
            <MeasurementForm
              selectedVarietyHeading={selectedVarietyHeading}
              selectedVariety={selectedVariety}
              formState={formState}
              setFormState={setLocalFormState}
              currentSubId={currentSubId}
            >
              <Details details={details} onDetailsChange={setDetails} />
            </MeasurementForm>
          </div>
        )}
        {selectedVariety && (
          <div className="flex flex-col items-start mt-6 space-y-4">
            <button onClick={handlePrintOrder} className="btn bg-btnBg text-white">
              Print Order
            </button>
            <button onClick={handleViewOrder} className="btn bg-btnBg text-white">
              View Order
            </button>
          </div>
        )}
      </div>
      <div ref={printRef}>
        <div className="p-6 min-h-screen bg-white flex flex-col items-center font-nastaliq">
          <div className="w-full max-w-2xl mb-6">
            <CustomerDetails1
              customerDetails={printOrderData.customerDetails}
              details={{
                bookingNo: printOrderData.bookingNo,
                type: printOrderData.type,
                deliveryDate: printOrderData.details?.deliveryDate || "N/A",
                bookingDate: printOrderData.details?.bookingDate || "N/A",
              }}
            />
          </div>
          <div className="flex w-[41rem] max-w-3xl">
            <div className="flex-1  ">
              <SelectedImages
                selectedImages={filteredSelectedImages}
                selectedDropdown={selectedDropdown}
                buttonSelection={buttonSelection}
                pattiOptions={pattiOptions}
                selectedDropdownCuff={selectedDropdownCuff}
                cuffImages={cuffImages}
                pocketImages={pocketImages}
                pocketDropdowns={pocketDropdowns}
                styleSelections={allStyleSelections}
                pattiImages={pattiImages}
                shalwaarImage={shalwaarImage}
                shalwaarOptions={shalwaarOptions}
                pocketButtonSelection={pocketButtonSelection}
              />
            </div>
            <div className="flex-1">
              <Measurements
                groupedMeasurements={groupedMeasurements}
                buttonSelections={[]}
              />
            </div>
          </div>
          <div className="mt-1 w-[33rem] max-w-3xl ">
            <div className="grid grid-cols-4 gap-1 mb-2 ">
              {buttonSelections.map((selection, idx) => (
                <label key={idx} className="flex items-center space-x-2 text-sm ">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="h-4 w-4  "
                  />
                  <span>{selection}</span>
                </label>
              ))}
              {pocketDropdowns.noOfPockets !== "غیز منتخب" && (
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>فرنٹ جیب: {pocketDropdowns.noOfPockets}</span>
                </label>
              )}
              {pattiOptions.design && (
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{pattiOptions.design}</span>
                </label>
              )}
              {pattiOptions.buttons && (
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>بٹنوں کی تعداد: {pattiOptions.buttons}</span>
                </label>
              )}
            </div>
          </div>
          <div className="w-[33rem]  max-w-2xl">
            <Details1 details={printOrderData.details} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderForm;
import React from "react";

const urduLabels = {
  design: "ڈیزائن",
  stitching: "سلائی",
  button: "بٹن",
  cutter: "کٹنگ",
  frontPocket: "سامنے کی جیب",
  collar: "کالر",
  cuff: "کف",
  patti: "پٹی",
  shalwar: "شلوار",
  silai: "سلائی",
  extra: "اضافی معلومات",
  color: "رنگ",
  fabric: "کپڑا",
  // مزید کلیدوں کے لیے ترجمے یہاں شامل کریں
};

const Details1 = ({ details }) => {
  return (
    <div className="w-[36rem] rounded-2xl p-4 border text-black font-nastaliq">
      <h2 className="text-md font-semibold mb-3">تفصیلات</h2>
      <div className="grid grid-cols-3 gap-2">
        {Object.entries(details).length > 0 ? (
          Object.entries(details).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-white py-1 px-2 rounded-lg"
            >
              <span className="text-sm text-gray-600">
                {urduLabels[key] || key}:
              </span>
              <span className="text-xs text-gray-800">{value}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center py-4">
            کوئی تفصیلات موجود نہیں
          </p>
        )}
      </div>
    </div>
  );
};

export default Details1;

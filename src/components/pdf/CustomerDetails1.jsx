import React from "react";

const CustomerDetails1 = ({ customerDetails = {}, details = {} }) => {
  const { name = "N/A", phone = "N/A", bookNo = "N/A", id = "N/A" } = customerDetails;
  const { deliveryDate = "N/A", bookingDate = "N/A" } = details;

  return (
    <div className="flex justify-center pt-3 ">
      <div className="relative w-[36rem] max-w-3xl text-borderColor font-nastaliq px-4 ">
        
        {/* ID badge top-right */}
        {id && (
          <div className="absolute top-[-2] right-4 bg-btnBg text-white px-3 py-1 rounded-lg text-sm ">
            ID: {id}
          </div>
        )}

        <div className="text-sm border border-borderColor rounded-lg p-4 shadow-sm bg-white space-y-4">

          {/* Row 1: Name and Phone */}
          <div className="flex justify-between border-b border-gray-300 pb-2">
            <div className="w-1/2 flex justify-between pr-4 border-r border-gray-300">
              <strong>نام:</strong>
              <span>{name}</span>
            </div>
            <div className="w-1/2 flex justify-between pl-4">
              <strong>فون:</strong>
              <span>{phone}</span>
            </div>
          </div>

          {/* Row 2: Delivery Date, Booking Date, Booking No */}
          <div className="flex justify-between">
            <div className="w-1/3 flex justify-between pr-4 border-r border-gray-300">
              <strong>ڈیلیوری تاریخ:</strong>
              <span>{deliveryDate}</span>
            </div>
            <div className="w-1/3 flex justify-between px-4 border-r border-gray-300">
              <strong>بکنگ تاریخ:</strong>
              <span>{bookingDate}</span>
            </div>
            <div className="w-1/3 flex justify-between pl-4">
              <strong>بکنگ نمبر:</strong>
              <span>{bookNo}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDetails1;

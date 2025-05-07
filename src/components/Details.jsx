// Details.jsx
import React from "react";

const Details = ({ details, onDetailsChange }) => {
  const fields = [
    { id: "amount", label: "Amount", type: "text" },
    { id: "deliveryDate", label: "Delivery Date", type: "date" },
    { id: "extraAmount", label: "Extra Amount", type: "text" },
    { id: "advancePayment", label: "Advance Payment", type: "text" },
    { id: "discount", label: "Discount", type: "text" },
    { id: "perItemPrice", label: "Per Item Price", type: "text" },
    { id: "remainingAmount", label: "Remaining Amount", type: "text" },
    { id: "totalAmount", label: "Total Amount", type: "text" },
    { id: "bookingDate", label: "Booking Date", type: "date" },
  ];

  return (
    <div className="md:p-6 p-4 rounded-xl border md:w-[320px] w-[280px] shadow-lg">
      <h3 className="text-lg font-bold text-heading mb-4">Details</h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        {fields.map((field) => (
          <div key={field.id} className="relative">
            <input
              type={field.type}
              id={field.id}
              value={details[field.id] || ""}
              placeholder=" "  // Use an empty placeholder so :placeholder-shown works
              required         // Mark as required so that when not empty, :placeholder-shown is false and :valid applies
              onChange={(e) =>
                              onDetailsChange({
                               ...details,
                               [field.id]: e.target.value
                              })
                            }
              className="peer text-sm block w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor={field.id}
              className="
                absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500
                pointer-events-none transition-all duration-200 bg-gray-100 px-1
                peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm 
                peer-focus:top-0 peer-focus:left-2 peer-focus:text-sm
                peer-valid:top-0 peer-valid:left-2 peer-valid:text-sm
              "
            >
              {field.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;

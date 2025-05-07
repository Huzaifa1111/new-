import React, { useEffect } from 'react';

function CustomerDetails({
  formState,
  editCustomer,
  setEditCustomer,
  handleEditCustomer,
  handleEditClick,
  handleDeleteCustomer,
}) {

  // Handle changes for the customer form input
  const handleInputChange = (e, field) => {
    const updatedCustomer = { ...editCustomer, [field]: e.target.value };
    setEditCustomer(updatedCustomer);
  };

  return (
    <div className="p-[12px] mb-6 md:mb-0 md:p-[21px] rounded-xl bg-cardBg shadow-xl w-[319px] md:w-[598px] mx-auto text-white border borderColor font-font relative">
      {/* Display the unique ID in the top-right corner */}
      {formState.customerDetails.id && (
        <div className="absolute top-2 right-2 bg-btnBg text-white px-3 py-1 rounded-lg text-sm">
          ID: {formState.customerDetails.id}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4 text-left text-heading">
        Customer Details
      </h2>

      <div className="space-y-4">
        {editCustomer ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="relative">
                <input
                  id="Name"
                  type="text"
                  value={editCustomer.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="peer p-2 rounded-lg w-full bg-inputBg text-black border border-borderColor input-custom"
                  placeholder=" "
                />
                <label
                  htmlFor="Name"
                  className="absolute left-2 -top-2.5 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-2 transition-all peer-focus:-top-2.5 peer-focus:left-2 bg-cardBg px-1 cut-border border-box"
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  id="Booking Number"
                  type="text"
                  value={editCustomer.bookNo}
                  onChange={(e) => handleInputChange(e, 'bookNo')}
                  className="peer p-2 rounded-lg w-full bg-inputBg text-black border border-borderColor input-custom"
                  placeholder=" "
                />
                <label
                  htmlFor="Booking Number"
                  className="absolute left-2 -top-2.5 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-2 transition-all peer-focus:-top-2.5 peer-focus:left-2 bg-cardBg px-1 cut-border border-box"
                >
                  Booking Number
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                id="Phone"
                type="text"
                value={editCustomer.phone}
                onChange={(e) => handleInputChange(e, 'phone')}
                className="peer p-2 rounded-lg w-full bg-inputBg text-black border border-borderColor input-custom"
                placeholder=" "
              />
              <label
                htmlFor="Phone"
                className="absolute left-2 -top-2.5 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-2 transition-all peer-focus:-top-2.5 peer-focus:left-2 bg-cardBg px-1 cut-border border-box"
              >
                Phone
              </label>
            </div>

            <div className="relative">
              <input
                id="CNIC"
                type="text"
                value={editCustomer.cnic}
                onChange={(e) => handleInputChange(e, 'cnic')}
                className="peer p-2 rounded-lg w-full bg-inputBg text-black border border-borderColor input-custom"
                placeholder=" "
              />
              <label
                htmlFor="CNIC"
                className="absolute left-2 -top-2.5 text-gray-500 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-2 transition-all peer-focus:-top-2.5 peer-focus:left-2 bg-cardBg px-1 cut-border border-box"
              >
                CNIC
              </label>
            </div>

            <div className="flex flex-col md:flex-row justify-between pt-3 gap-2">
              <button
                className="w-full md:w-[8rem] h-[41px] px-4 py-2 text-sm text-white transition-all bg-btnBg rounded-xl btn"
                onClick={handleEditCustomer}
              >
                Update
              </button>
              <button
                className="w-full md:w-[8rem] h-[41px] px-4 py-2 text-sm text-white bg-red-500 rounded-xl shadow-md transition-all hover:bg-red-600 hover:-translate-y-1"
                onClick={handleDeleteCustomer}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <p className="p-2 rounded-lg bg-inputBg text-black border border-borderColor placeholder customPlaceholder input-custom">
                <span className="text-input">Name:</span>{" "}
                {formState.customerDetails.name || "N/A"}
              </p>
              <p className="p-2 rounded-lg bg-inputBg text-inputText border border-borderColor input-custom">
                <span className="text-inputText">Booking Number:</span>{" "}
                {formState.customerDetails.bookNo || "N/A"}
              </p>
            </div>
            <p className="p-2 rounded-lg bg-inputBg text-inputText border border-borderColor input-custom">
              <span className="text-inputText">Phone:</span>{" "}
              {formState.customerDetails.phone || "N/A"}
            </p>
            <p className="p-2 rounded-lg bg-inputBg text-inputText border border-borderColor input-custom">
              <span className="text-inputText">CNIC:</span>{" "}
              {formState.customerDetails.cnic || "N/A"}
            </p>

            <div className="flex flex-col md:flex-row justify-between pt-3 gap-2">
              <button
                className="w-full md:w-[8rem] h-[41px] px-4 py-2 text-sm text-white bg-btnBg  rounded-xl transition-all btn"
                onClick={() => handleEditClick(formState.customerDetails)}
              >
                Edit
              </button>
              <button
                className="w-full md:w-[8rem] h-[41px] px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all"
                onClick={() => handleDeleteCustomer(formState.customerDetails.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerDetails;

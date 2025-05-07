import React, { useState } from "react";

const Search = ({ customers, onCreateOrder, onAddCustomer }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    cnic: "",
    bookNo: "",
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedCustomer(null);

    if (!value) {
      setFilteredCustomers([]);
      setShowNewCustomerForm(false);
      return;
    }

    const lowercasedValue = value.toLowerCase();
    let filtered = [];

    // If the search term is numeric and starts with "0", assume it's a phone search.
    if (!isNaN(value) && value.startsWith("0")) {
      filtered = customers.filter(
        (customer) => customer.phone && customer.phone.startsWith(value)
      );
    }
    // If the search term is numeric (but doesn't start with 0), assume it's a booking number search.
    else if (!isNaN(value)) {
      filtered = customers.filter(
        (customer) =>
          customer.bookNo &&
          customer.bookNo.toLowerCase().startsWith(lowercasedValue)
      );
    }
    // Otherwise, for text searches, check if any of the fields start with the search term.
    else {
      filtered = customers.filter((customer) =>
        ["name", "phone", "cnic", "bookNo"].some((key) =>
          customer[key]?.toLowerCase().startsWith(lowercasedValue)
        )
      );
    }

    if (filtered.length > 0) {
      setFilteredCustomers(filtered);
      setShowNewCustomerForm(false);
    } else {
      setFilteredCustomers([]);
      setShowNewCustomerForm(true);
    }
  };

  const handleCustomerClick = (customer) => {
    setSearchTerm(customer.name);
    setSelectedCustomer(customer);
    setFilteredCustomers([]);
    setShowNewCustomerForm(false);
  };

  const handleCreateOrderClick = () => {
    if (selectedCustomer) {
      onCreateOrder(selectedCustomer);
      setSearchTerm("");
      setSelectedCustomer(null);
    }
  };

  const handleAddCustomerClick = () => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert("Please enter at least name and phone number");
      return;
    }
    const createdCustomer = onAddCustomer(newCustomer);
    onCreateOrder(createdCustomer);
    // Reset the new customer form and search
    setNewCustomer({
      name: "",
      phone: "",
      cnic: "",
      bookNo: "",
    });
    setSearchTerm("");
    setShowNewCustomerForm(false);
  };

  return (
    <div className="flex justify-center pt-[25px]">
      <div className="md:mb-6 mb-3 p-6 rounded-xl space-y-1 w-[322px] md:ml-[5rem] mr-[1px] md:w-[33rem] bg-cardBg border shadow-lg border-gradient">
        <h1 className="text-2xl font-bold mb-4 text-center text-heading font-font">
          Search Customer
        </h1>

        {/* Search Input */}
        <div className="relative flex justify-center mb-4">
          <svg
            className="absolute md:left-4 left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, phone, CNIC, or Booking Number"
            className="w-[20rem] md:w-[31rem] px-10 py-2 border-customBorder bg-inputBg rounded-xl text-black input-custom border-borderColor font-font"
          />
        </div>

        {/* List of Filtered Customers */}
        {filteredCustomers.length > 0 && (
          <div className="bg-white border rounded-3xl mt-2 shadow-lg max-h-40 overflow-auto">
            {filteredCustomers.map((customer, index) => (
              <div
                key={customer.id ? customer.id : `${customer.phone}-${index}`}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleCustomerClick(customer)}
              >
                {customer.name} - {customer.phone}
              </div>
            ))}
          </div>
        )}

        {/* Show Create Order button if a customer is selected */}
        {selectedCustomer && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleCreateOrderClick}
              className="w-[14rem] h-[41px] px-4 py-2 text-s text-white transition-all bg-btnBg md:rounded-lg rounded-3xl btn font-font"
            >
              Create Order
            </button>
          </div>
        )}

        {/* New Customer Form */}
        {showNewCustomerForm && (
          <div className="bg-cardBg p-6 border rounded-3xl shadow-lg space-y-4">
            <h2 className="text-lg font-bold text-center text-heading font-font">
              No Customer Found
            </h2>
            <div className="space-y-4">
              {/* Name Input Field */}
              <div className="relative">
                <input
                  id="Name"
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, name: e.target.value })
                  }
                  placeholder=" "
                  className="input-custom peer w-full px-4 py-2 rounded-xl text-black border border-borderColor"
                />
                <label
                  htmlFor="Name"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 ease-in-out bg-cardBg px-1 ${
                    newCustomer.name
                      ? "top-[-1px] left-4 text-blue-500"
                      : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-8px] peer-focus:left-4 peer-focus:text-blue-500"
                  }`}
                >
                  Name
                </label>
              </div>

              {/* Phone Input Field */}
              <div className="relative">
                <input
                  id="Phone"
                  type="text"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                  placeholder=" "
                  className="input-custom peer w-full px-4 py-2 rounded-xl text-black border border-borderColor"
                />
                <label
                  htmlFor="Phone"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 ease-in-out bg-cardBg px-1 ${
                    newCustomer.phone
                      ? "top-[-1px] left-4 text-blue-500"
                      : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-8px] peer-focus:left-4 peer-focus:text-blue-500"
                  }`}
                >
                  Phone
                </label>
              </div>

              {/* CNIC Input Field */}
              <div className="relative">
                <input
                  id="CNIC"
                  type="text"
                  value={newCustomer.cnic}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, cnic: e.target.value })
                  }
                  placeholder=" "
                  className="input-custom peer w-full px-4 py-2 rounded-xl text-black border border-borderColor"
                />
                <label
                  htmlFor="CNIC"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 ease-in-out bg-cardBg px-1 ${
                    newCustomer.cnic
                      ? "top-[-1px] left-4 text-blue-500"
                      : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-8px] peer-focus:left-4 peer-focus:text-blue-500"
                  }`}
                >
                  CNIC
                </label>
              </div>

              {/* Booking Number Input Field */}
              <div className="relative">
                <input
                  id="Booking Number"
                  type="text"
                  value={newCustomer.bookNo}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, bookNo: e.target.value })
                  }
                  placeholder=" "
                  className="input-custom peer w-full px-4 py-2 rounded-xl text-black border border-borderColor"
                />
                <label
                  htmlFor="Booking Number"
                  className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 ease-in-out bg-cardBg px-1 ${
                    newCustomer.bookNo
                      ? "top-[-1px] left-4 text-blue-500"
                      : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-4 peer-placeholder-shown:-translate-y-1/2 peer-focus:top-[-8px] peer-focus:left-4 peer-focus:text-blue-500"
                  }`}
                >
                  Booking Number
                </label>
              </div>
            </div>

            <div className="flex flex-row justify-center items-center space-x-6 mt-6">
              <button
                onClick={handleAddCustomerClick}
                className="w-[14rem] h-[41px] px-4 py-2 text-s text-white transition-all bg-btnBg md:rounded-lg rounded-3xl btn font-font"
              >
                Add New Customer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

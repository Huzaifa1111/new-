import React from "react";

const Search = ({
  customers,
  setSearchResult,
  setShowNewCustomerForm,
  setFilteredCustomers,
  setSearchTerm,
  searchTerm,
  filteredCustomers,
  handleSearchChange,
  searchResult,
  handleCreateOrderClick,
  showNewCustomerForm,
  handleAddCustomer,
  newCustomer,
  setNewCustomer
}) => {
  // Helper function to fetch full customer details from your backend
  const fetchCustomerDetails = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching customer details:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
      return null;
    }
  };

  return (
    <div className="p-6 border-customBorder rounded shadow space-y-4 w-[30rem] mx-auto">
      <h1>Search Customers</h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, phone, CNIC, or Booking Number"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      {filteredCustomers.length > 0 && (
        <div className="bg-white border rounded-3xl mt-2 shadow-lg max-h-40 overflow-auto">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.phone}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={async () => {
                // Set the search term to the selected customer's name
                setSearchTerm(customer.name);
                // Fetch full details for this customer from the backend
                const detailedCustomer = await fetchCustomerDetails(customer.id);
                // If found, update the search result with the full data
                if (detailedCustomer) {
                  setSearchResult(detailedCustomer);
                } else {
                  // Fallback: use the basic customer object if API call fails
                  setSearchResult(customer);
                }
                // Clear the filtered customers list
                setFilteredCustomers([]);
              }}
            >
              {customer.name}
            </div>
          ))}
        </div>
      )}

      {showNewCustomerForm && (
        <div className="bg-white p-6 border rounded-3xl shadow-lg space-y-4">
          <h2 className="text-lg font-bold text-center">No Customer Found</h2>
          <div className="flex-row space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={newCustomer.name}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-3xl"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newCustomer.phone}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, phone: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-3xl"
            />
            <input
              type="text"
              placeholder="CNIC"
              value={newCustomer.cnic}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, cnic: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-3xl"
            />
            <input
              type="text"
              placeholder="Booking Number"
              value={newCustomer.bookNo}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, bookNo: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-3xl"
            />
          </div>
          <div className="flex flex-row justify-center items-center space-x-6 mt-6">
            <button onClick={handleAddCustomer} className="btn-gradient">
              Add New Customer
            </button>
          </div>
        </div>
      )}

      {searchResult && searchResult !== "not-found" && (
        <div className="bg-white p-6 border rounded-3xl shadow-lg space-y-4">
          <h2 className="text-lg font-bold text-center">Customer Details</h2>
          <div className="flex-row space-y-2">
            <p>
              <strong>Name:</strong> {searchResult.name}
            </p>
            <p>
              <strong>Phone:</strong> {searchResult.phone}
            </p>
            <p>
              <strong>CNIC:</strong> {searchResult.cnic}
            </p>
            <p>
              <strong>Booking Number:</strong> {searchResult.bookNo || "N/A"}
            </p>
            {searchResult.selectedImages && searchResult.selectedImages.length > 0 && (
              <div>
                <strong>Selected Images:</strong>
                <div className="flex flex-wrap">
                  {searchResult.selectedImages.map((img, index) => (
                    <img
                      key={index}
                      src={img.imgSrc} // Adjust property name if needed
                      alt={`Selected ${index}`}
                      className="w-16 h-16 object-cover m-1"
                    />
                  ))}
                </div>
              </div>
            )}
            {/* You can display additional pre-selected data here as needed */}
          </div>
          <div className="flex flex-row justify-center items-center space-x-6 mt-6">
            <button onClick={handleCreateOrderClick} className="btn-gradient">
              Proceed to Create Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

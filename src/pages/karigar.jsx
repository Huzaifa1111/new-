import React, { useState } from "react";

const Karigar = () => {
  const [karigars, setKarigars] = useState([]); // List of karigars
  const [newKarigar, setNewKarigar] = useState({
    name: "",
    phone: "",
    availability: "available",
    customer: "",
  });
  const [selectedKarigar, setSelectedKarigar] = useState(null); // Karigar to assign customer
  const [customers, setCustomers] = useState(["Customer 1", "Customer 2"]); // Mock customer list
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [editingKarigar, setEditingKarigar] = useState(null); // Track which karigar is being edited
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKarigar({ ...newKarigar, [name]: value });
  };

  // Add a new karigar
  const addKarigar = (e) => {
    e.preventDefault();
    if (!newKarigar.name || !newKarigar.phone) {
      alert("Please fill all fields.");
      return;
    }
    setKarigars([...karigars, { ...newKarigar }]);
    setNewKarigar({
      name: "",
      phone: "",
      availability: "available",
      customer: "",
    });
    setShowForm(false); // Hide the form after adding a karigar
  };

  // Assign customer to a karigar
  const assignCustomer = () => {
    if (!selectedCustomer) {
      alert("Please select a customer to assign.");
      return;
    }

    setKarigars(
      karigars.map((karigar) =>
        karigar === selectedKarigar
          ? { ...karigar, customer: selectedCustomer }
          : karigar
      )
    );

    alert(`${selectedCustomer} assigned to ${selectedKarigar.name}`);
    setSelectedCustomer("");
    setSelectedKarigar(null);
  };

  // Edit a karigar
  const editKarigar = (karigar) => {
    setEditingKarigar(karigar);
    setNewKarigar({ ...karigar });
    setShowForm(true);
  };

  // Save the edited karigar
  const saveEditedKarigar = (e) => {
    e.preventDefault();
    setKarigars(
      karigars.map((karigar) =>
        karigar === editingKarigar ? { ...newKarigar } : karigar
      )
    );
    setEditingKarigar(null);
    setShowForm(false);
    setNewKarigar({
      name: "",
      phone: "",
      availability: "available",
      customer: "",
    });
  };

  // Delete a karigar
  const deleteKarigar = (karigar) => {
    setKarigars(karigars.filter((item) => item !== karigar));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter karigars based on search query (by name or phone number)
  const filteredKarigars = karigars.filter(
    (karigar) =>
      karigar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      karigar.phone.includes(searchQuery)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Karigar Management</h2>
        
        {/* Search Bar */}
        <div className="relative w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by Name or Phone"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? "Close Form" : "Add Karigar"}
        </button>
      </div>

      {/* Add/Edit Karigar Form */}
      {showForm && (
        <form
          onSubmit={editingKarigar ? saveEditedKarigar : addKarigar}
          className="bg-white p-4 shadow rounded mb-6"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={newKarigar.name}
              onChange={handleInputChange}
              placeholder="Enter Karigar Name"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={newKarigar.phone}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Availability:</label>
            <select
              name="availability"
              value={newKarigar.availability}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingKarigar ? "Save Changes" : "Add Karigar"}
          </button>
        </form>
      )}

      {/* Karigar List */}
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Availability</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Assign</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredKarigars.map((karigar, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{karigar.name}</td>
              <td className="px-4 py-2">{karigar.phone}</td>
              <td className="px-4 py-2">{karigar.availability}</td>
              <td className="px-4 py-2">{karigar.customer || "N/A"}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setSelectedKarigar(karigar)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                >
                  Assign Customer
                </button>

                <button
                  onClick={() => editKarigar(karigar)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteKarigar(karigar)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Customer Section */}
      {selectedKarigar && (
        <div className="mt-6 p-4 bg-white shadow rounded">
          <h3 className="text-lg font-bold mb-4">
            Assign Customer to {selectedKarigar.name}
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Select Customer:
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select a customer</option>
              {customers.map((customer, index) => (
                <option key={index} value={customer}>
                  {customer}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={assignCustomer}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Assign
          </button>
        </div>
      )}
    </div>
  );
};

export default Karigar;

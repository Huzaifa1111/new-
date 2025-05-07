import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Customers() {
  const [showForm, setShowForm] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cnic: "",
    bookNo: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCnicWarning, setShowCnicWarning] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = () => {
    if (!formData.cnic && !showCnicWarning) {
      setShowCnicWarning(true);
    } else {
      if (editIndex !== null) {
        const updatedCustomers = [...customers];
        updatedCustomers[editIndex] = formData;
        setCustomers(updatedCustomers);
        setEditIndex(null);
      } else {
        setCustomers([...customers, formData]);
      }
      setFormData({ name: "", phone: "", cnic: "", bookNo: "" });
      setShowForm(false);
      setShowCnicWarning(false);
    }
  };

  const handleEdit = (index) => {
    setFormData(customers[index]);
    setShowForm(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedCustomers = customers.filter((_, i) => i !== index);
    setCustomers(updatedCustomers);
  };

  const handleSeeDetails = (customer) => {
    setShowCnicWarning(false); // Clear CNIC warning
    navigate(`/varieties/${customer.cnic || "unknown"}`, {
      state: { bookingNo: customer.bookNo, customerDetails: customer },
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter customers based on multiple fields: name, phone, cnic, and booking number
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.cnic.includes(searchQuery) ||
    customer.bookNo.includes(searchQuery)
  );

  return (
    <div className="w-auto h-auto pl[97px] pr-[103px]">
      <h1 className="text-4xl">Customers</h1>
      <button
        className="w-32 bg-blue-500 text-white py-2 rounded-3xl hover:bg-green-400 float-right"
        onClick={() => {
          setShowForm(!showForm);
          setFormData({ name: "", phone: "", cnic: "", bookNo: "" });
          setEditIndex(null);
        }}
      >
        Add New
      </button>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name, phone, CNIC, or booking number"
          className="px-4 py-2 w-80 border rounded-3xl"
        />
      </div>

      {showForm && (
        <form className="p-6 border border-gray-300 rounded-3xl bg-white w-full max-w-md mx-auto shadow-lg">
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-3xl"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-3xl"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">CNIC</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-3xl"
            />
            {showCnicWarning && (
              <p className="text-red-500 text-sm mt-1">Warning: CNIC is empty. Please provide a CNIC.</p>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">Book No</label>
            <input
              type="text"
              name="bookNo"
              value={formData.bookNo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-3xl"
            />
          </div>
          <button
            type="button"
            className="w-32 bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-lime-400"
            onClick={handleAddCustomer}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>
      )}

      <table className="w-full border-collapse border border-gray-200 rounded-3xl overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Booking No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Phone</th>
            <th className="border border-gray-300 px-4 py-2">CNIC</th>
            <th className="border border-gray-300 px-4 py-2">Details</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index} className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{customer.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{customer.phone}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{customer.cnic}</td>
              <td
                className="border border-gray-300 px-4 py-2 text-center text-blue-500 hover:cursor-pointer hover:underline"
                onClick={() => handleSeeDetails(customer)}
              >
                See Details
              </td>

              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded-3xl hover:bg-lime-400 mr-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-3xl hover:bg-lime-400"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;

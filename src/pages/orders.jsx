import React, { useState } from "react";

const Orders = () => {
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const [orders, setOrders] = useState([]); // State to hold order data
  const [formData, setFormData] = useState({
    orderNo: "",
    name: "",
    phone: "",
    totalAmount: "",
    qty: "",
    deliveryDate: "",
    orderDate: "",
    karigar: "",
  });

  // Toggle form visibility
  const handleAddNew = () => {
    setShowForm(!showForm);
  };

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders, formData]);
    setFormData({
      orderNo: "",
      name: "",
      phone: "",
      totalAmount: "",
      qty: "",
      deliveryDate: "",
      orderDate: "",
      karigar: "",
    });
    setShowForm(false); // Hide form after submission
  };

  // Delete order
  const handleDelete = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  // Edit order (simplified for now - fills the form with existing data)
  const handleEdit = (index) => {
    setFormData(orders[index]);
    setShowForm(true);
    handleDelete(index); // Remove current order to avoid duplication
  };

  return (
    <div className="container mx-auto p-6">
      {/* Add New Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddNew}
          className="w-32 bg-blue-500 hover:bg-green-400 text-white px-4 py-2 rounded-3xl"
        >
          {showForm ? "Close" : "Add New"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="p-6 border border-gray-300 rounded-3xl bg-white w-full max-w-md mx-auto shadow-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="orderNo"
              placeholder="Order No"
              value={formData.orderNo}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="number"
              name="totalAmount"
              placeholder="Total Amount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="number"
              name="qty"
              placeholder="Qty"
              value={formData.qty}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="date"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
            <input
              type="text"
              name="karigar"
              placeholder="Karigar"
              value={formData.karigar}
              onChange={handleChange}
              className="border rounded-3xl p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-3xl"
          >
            Submit
          </button>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-3xl  ">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="p-3 border border-gray-300 rounded-tl-3xl">Order No</th>
              <th className="p-3 border border-gray-300">Name</th>
              <th className="p-3 border border-gray-300">Phone</th>
              <th className="p-3 border border-gray-300">Total Amount</th>
              <th className="p-3 border border-gray-300">Qty</th>
              <th className="p-3 border border-gray-300">Delivery Date</th>
              <th className="p-3 border border-gray-300">Order Date</th>
              <th className="p-3 border border-gray-300">Karigar</th>
              <th className="p-3 border border-gray-300 rounded-tr-3xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="text-center border-t border-gray-300">
                  <td className="p-3 border border-gray-300">{order.orderNo}</td>
                  <td className="p-3 border border-gray-300">{order.name}</td>
                  <td className="p-3 border border-gray-300">{order.phone}</td>
                  <td className="p-3 border border-gray-300">{order.totalAmount}</td>
                  <td className="p-3 border border-gray-300">{order.qty}</td>
                  <td className="p-3 border border-gray-300">{order.deliveryDate}</td>
                  <td className="p-3 border border-gray-300">{order.orderDate}</td>
                  <td className="p-3 border border-gray-300">{order.karigar}</td>
                  <td className="p-3 border border-gray-300">

                    <div className="space-x-1">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-3xl w-[66px] "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-3xl"
                    >
                      Delete
                    </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-3 text-center border border-gray-300">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

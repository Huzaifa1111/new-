import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import OrderForm from "../components/OrderForm";

function CreateOrder() {
  const navigate = useNavigate();

  // This state controls whether the OrderForm is shown.
  const [showOrderForm, setShowOrderForm] = useState(false);

  // Overall form state.
  const [formState, setFormState] = useState({
    customerDetails: null,
    bookingNo: "",
    type: "",
    measurement: {},
    selectedImages: [],
    details: {},
    measurementHistory: {}
  });

  // Local customers list.
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders/customers");
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      } else {
        console.error("Error fetching customers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // This function is passed to the Search component.
  // When a customer is selected, it updates formState and toggles showOrderForm to true.
  const handleCreateOrder = (customer) => {
    console.log("handleCreateOrder called with:", customer);
    setFormState((prev) => ({
      ...prev,
      customerDetails: customer,
      bookingNo: "",
      type: "",
      measurement: {},
      selectedImages: [],
      details: {},
      measurementHistory: {}
    }));
    setShowOrderForm(true);
  };

  // A simple handler to add a new customer.
  const handleAddCustomer = (newCustomer) => {
    if (!newCustomer.name || !newCustomer.phone) {
      alert("Please enter at least name and phone number");
      return;
    }
    // For demo purposes, we create a customer with a generated ID.
    const createdCustomer = { ...newCustomer, id: Date.now().toString() };
    setCustomers((prev) => [...prev, createdCustomer]);
    return createdCustomer;
  };

  // Handler for saving the order.
  const handleSaveOrder = async (orderData) => {
    console.log("Order saved:", orderData);
    navigate("/viewOrder", { state: orderData });
  };

  return (
    <div className="bg-cardBg h-[65rem]">
      {!showOrderForm ? (
        <Search
          customers={customers}
          onCreateOrder={handleCreateOrder}
          onAddCustomer={handleAddCustomer}
        />
      ) : (
        <OrderForm
          formState={formState}
          setFormState={setFormState}
          customers={customers}
          setCustomers={setCustomers}
          onSaveOrder={handleSaveOrder}
          onCreateOrder={handleCreateOrder} // May be used inside OrderForm for switching customer
          onAddCustomer={handleAddCustomer}
        />
      )}
    </div>
  );
}

export default CreateOrder;

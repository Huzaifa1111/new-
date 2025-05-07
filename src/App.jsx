import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Layout from "./components/Layout"; // Import the Layout component
import Customers from "./pages/customers";
import Orders from "./pages/orders";
import Varieties from "./pages/varieties";
import CreateOrder from "./pages/createOrder";
import Karigar from "./pages/karigar";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect to login by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login Page (No Sidebar) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (with Layout) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="customers" element={<Customers />} />
                <Route path="orders" element={<Orders />} />
                <Route path="karigar" element={<Karigar />} />
                <Route path="varieties/:cnic" element={<Varieties />} />
                <Route path="createOrder" element={<CreateOrder />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
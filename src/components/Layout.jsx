import React from "react";
import Sidebar from "../components/Sidebar";

const Layout = ({ children, handleVarietyClick, selectedVariety , }) => {
  return (
    <div className="flex-start">
      <Sidebar  
        handleVarietyClick={handleVarietyClick} 
        selectedVariety={selectedVariety} 
      />
      <div>{children}</div>
    </div>
  );
};

export default Layout;

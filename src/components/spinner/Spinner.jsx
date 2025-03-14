import React from "react";
import { Spin } from "antd";
import "./spinner.css"; // Optional for additional styling

const Spinner = () => {
  return (
    <div className="spinner-container">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;

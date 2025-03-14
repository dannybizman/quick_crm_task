import React from "react";
import { Button } from "antd";

const CustomButton = ({ text, onClick, block, className, loading }) => (
  <Button
    block={block}
    onClick={onClick} // Ensure the onClick function is passed
    className={className}
    loading={loading}
    htmlType="submit" // Make sure it submits the form
  >
 {loading ? "Logging you in..." : text}
  </Button>
);

export default CustomButton;

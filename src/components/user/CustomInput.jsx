import React from "react";
import { Form, Input } from "antd";

const CustomInput = ({ label, name, type, placeholder, icon }) => (
  <Form.Item
    label={label}
    name={name}
    rules={[{ required: true, message: `Please enter your ${label.toLowerCase()}` }]}
  >
    <Input suffix={icon} type={type} placeholder={placeholder}  />
  </Form.Item>
);

export default CustomInput;

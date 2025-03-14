import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
   <ConfigProvider prefixCls="custom" >
      <App />
    </ConfigProvider>
  </Provider>
);

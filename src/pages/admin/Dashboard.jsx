import React, { useEffect, useState } from "react";
import { Layout, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DashboardStats from "../../components/user/DashboardStats";
import UsersTable from "../../components/user/UsersTable";
import Sidebar from "../../components/user/Sidebar";
import "./dashboard.css";
import { fetchUserData } from "../../apicalls/users";

const { Header, Content } = Layout;

const Dashboard = () => {

   const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage
    if (accessToken) {
      fetchUserData(accessToken)
        .then((userData) => setUser(userData))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);


  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Layout className="site-layout">
        <Header className="header">
          <span className="greeting-text">
              {user ? `Hello ${user.firstName} 👋,` : "Hello 👋,"}
          </span>

          <div className="search-container">
            <SearchOutlined className="search-icon" />
            <Input placeholder="Search" className="search-bar" />
          </div>
        </Header>

        <Content className="content">
          <DashboardStats />
          <UsersTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
